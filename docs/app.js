import express from 'express';
import session from 'express-session';
import dotenv from 'dotenv';
import SequelizeStoreInit from 'connect-session-sequelize';
import { sequelize, User } from './public/db.mjs';
import { engine } from 'express-handlebars';
import { hashPassword, comparePasswords } from './public/pwHash.mjs';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs/promises';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;

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


app.get('/table-names', async (req, res) => {
  try {
    const tableNames = await sequelize.query('SHOW TABLES');
    const tableNamesRows = tableNames[0];
    const tableNamesArray = tableNamesRows.map((row) => row.Tables_in_discs);
    res.json(tableNamesArray);
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

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});

const filePath = path.join(__dirname, 'form-submissions.txt');

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
