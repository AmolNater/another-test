// vulnerable.js
const SQL = require('sql.js'); // Example SQLite library for JavaScript[](https://github.com/sql-js/sql.js)
const express = require('express');
const app = express();

// Initialize SQLite database
const db = new SQL.Database();

// Create a sample table
db.run("CREATE TABLE users (id INTEGER, username TEXT);");
db.run("INSERT INTO users VALUES (1, 'testuser');");

// Vulnerable endpoint (simulating SQL injection)
app.get('/user', (req, res) => {
    const userId = req.query.id; // User input directly used in query
    const query = `SELECT * FROM users WHERE id = ${userId}`; // Vulnerable to SQL injection
    try {
        const result = db.exec(query);
        res.json(result);
    } catch (error) {
        res.status(500).send('Query error: ' + error.message);
    }
});

app.listen(3000, () => console.log('Server running on port 3000'));
