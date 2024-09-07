const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'pucit',
    database: 'chat_support'
});

db.connect(err => {
    if (err) throw err;
    console.log('Database connected!');
});

app.use(bodyParser.json());
app.use(express.static('public')); 

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/chat.html'); 
});

app.post('/send', (req, res) => {
    const { customer_name, message } = req.body;
    const sql = 'INSERT INTO messages (customer_name, message) VALUES (?, ?)';
    db.query(sql, [customer_name, message], (err, result) => {
        if (err) throw err;
        res.sendStatus(200);
    });
});

app.get('/messages', (req, res) => {
    const sql = 'SELECT * FROM messages WHERE timestamp >= NOW() - INTERVAL 1 WEEK ORDER BY timestamp';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
