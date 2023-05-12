import express from 'express';
import { sequelize, Disc } from './public/db.mjs';
import { engine } from 'express-handlebars';
import https from 'https';
import querystring from 'querystring';
import mime from 'mime';
import path from 'path';
import fs from 'fs/promises';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;

// Serve static files from the 'public' folder
app.use(express.static(path.resolve('public'), { extensions: ['html', 'htm', 'mjs', 'jpg'] }));
console.log('Static files served from:', path.join(__dirname, 'public'));

//handlebars routing
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.get('/', (req, res) => {
    res.render('index');
  });
app.get('/input', (req, res) => {
    res.render('input');
});

app.get('/about', (req, res) => {
    res.render('about');
});
app.get('/flightchart', (req, res) => {
    res.render('flightchart');
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

    // Find the model based on the table name
    const model = sequelize.models[table];

    if (!model) {
      return res.status(400).json({ error: 'Invalid table name' });
    }

    // Use the model to fetch the discs
    const rows = await model.findAll({
      where: {
        category: category
      }
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
    // Find the model based on the table name
    const model = sequelize.models[table];

    // Insert a new row into the table
    const result = await model.create({
      Mold: mold ?? null,
      Plastic: plastic ?? null,
      Brand: brand ?? null,
      Weight: weight ?? null,
      Speed: speed ?? null,
      Glide: glide ?? null,
      Turn: turn ?? null,
      Fade: fade ?? null,
      Slot: slot ?? null,
      Category: category ?? null,
      Color: color ?? null,
      Stamp: stamp ?? null,
      'Sleepy Scale': sleepyscale ?? null
    });

    // Write formData to file
    const formData = `('${mold}', '${plastic}', '${brand}', ${weight}, ${speed}, ${glide}, ${turn}, ${fade}, '${slot}', '${category}', '${color}', '${stamp}', ${sleepyscale}),\n`;
    fs.appendFile(filePath, formData, (err) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error storing form submission');
      } else {
        console.log('Disc added to the database and form submission stored!');
        res.redirect('/input');
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error adding disc to the database');
  }
});