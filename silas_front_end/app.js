const express = require('express');
const { localHostConnection, connection } = require('./db.js');
const {engine} = require('express-handlebars');
const https = require('https');
const querystring = require('querystring');

const app = express();
const port = 3000;
const fs = require('fs');
const path = require('path');




//handlebars routing
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.get('/', (req, res) => {
    res.render('home');
  });
app.get('/input', (req, res) => {
    res.render('input');
});
app.get('/test-input', (req, res) => {
    res.render('test-input');
});
app.get('/test-input-2', (req, res) => {
    res.render('test-input-2');
});
app.get('/about', (req, res) => {
    res.render('about');
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
    if (speed>0 && speed <=4){slot = 'Putter';} else if (speed>4 && speed<7){slot = 'Mid-Range';}else if(speed>6&&speed<9){slot='Fairway Driver';}else if(speed>=9&&speed<11){slot = 'Control Driver';}else if(speed>=11){slot='Distance Driver';}    
 try {
      const conn = await connection();
      const result = await conn.execute(
            'INSERT INTO '+table+'(Mold, Plastic, Brand, Weight, Speed, Glide, Turn, Fade, Slot, Category, Color, Stamp, `Sleepy Scale`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [ mold ?? null, plastic ?? null,        brand ?? null,        weight ?? null,        speed ?? null,        glide ?? null,        turn ?? null,        fade ?? null,        slot ?? null,        category ?? null,        color ?? null,        stamp ?? null,        sleepyscale ?? null
        ]
      );
      
      
      //Write formData to file
      const formData = `('${mold}', '${plastic}', '${brand}', ${weight}, ${speed}, ${glide}, ${turn}, ${fade}, '${slot}', '${category}', ${color}', '${stamp}', ${sleepyscale}),\n`;
    fs.appendFile(filePath, formData, (err) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error storing form submission');
      } else {
        console.log('Disc added to the database and form submission stored!');
        res.redirect('/test-input-2');
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error adding disc to the database');
  }
});

