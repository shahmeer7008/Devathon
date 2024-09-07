// script.js

// Database connection setup (replace with your actual credentials)
const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'your_username',
  password: 'your_password',
  database: 'your_database_name'
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

// Example route for handling login requests
const express = require('express');
const app = express();
app.use(express.json());

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Query the database to verify credentials
  const sql = 'SELECT * FROM users WHERE username = ? AND password = ?';
  connection.query(sql, [username, password], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      if (results.length > 0) {
        // Authentication successful
        res.status(200).json({ message: 'Login successful' });
      } else {
        // Invalid credentials
        res.status(401).json({ error: 'Invalid username or password' });
      }
    }
  });
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
// side bar
// Get the sidebar and dropdown elements
const sidebar = document.querySelector('.sidebar');
const dropdownBtn = document.querySelector('.dropdown');
const dropdownContent = document.querySelector('.dropdown-content');

// Function to toggle the sidebar visibility
function toggleSidebar() {
  sidebar.classList.toggle('active');
}

// Add event listener to the dropdown button
dropdownBtn.addEventListener('click', toggleSidebar);

// Add event listener to close the sidebar when clicking outside of it
document.addEventListener('click', function(event) {
  if (!sidebar.contains(event.target) && !dropdownBtn.contains(event.target)) {
    sidebar.classList.remove('active');
  }
});