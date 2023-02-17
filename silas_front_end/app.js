const express = require('express');
const mysql = require('mysql2/promise');
const app = express();
const port = 3000;
const fs = require('fs');
const path = require('path');

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/home.html');
});
app.get('/about', function (req, res) {
  res.sendFile(__dirname + '/about.html');
});
app.get('/input', function (req, res) {
  res.sendFile(__dirname + '/input.html');
});
app.get('/test-input', function (req, res) {
  res.sendFile(__dirname + '/test-input.html');
});
app.get('/form', (req, res) => {
  res.render('form'); // render the form page
});


app.listen(port, function (){
  console.log(`Server running at http://localhost:${port}/`);
});

// connect to mySQL
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'iamhackerman',
  database: 'discs',
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
      const conn = await pool.getConnection();
      const result = await conn.execute(
            'INSERT INTO '+table+'(Mold, Plastic, Brand, Weight, Speed, Glide, Turn, Fade, Slot, Category, Color, Stamp, `Sleepy Scale`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [
        mold ?? null,
        plastic ?? null,
        brand ?? null,
        weight ?? null,
        speed ?? null,
        glide ?? null,
        turn ?? null,
        fade ?? null,
        slot ?? null,
        category ?? null,
        color ?? null,
        stamp ?? null,
        sleepyscale ?? null

        ]
      );
      conn.release();
      
      //Write formData to file
      const formData = `('${mold}', '${plastic}', '${brand}', ${weight}, ${speed}, ${glide}, ${turn}, ${fade}, '${slot}', '${category}', ${color}', '${stamp}', ${sleepyscale}),\n`;
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

