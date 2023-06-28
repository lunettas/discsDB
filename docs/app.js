import express from 'express';
import session from 'express-session';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import crypto from 'crypto';
import SequelizeStoreInit from 'connect-session-sequelize';
import { sequelize, User } from './public/db.mjs';
import { engine } from 'express-handlebars';
import { hashPassword, comparePasswords } from './public/pwHash.mjs';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import { timeStamp } from 'console';
import https from 'https';


const __dirname = path.dirname(fileURLToPath(import.meta.url));
const options = {
  key: fs.readFileSync('/root/discsDB/ssl/_.discsdb.cloud_private_key.key'),
  cert: fs.readFileSync('/root/discsDB/ssl/discsdb.cloud_ssl_certificate.cer'),
};


const app = express();
const port = 443;
const ipAddress = process.env.SERVER_IP_ADDRESS || 'localhost';

const SequelizeStore = SequelizeStoreInit(session.Store);

dotenv.config();
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    store: new SequelizeStore({
      db: sequelize,
    }),
    resave: false,
    proxy: true,
  })
);

app.use(async (req, res, next) => {
  if (req.session.userId) {
    try {
      const user = await User.findByPk(req.session.userId);
      if (user) {
        req.session.user = user.get({ plain: true }); // Store the plain user object in the session
        console.log('User stored in session:', req.session.user);

      }
      req.session.save();
      next();
    } catch (error) {
      console.error('Error retrieving user:', error);
      next();
    }
  } else {
    next();
  }
});


app.use(express.static(path.resolve('public'), { extensions: ['html', 'htm', 'mjs', 'jpg'] }));
console.log('Static files served from:', path.join(__dirname, 'public'));

app.use(express.urlencoded({ extended: true }));

app.engine('hbs', engine({ extname: 'hbs' }));
app.set('view engine', 'hbs');
app.set('views', './views');


app.get('/', async (req, res) => {
  try {
    const userId = req.session.userId;
    if (userId) {
      const user = await User.findByPk(userId);
      res.render('index', { user: user ? user.get({ plain: true }) : null });
    } else {
      res.render('index', { user: null });
    }
  } catch (error) {
    console.error('Error retrieving user:', error);
    res.render('index', { user: null });
  }
});


app.get('/input', (req, res) => {
  res.render('input', { user: req.session.user });
});

app.get('/about', (req, res) => {
  res.render('about', { user: req.session.user });
});

app.get('/flightchart', (req, res) => {
  res.render('flightchart', { user: req.session.user });
});

app.get('/registration', (req, res) => {
  res.render('registration', { user: req.session.user });
});

app.get('/forgot-password', (req, res) => {
  res.render('forgot-password', { user: req.session.user, success: false, error: false });
});


app.get('/flightchart-table-names', async (req, res) => {
  try {
    if (req.session.user && req.session.user.permission === 'admin') {
      const tableNames = await sequelize.query('SHOW TABLES');
      const tableNamesRows = tableNames[0];
      const tableNamesArray = tableNamesRows.map((row) => row.Tables_in_discs);
      res.json(tableNamesArray);
    } else if (req.session.user) {
      const visibleTables = ['silasdiscs', 'jcdiscs', req.session.user.nickname];
      res.json(visibleTables);
    } else {
      const visibleTables = ['silasdiscs', 'jcdiscs'];
      res.json(visibleTables);
    }
    } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.get('/input-table-names', async (req, res) => {
  try {
    if (req.session.user && req.session.user.permission === 'admin') {
      const tableNames = await sequelize.query('SHOW TABLES');
      const tableNamesRows = tableNames[0];
      const tableNamesArray = tableNamesRows.map((row) => row.Tables_in_discs);
      res.json(tableNamesArray);
    } else if (req.session.user) {
      const visibleTables = [req.session.user.nickname];
      res.json(visibleTables);
    } else {
      const visibleTables = ['please create an account to add discs to your personal database'];
      res.json(visibleTables);
    }
    } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.get('/table-options', async (req, res) => {
  try {
    const selectedTable = req.query.table;
    console.log('Selected Table:', selectedTable);

    const options = await sequelize.query(`SELECT DISTINCT category FROM ${selectedTable}`);
    const optionsRows = options[0];
    const optionsArray = optionsRows.map((row) => row.category);
    res.json(optionsArray);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/discs', async (req, res) => {
  try {
    const { table, category } = req.query;

    const rows = await sequelize.query(`SELECT * FROM ${table} WHERE category = :category`, {
      replacements: { category },
      type: sequelize.QueryTypes.SELECT,
    });

    res.json(rows);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


const server = https.createServer(options, app);
server.listen(port, ipAddress, () => {
  console.log(`Server running at https://${ipAddress}:${port}/`);
});


app.post('/submit', async (req, res) => {
  const { table, mold, plastic, brand, weight, speed, glide, turn, fade, category, color, stamp, sleepyscale } = req.body;
  console.log('Received form input:', req.body);
  let slot;
  if (speed > 0 && speed <= 4) {
    slot = 'Putter';
  } else if (speed > 4 && speed < 7) {
    slot = 'Mid-Range';
  } else if (speed > 6 && speed < 9) {
    slot = 'Fairway Driver';
  } else if (speed >= 9 && speed < 11) {
    slot = 'Control Driver';
  } else if (speed >= 11) {
    slot = 'Distance Driver';
  }

  try {
    const query = `
      INSERT INTO ${table} (Mold, Plastic, Brand, Weight, Speed, Glide, Turn, Fade, Slot, Category, Color, Stamp, \`Sleepy Scale\`)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [mold, plastic, brand, weight, speed, glide, turn, fade, slot, category, color, stamp, sleepyscale];
    const [result] = await sequelize.query(query, { replacements: values });

    console.log('New row inserted:', result);

    console.log('Disc added to the database and form submission stored!');
    res.redirect('/input?success=true');
  } catch (error) {
    console.error('Error inserting data:', error);
    res.status(500).json({ success: false, message: 'An error occurred while submitting the data.' });
  }
});

app.post('/register', async (req, res) => {
  const { email, plaintextPassword, nickname } = req.body;
  console.log('Received form input:', req.body);
  
  try {
    console.log('Plaintext Password:', plaintextPassword);
    const hashedPassword = await hashPassword(plaintextPassword);
    const user = await User.create({ email, password: hashedPassword, nickname });
    console.log('User created:', user.email);

    // Retrieve the user's nickname from the database
    const userFromDB = await User.findOne({ where: { email } });
    const userNickname = userFromDB.nickname;

    // Create a table for the user using the retrieved nickname
    const tableName = `${userNickname}`;
    const createUserTableQuery = `
      CREATE TABLE ${tableName} (
        ID INT PRIMARY KEY AUTO_INCREMENT,
        Mold VARCHAR(100),
        Plastic VARCHAR(100),
        Brand VARCHAR(100),
        Weight INT,
        Speed INT,
        Glide INT,
        Turn DECIMAL(2,1),
        Fade DECIMAL(2,1),
        Slot ENUM('Putter', 'Mid-Range', 'Fairway Driver', 'Control Driver', 'Distance Driver'),
        Category ENUM('Main Bag', 'Side Bag', 'Collection', 'Backup', 'Sale / Trade'),
        Color VARCHAR(100),
        Stamp VARCHAR(100),
        \`Sleepy Scale\` INT
      );
    `;

    await sequelize.query(createUserTableQuery); // Execute the create table query

    res.render('registration.hbs', { registrationSuccess: true });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).send('An error occurred while registering the user.');
  }
});


app.post('/login', async (req, res) => {
  const { email, plaintextPassword } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      const errorMessage = 'Invalid email or password';
      console.log('Invalid user');
      res.render('index', { loginFailed: true, errorMessage });
      return;
    }

    const passwordMatch = await comparePasswords(plaintextPassword, user.password);

    if (!passwordMatch) {
      const errorMessage = 'Invalid email or password';
      console.log('Invalid password');
      res.render('index', { loginFailed: true, errorMessage });
      return;
    }

    req.session.userId = user.id;
    res.redirect('/');
    console.log('Valid user');
    console.log('Found user:', user);

  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).send('An error occurred during login.');
  }
});

app.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Error logging out:', err);
      res.status(500).send('An error occurred while logging out.');
    } else {
      res.redirect('/');
    }
  });
});

