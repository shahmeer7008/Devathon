// server.js
const express = require('express');
const mysql = require('mysql');

const app = express();
const port = 3000;

// MySQL connection configuration
const db = mysql.createConnection({
    host: 'localhost',
    user: 'your_username',
    password: 'your_password',
    database: 'your_database'
});

// Connect to MySQL database
db.connect(err => {
    if (err) {
        console.error('Error connecting to database:', err);
        return;
    }
    console.log('Connected to MySQL database!');
});

// API endpoint to fetch billing data
app.get('/api/billing', (req, res) => {
    const month = req.query.month || ''; // Get month from query parameter

    let query = 'SELECT * FROM billing';

    // Add filtering condition if month is provided
    if (month) {
        query += ` WHERE MONTH(date) = MONTH('${month}') AND YEAR(date) = YEAR('${month}')`;
    }

    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching data:', err);
            res.status(500).send('Internal Server Error');
            return;
        }
        res.json(results);
    });
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});