const express = require('express');
const sqlite3 = require('sqlite3');
const bodyParser = require('body-parser');
const cors = require('cors');

const PORT = 3000;

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

app.use(express.static('public'));
app.use(express.static('images'));

const db = new sqlite3.Database('database.db');

// Create a table for storing user data if it doesn't exist
db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    firstName TEXT,
    surname TEXT,
    email TEXT,
    password TEXT
)`);

app.get('/', (req, res) => {
    res.json({"message":"Ok"});
});

// GET All Users
app.get('/users', (req, res) => {
    // Retrieve all users from the database
    db.all('SELECT * FROM users', (err, rows) => {
        if (err) {
            console.error('Error retrieving users:', err.message);
            res.status(500).json({ error: 'Error retrieving users' });
        } else {
            // Send the user data as a JSON response
            res.status(200).json(rows);
        }
    });
});

// Register a User
app.post('/register', (req, res) => {
    const { firstName, surname, email, password } = req.body;

    // Insert the user data into the database
    db.run('INSERT INTO users (firstName, surname, email, password) VALUES (?, ?, ?, ?)',
        [firstName, surname, email, password],
        function(err) {
            if (err) {
                console.error('Error inserting user:', err.message);
                res.status(500).json({ error: 'Error registering user' });
            } else {
                console.log(`User with id ${this.lastID} registered successfully`);
                res.status(200).json({ message: 'User registered successfully' });
            }
        }
    );
});

// Login a User
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    // Check if the user with the provided email and password exists in the database
    db.get('SELECT * FROM users WHERE email = ? AND password = ?', [email, password], (err, row) => {
        if (err) {
            console.error('Error during login:', err.message);
            // res.status(500).json({ error: 'Error during login' });
        } else if (row) {
            // User found, send a success response
            // res.status(200).json({ message: 'Login successful' });
            console.log('Login successful', row);
        } else {
            // User not found or invalid credentials
            // res.status(401).json({ error: 'Invalid email or password' });
            console.log('Invalid email or password');
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
