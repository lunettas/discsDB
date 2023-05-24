import express from 'express';
import session from 'express-session';
import dotenv from 'dotenv';
import { sequelize, User } from './public/db.mjs';
import { engine } from 'express-handlebars';
import { hashPassword, comparePasswords } from './public/pwHash.mjs';
import https from 'https';
import querystring from 'querystring';
import mime from 'mime';
import path from 'path';
import fs from 'fs/promises';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;

dotenv.config();
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));

app.use((req, res, next) => {
  // Check if the user is logged in based on the session
  if (req.session.userId) {
    // Fetch the user from the database based on the session userId
    User.findByPk(req.session.userId)
      .then((user) => {
        if (user) {
          // Set the user object in the session
          req.session.user = user;
        }
        next();
      })
      .catch((error) => {
        console.error('Error retrieving user:', error);
        next();
      });
  } else {
    next();
  }
});

// Serve static files from the 'public' folder
app.use(express.static(path.resolve('public'), { extensions: ['html', 'htm', 'mjs', 'jpg'] }));
console.log('Static files served from:', path.join(__dirname, 'public'));


//handlebars routing
app.engine('hbs', engine({extname: 'hbs'}));
app.set('view engine', 'hbs');
app.set('views', './views');


app.get('/', (req, res) => {
  const userId = req.session.userId;
  console.log(req.session.userId);
  console.log(req.session.user);
  res.render('index', { user: req.session.user });
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
    const tableNamesArray = tableNamesRows.map(row => row.Tables_in_discs);
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
      type: sequelize.QueryTypes.SELECT
    });

    res.json(rows);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



app.listen(port, function (){
  console.log(`Server running at http://localhost:${port}/`);
});

// parse incoming form data
app.use(express.urlencoded({ extended: true }));

// Define the file path for storing form submissions

const filePath = path.join(__dirname, 'form-submissions.txt');



// handle form submission
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
      // Insert a new row into the table
      const query = `
        INSERT INTO ${table} (Mold, Plastic, Brand, Weight, Speed, Glide, Turn, Fade, Slot, Category, Color, Stamp, \`Sleepy Scale\`)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;
      const values = [mold, plastic, brand, weight, speed, glide, turn, fade, slot, category, color, stamp, sleepyscale];
      const [result] = await sequelize.query(query, { replacements: values });


    console.log('New row inserted:', result);

    const formData = `('${mold}', '${plastic}', '${brand}', ${weight}, ${speed}, ${glide}, ${turn}, ${fade}, '${slot}', '${category}', '${color}', '${stamp}', ${sleepyscale}),\n`;
    const filePath = 'form-submissions.txt';

    fs.appendFile(filePath, formData, (err) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error storing form submission');
      } else {
        console.log('Disc added to the database and form submission stored!');
        res.redirect('/input');
      }
    });
  } catch (error) {
    console.error('Error inserting data:', error);
    res.status(500).send('An error occurred while submitting the data.');
  }
});

//register user accounts
app.post('/register', async (req, res) => {
  const { email, plaintextPassword, nickname } = req.body;
  console.log('Received form input:', req.body);
  try {
    console.log('Plaintext Password:', plaintextPassword);
    //hash pw
    const hashedPassword = await hashPassword(plaintextPassword);
    const user = await User.create({ email, password: hashedPassword, nickname });
    console.log('User created:', user.email);

    // Render the registration page with the registrationSuccess flag set to true
    res.render('registration.hbs', { registrationSuccess: true });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).send('An error occurred while registering the user.');
  }
});

app.post('/login', async (req, res) => {
  const { email, plaintextPassword } = req.body;

  try {
    // Find the user by their email
    const user = await User.findOne({ where: { email } });

    // If the user does not exist, show an alert message
    if (!user) {
      const errorMessage = 'Invalid email or password';
      console.log('Invalid user')
      res.render('index', { loginFailed: true, errorMessage });
      return;
    }

    // Compare the passwords
    const passwordMatch = await comparePasswords(plaintextPassword, user.password);

    // If passwords don't match, show an alert message
    if (!passwordMatch) {
      const errorMessage = 'Invalid email or password';
      console.log('Invalid password')
      res.render('index', { loginFailed: true, errorMessage });
      return;
    }

    // Set the user as authenticated (you can use session or JWT for authentication)
    req.session.userId = user.id;

    // Redirect to the desired page after successful login
    res.redirect('/');
    console.log('Valid user')
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).send('An error occurred during login.');
  }
});

app.get('/logout', (req, res) => {
  // Clear the session data
  req.session.destroy((err) => {
    if (err) {
      console.error('Error logging out:', err);
      res.status(500).send('An error occurred while logging out.');
    } else {
      // Redirect to the desired page after successful logout
      res.redirect('/');
    }
  });
});
