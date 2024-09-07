const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const app = express();
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'yourpassword',
    database: 'society_management'
});

db.connect(err => {
    if (err) throw err;
    console.log('Database connected');
});

// Function to assign roles to users
app.post('/assign_role', (req, res) => {
    const { userId, role } = req.body;
    const sql = 'UPDATE users SET role = ? WHERE id = ?';
    db.query(sql, [role, userId], (err, result) => {
        if (err) throw err;
        res.send('Role assigned successfully');
    });
});

// Check user permissions before certain actions
app.post('/check_permission', (req, res) => {
    const { userId, action } = req.body;
    const sql = 'SELECT role FROM users WHERE id = ?';
    db.query(sql, [userId], (err, result) => {
        if (err) throw err;
        const userRole = result[0].role;
        // Logic to check permissions based on userRole
        if (userRole === 'admin' || userRole === 'customer_support') {
            res.send('Permission granted');
        } else {
            res.send('Permission denied');
        }
    });
});

app.listen(3000, () => {
    console.log('Server running at http://localhost:3000/');
});
