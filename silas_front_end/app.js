const http = require('http');
const hostname = '127.0.0.1';
const port = 3000;
const express = require('express')
const app = express()

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('about.html');
});

app.get('/about', function (req, res) {
  res.send('about.html')
})

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

// connect to mySQL
var mysql      = require('mysql2');
var connection = mysql.createConnection({
  host     : '127.0.0.1',
  user     : 'root',
  password : 'iamhackerman'
});
 
connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
 
  console.log('connected as id ' + connection.threadId);
});

