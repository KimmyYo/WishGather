const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors');
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

var router = express.Router();
const app = express();

app.use(cors()); // 用CORS
app.use(bodyParser.json());
const port = 3000;

//連線資料庫
const db = require('./config/db');

//資料庫操作

// 通用的資料查詢函數
const { queryDatabase } = require('./query/queryALL');



app.get('/temples', (req, res) => queryDatabase('宮廟', res));

app.get('/transaction', (req, res) => queryDatabase('交易', res));

app.get('/offerings', (req, res) => queryDatabase('供品', res));

app.get('/ceremony', (req, res) => queryDatabase('法會', res));

app.get('/sw_organization', (req, res) => queryDatabase('社福機構', res));

app.get('/commodity', (req, res) => queryDatabase('商品', res));

app.get('/suppliers', (req, res) => queryDatabase('供品供應商', res));

app.get('/believers', (req, res) => queryDatabase('信眾', res));

app.get('/browse', (req, res) => queryDatabase('瀏覽', res));

app.get('/cart', (req, res) => queryDatabase('購物車', res));

app.get('/temples_info', (req, res) => queryDatabase('廟方資訊', res));

app.get('/deliver', (req, res) => queryDatabase('運送', res));

app.get('/provide', (req, res) => queryDatabase('提供', res));

app.get('/match', (req, res) => queryDatabase('媒合', res));

app.get('/record', (req, res) => queryDatabase('記錄', res));

app.get('/order', (req, res) => queryDatabase('訂購', res));

app.get('/cooperate', (req, res) => queryDatabase('合作', res));





//Signup route
app.post('/believers', async(req, res) => {
    const { NAME, PHONE, EMAIL, PASSWORD } = req.body;

    console.log('Received signup data:', req.body);

    // Input validation
    if (!NAME || !PHONE || !EMAIL || !PASSWORD) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        // Check if user already exists
        const [existingUsers] = await db.promise().query(
            'SELECT * FROM `信眾` WHERE PHONE = ? OR EMAIL = ?', [PHONE, EMAIL]
        );

        if (existingUsers.length > 0) {
            return res.status(400).json({ error: 'Phone number or email already exists' });
        }
        const hashedPassword = await bcrypt.hash(PASSWORD, 10);

        // Insert new user
        const [result] = await db.promise().query(
            'INSERT INTO `信眾` (NAME, PHONE, EMAIL, PASSWORD) VALUES (?, ?, ?, ?)', [NAME, PHONE, EMAIL, hashedPassword]
        );

        console.log('User inserted successfully:', result);

        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.error('Detailed signup error:', error);
        res.status(500).json({
            error: 'Internal server error',
            details: error.message,
            sqlMessage: error.sqlMessage,
            sqlState: error.sqlState
        });
    }
});


// after login -- token

const JWT_SECRET = 'hfMIS'; // Replace with a real secret key

// sign-in route
app.post('/signin', async(req, res) => {
    const { EMAIL, PASSWORD } = req.body;

    console.log('Received signup data:', req.body);

    if (!EMAIL || !PASSWORD) {
        return res.status(400).json({ error: 'Email and password are required' });

    }

    try {
        const [users] = await db.promise().query(
            'SELECT * FROM `信眾` WHERE EMAIL = ?', [EMAIL]
        );
        console.log('data:', users.length);

        if (users.length == 0) {
            return res.status(401).json({ error: 'Invalid email' });
        }

        const user = users[0]; // Get the first (and should be only) user
        console.log('user:', users[0]);

        console.log('user.PASSWORD:', user.PASSWORD);
        console.log('PASSWORD:', PASSWORD);

        // Now compare the provided password with the stored hash
        const match = await bcrypt.compare(PASSWORD, user.PASSWORD);

        if (match) {
            // Create a JWT token
            const token = jwt.sign({ userId: user.id, email: user.EMAIL },
                JWT_SECRET, { expiresIn: '1h' }
            );

            res.json({ message: 'Signed in successfully', token });
        } else {
            res.status(401).json({ error: 'Invalid  password' });
        }
    } catch (error) {
        console.error('Error during signin:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});





// Middleware to check if user is authenticated
function isAuthenticated(req, res, next) {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, JWT_SECRET, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }
            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
}

// Example protected route
app.get('/profile', isAuthenticated, (req, res) => {
    res.json({ message: 'This is a protected route', userId: req.user.userId, email: req.user.email });
});



// 開給全部
app.listen(port, '0.0.0.0', () => {
    console.log(`Server is running on http://localhost:${port}`);
});