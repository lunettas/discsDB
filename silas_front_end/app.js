const express = require('express');
const mysql = require('mysql2/promise');
const app = express();
const port = 3000;

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/home.html');
});
app.get('/about', function (req, res) {
  res.sendFile(__dirname + '/about.html');
});
app.get('/input', function (req, res) {
  res.sendFile(__dirname + '/input.html');
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

// handle form submission
app.post('/submit', async (req, res) => {
    const { mold, plastic, brand, weight, speed, glide, turn, fade, color, stamp, sleepyscale } = req.body;
    console.log('Received form input:', req.body);
    const formData = [
      mold || null,
      plastic || null,
      brand || null,
      weight || null,
      speed || null,
      glide || null,
      turn || null,
      fade || null,
      color || null,
      stamp || null,
      sleepyscale || null
    ];
    try {
        const conn = await pool.getConnection();
        const result = await conn.execute(
            'INSERT INTO testdiscs (Mold, Plastic, Brand, Weight, Speed, Glide, Turn, Fade, Color, Stamp, `Sleepy Scale`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            formData
        );
        conn.release();
        res.send('Disc added to the database!');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error adding disc to the database');
    }
});

// var mysql      = require('mysql2');
// var connection = mysql.createConnection({
//   host     : '127.0.0.1',
//   user     : 'root',
//   password : 'iamhackerman'
// });
 
// connection.connect(function(err) {
//   if (err) {
//     console.error('error connecting: ' + err.stack);
//     return;
//   }
 
//   console.log('connected as id ' + connection.threadId);
// });

