
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = process.env.PORT || 5000;

// MySQL Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Your MySQL username
  password: '', // Your MySQL password
  database: 'contact_form' // Your MySQL database name
});

db.connect(err => {
  if (err) {
    throw err;
  }
  console.log('MySQL Connected...');
});

// Middleware
app.use(bodyParser.json());

// API Route
app.post('/api/contact', (req, res) => {
  const { name, email, message, contactNumber } = req.body;
  const sql = 'INSERT INTO contacts (name, email, message, contact_number) VALUES (?, ?, ?, ?)';
  db.query(sql, [name, email, message, contactNumber], (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.send('Contact added!');
  });
});

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
  });
}

app.listen(port, () => console.log(`Server started on port ${port}`));