const transporter = nodemailer.createTransport({
  host: 'smtp.ionos.com',
  port: 587,
  secure: false,
  auth: {
    user: 'admin@discsdb.cloud',
    pass: process.env.EMAIL_PASSWORD,
  },
});

async function sendResetCodeEmail(email, resetCode) {
  const mailOptions = {
    from: 'admin@discsdb.cloud',
    to: email,
    subject: `Password Reset TEST Timestamp: ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
    text: `Please click the following link http://discsdb.cloud/forgot-password and use this code: ${resetCode} to reset your password`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Password reset email sent successfully');
  } catch (error) {
    console.error('Error sending password reset email:', error);
  }
}

function generateResetCode() {
  const code = crypto.randomBytes(5).toString('hex');
  return code;
}

app.post('/generate-reset-code', async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      // User with the provided email does not exist
      return res.render('forgot-password', { error: 'User not found', success: false });
    }

    // Generate a reset code and set its expiration
    const resetCode = generateResetCode();
    const resetCodeExpiration = new Date();
    resetCodeExpiration.setMinutes(resetCodeExpiration.getMinutes() + 30); // Set expiration to 30 minutes from now

    // Store the reset code and its expiration in the user's record in the database
    user.resetCode = resetCode;
    user.resetCodeExpiration = resetCodeExpiration;
    await user.save();

    // Send the reset code to the user's email
    await sendResetCodeEmail(email, resetCode);

    return res.render('forgot-password', { success: false, error: false });
  } catch (error) {
    console.error('Error during reset code generation:', error);
    res.status(500).send('An error occurred during the reset code generation process.');
  }
});

app.post('/change-password', async (req, res) => {
  const { resetCode, plaintextPassword } = req.body;

  try {
    const user = await User.findOne({ where: { resetCode } });

    if (!user) {
      // User with the provided reset code does not exist
      return res.render('forgot-password', { error: 'User not found', success: false });
    }

    // Reset the user's password here
    const hashedPassword = await hashPassword(plaintextPassword);
    user.password = hashedPassword;
    await user.save();

    // Clear the reset code and its expiration in the user's record in the database
    user.resetCode = null;
    user.resetCodeExpiration = null;
    await user.save();

    return res.render('forgot-password', { success: true, error: false });
  } catch (error) {
    console.error('Error during password change:', error);
    res.status(500).send('An error occurred during the password change process.');
  }
});

app.get('/send-test-email', async (req, res) => {
  try {
    const mailOptions = {
      from: 'admin@discsdb.cloud',
      to: 'silaslunetta@gmail.com',
      subject: `This is a TEST Timestamp: ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
      text: 'This is a test email from your application.',
    };

    await transporter.sendMail(mailOptions);
    console.log('Test email sent successfully');
    res.send('Test email sent successfully');
  } catch (error) {
    console.error('Error sending test email:', error);
    res.status(500).send('Error sending test email');
  }
});
