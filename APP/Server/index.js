const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Phone Variables
const multer = require('multer');
const fs = require('fs');
const FormData = require('form-data');
const path = require('path');
const axios = require('axios');


var router = express.Router();
const app = express();

app.use(bodyParser.json({ limit: '5000mb' }));
app.use(bodyParser.urlencoded({ limit: '5000mb', extended: true }));


app.use(cors()); // 用CORS
//app.use(bodyParser.json());




//for photo
// Define storage configuration
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'uploads/'); // Directory to store the uploaded files
//     },
//     filename: (req, file, cb) => {
//         cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname)); // Rename the file
//     }
// });


// const upload = multer({
//     storage: storage,
//     limits: { fileSize: 10 * 1024 * 1024 }  // Set the limit to 10 MB
// });




const port = 3000;

//連線資料庫
const db = require('./config/db');

//資料庫操作

// 通用的資料查詢函數
const { queryDatabase } = require('./query/queryALL');



app.get('/test', (req, res) => queryDatabase('test', res)); // 這個之後要改(CartPage.js用的)

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

app.get('/temples_info', (req, res) => queryDatabase('廟方資訊', req, res));

app.get('/deliver', (req, res) => queryDatabase('運送', res));

app.get('/provide', (req, res) => queryDatabase('提供', res));

app.get('/match', (req, res) => queryDatabase('媒合', res));

app.get('/record', (req, res) => queryDatabase('記錄', res));

app.get('/order', (req, res) => queryDatabase('訂購', res));

app.get('/cooperate', (req, res) => queryDatabase('合作', res));

app.get('/temples_info/:id', async(req, res) => {
    try {
        let query = ` SELECT * FROM 宮廟 `;
        if (req.params.id != null && req.params.id != undefined) {
            query += ` WHERE tID = ? `;
        }
        let [result] = await db.promise().query(query, req.params.id != null ? [req.params.id] : []);
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ errorMessage: "An error occurred while fetching match data." });
    }
})

app.get('/ceremony/:id', async(req, res) => {
    try {
        let query = `SELECT * FROM 法會`;
        if (req.params.id != null && req.params.id != undefined) {
            query += ` WHERE tID = ? `;
        }
        let [result] = await db.promise().query(query, req.params.id != null ? [req.params.id] : []);
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ errorMessage: "An error occurred while fetching match data." });
    }
})
app.get('/match/:id', async(req, res) => {
    try {
        let query = `SELECT MC.tID, MC.wID, READ_CODE('0002', MC.BOOKED_STATUS), 
                            READ_CODE('0003', MC.DELIVER_STATUS), MC.SUPPLY_CONTENT,
                            SW.NAME, SW.IMAGE, SW.ADDRESS
                     FROM 媒合 AS MC
                     JOIN 社福機構 AS SW 
                        ON SW.wId = MC.wId
                     WHERE tID = ?`;
        let [rows] = await db.promise().query(query, [req.params.id]);
        console.log(rows);
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ errorMessage: "An error occurred while fetching match data." });
    }
});


// 註冊交易：先INSERT進入會員TABLE，再依ROLE編號各自進入（信眾、宮廟、社福機構TABLE）
app.post('/signup', async(req, res) => {
    // 1. 先找到最新的mID
    const [id_result] = await db.promise().query('SELECT MAX(mID) AS mID FROM hf.會員');
    const MEMBER_ID = (id_result[0].mID || 0) + 1;
    // 2. 決定會員ROLE
    const data = req.body;
    let INS_ROLE_TB_SQL, insertRoleParams;
    if (data.ROLE == 'A') {
        // TODO: 調整信眾table (不跟會員重複)
        INS_ROLE_TB_SQL = `INSERT INTO 信眾 (pID, NAME, EMAIL, PHONE, ADDRESS) VALUES( ?, ?, ?, ?, ?)`;
        insertRoleParams = [MEMBER_ID, data.NAME, data.EMAIL, data.PHONE_NUM, data.ADDRESS];
    } else if (data.ROLE == 'B') {
        INS_ROLE_TB_SQL = `INSERT INTO 宮廟 (tID, NAME, ADDRESS) VALUES (?, ?, ?)`;
        insertRoleParams = [MEMBER_ID, data.NAME, data.ADDRESS];
    } else if (data.ROLE == 'C') {
        INS_ROLE_TB_SQL = `INSERT INTO 社福機構 (wID, NAME, ADDRESS) VALUES (?, ?, ?)`;
        insertRoleParams = [MEMBER_ID, data.NAME, data.ADDRESS]
    }

    const INS_MEM_SQL = `INSERT INTO 會員 (mID, NAME, EMAIL, PHONE_NUM, PASSWORD, ROLE, CRT_DATETIME) SELECT ?, ?, ?, ?, ?, READ_CODE('0001', '${data.ROLE}'), NOW()`;
    const hashedPassword = await bcrypt.hash(data.PASSWORD, 10);
    console.log(hashedPassword);
    try {
        await db.promise().beginTransaction();
        await db.promise().query(
            INS_MEM_SQL, [MEMBER_ID, data.NAME, data.EMAIL, data.PHONE_NUM, hashedPassword]
        )
        await db.promise().query(
            INS_ROLE_TB_SQL, insertRoleParams
        )
        await db.promise().commit();
        res.status(200).json({ message: 'Signup successful.' });
    } catch (error) {
        await db.promise().rollback();
        console.log('errorthis');
        res.status(500).json({ error: 'Transaction failed.', details: error.message });
    }
})


// CartPage


// after login -- token

const JWT_SECRET = 'hfMIS'; // Replace with a real secret key
const JWT_REFRESH_SECRET = 'hfDEEPLEARNING';

// sign-in route
app.post('/signin', async(req, res) => {
    const { EMAIL, PASSWORD } = req.body;

    console.log('Received sign-in data:', req.body);

    if (!EMAIL || !PASSWORD) {
        return res.status(400).json({ error: 'Email and password are required' });
    }

    try {
        const [users] = await db.promise().query(
            'SELECT * FROM 會員 WHERE EMAIL = ?', [EMAIL]
        );
        console.log('Database query result:', users);
        if (users.length == 0) return res.status(401).json({ error: 'Invalid email' });

        const user = users[0]; // Get the first (and should be only) user
        if (!user.ROLE) return res.status(400).json({ error: 'Role is undefined for this user' });

        // Now compare the provided password with the stored hash
        const match = await bcrypt.compare(PASSWORD, user.PASSWORD);
        if (match) {
            // Generate access token
            const accessToken = jwt.sign({ userId: user.mID, email: user.EMAIL, role: user.ROLE }, // Include the role in the token
                JWT_SECRET, { expiresIn: '1h' }
            );
            // Generate refresh token
            const refreshToken = jwt.sign({ userId: user.mID, email: user.EMAIL, role: user.ROLE },
                JWT_REFRESH_SECRET, { expiresIn: '7d' }
            );
            // Store refresh token to 會員table 
            // await db.promise().query(`UPDATE 會員 SET REFRESH_TOKEN = ${refreshToken} WHERE mID = ${user.mID}`);

            // Return the token and refresh token (and role?)
            res.json({ token: accessToken, refreshToken });
        } else {
            res.status(401).json({ error: 'Invalid password' });
        }
    } catch (error) {
        console.error('Error during signin:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/refreshtoken', async(req, res) => {
    const { token: refreshToken } = req.body;
    if (!refreshToken) {
        return res.status(403).json({ error: 'Refresh token is required' });
    }
    jwt.verify(refreshToken, JWT_REFRESH_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'Invalid refresh token' });
        }
        const newAccessToken = jwt.sign({ userId: user.userId, role: user.role },
            JWT_SECRET, { expiresIn: '1h' } // New short-lived access token
        );

        res.json({ token: newAccessToken });
    })
})


// Middleware to check if user is authenticated
function isAuthenticated(req, res, next) {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, JWT_SECRET, (err, user) => {
            console.log(err);
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
app.get('/profile', isAuthenticated, async(req, res) => {
    try {
        const [rows] = await db.promise().query('SELECT * FROM `會員` WHERE mID = ?', [req.user.userId]);
        if (rows.length > 0) {
            const user = rows[0];
            res.json({
                message: 'This is a protected route',
                userId: user.mID,
                email: user.EMAIL,
                name: user.NAME,
                phone: user.PHONE_NUM,
                password: user.PASSWORD,
                role: user.ROLE,

            });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error('Error fetching user profile:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});




//Signup route
app.post('/believers', async(req, res) => {

    const { NAME, PHONE, EMAIL, PASSWORD, ROLE } = req.body;


    console.log('Received signup data:', req.body);

    // Input validation

    if (!NAME || !PHONE || !EMAIL || !PASSWORD || !ROLE) {

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

            'INSERT INTO `信眾` (NAME, PHONE, EMAIL, PASSWORD, ROLE) VALUES (?, ?, ?, ?, ?)', [NAME, PHONE, EMAIL, hashedPassword, ROLE]

        );
        console.log("here");

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

// 更新個資維護
app.post('/believersUpdate', async(req, res) => {
    const { NAME, PHONE, EMAIL, PASSWORD } = req.body;

    console.log('Received update data:', req.body);

    // Input validation
    if (!NAME || !PHONE || !EMAIL || !PASSWORD) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        // Check if user exists
        const [existingUsers] = await db.promise().query(
            'SELECT * FROM `信眾` WHERE PHONE = ? OR EMAIL = ?', [PHONE, EMAIL]
        );

        if (existingUsers.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        const hashedPassword = await bcrypt.hash(PASSWORD, 10);

        // Update user information
        const [result] = await db.promise().query(
            'UPDATE `信眾` SET NAME = ?, PHONE = ?, EMAIL = ?, PASSWORD = ? WHERE PHONE = ? OR EMAIL = ?', [NAME, PHONE, EMAIL, hashedPassword, PHONE, EMAIL]
        );

        console.log('User updated successfully:', result);

        res.status(200).json({ message: 'User updated successfully' });
    } catch (error) {
        console.error('Detailed update error:', error);
        res.status(500).json({
            error: 'Internal server error',
            details: error.message,
            sqlMessage: error.sqlMessage,
            sqlState: error.sqlState
        });
    }
});


app.post('/upimg', async(req, res) => {
    try {
        const { photo } = req.body;

        if (!photo) {
            return res.status(400).send('No photo provided.');
        }

        // Decode base64 image
        const base64Data = photo.replace(/^data:image\/png;base64,/, "");
        const imagePath = path.join(__dirname, 'uploads', 'image.png');

        // Ensure the uploads directory exists
        if (!fs.existsSync(path.dirname(imagePath))) {
            fs.mkdirSync(path.dirname(imagePath), { recursive: true });
        }

        fs.writeFileSync(imagePath, base64Data, 'base64');

        // Process the image with the Python script
        const result = await processImageWithPython(imagePath);

        // Send response back to client
        res.json(result);

    } catch (error) {
        console.error('Error processing image:', error);
        res.status(500).send('Error processing image.');
    }
});


const processImageWithPython = async(imagePath) => {
    try {
        console.log('Preparing to send image to Python server...');

        const form = new FormData();
        form.append('image_path', fs.createReadStream(imagePath));

        // Log form headers and other relevant information
        console.log('Form headers:', form.getHeaders());

        //丟去 flask server
        const response = await axios.post('http://140.117.71.127:5000/proimg', form, {
            headers: {
                ...form.getHeaders()
            }
        });

        console.log('Response from Python server:', response.data);


        // Count detected objects
        const objectCounts = countDetectedObjects(response.data);

        console.log('Object counts:', objectCounts);

        return objectCounts;

    } catch (error) {
        console.error('Error processing image with Python:', error.message);

        // Log additional error details
        if (error.response) {
            console.error('Response data:', error.response.data);
            console.error('Response status:', error.response.status);
            console.error('Response headers:', error.response.headers);
        } else if (error.request) {
            console.error('Request data:', error.request);
        } else {
            console.error('Error message:', error.message);
        }

        throw error;
    }
};

const countDetectedObjects = (response) => {
    try {
        // Parse the detections if needed
        const detections = JSON.parse(response.detections);

        // Initialize an object to count occurrences of each object type
        const objectCounts = {};

        // Iterate through the detections and count each object type
        detections.forEach(detection => {
            const objectName = detection.name;
            if (objectCounts[objectName]) {
                objectCounts[objectName]++;
            } else {
                objectCounts[objectName] = 1;
            }
        });

        return objectCounts;
    } catch (error) {
        console.error('Error parsing detections:', error);
        return {};
    }
};


//Scanresult -Ethan正在改你可以跳別的的梅關西// Submit scan result route
app.post('/submitScanResult', async(req, res) => {
    const { userId, items } = req.body;

    console.log('Received scan result data:', req.body);

    // Input validation
    if (!userId || !items || !Array.isArray(items) || items.length === 0) {
        return res.status(400).json({ error: 'Invalid input. User ID and non-empty items array are required' });
    }

    try {
        // Check if user exists
        const [existingUsers] = await db.promise().query(
            'SELECT * FROM 信眾 WHERE pID = ?', [userId]
        );

        if (existingUsers.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Insert new scan result
        const [scanResult] = await db.promise().query(
            'INSERT INTO ScanResults (user_id) VALUES (?)', [userId]
        );

        const scanResultId = scanResult.insertId;

        // Insert scan items
        for (const item of items) {
            await db.promise().query(
                'INSERT INTO ScanItems (scan_result_id, item_name, item_count) VALUES (?, ?, ?)', [scanResultId, item.name, item.count]
            );
        }

        console.log('Scan result inserted successfully:', scanResult);

        res.status(201).json({ message: 'Scan result submitted successfully', scanResultId: scanResultId });
    } catch (error) {
        console.error('Detailed scan result submission error:', error);
        res.status(500).json({
            error: 'Internal server error',
            details: error.message,
            sqlMessage: error.sqlMessage,
            sqlState: error.sqlState
        });
    }
});



// 開給全部
app.listen(port, '0.0.0.0', () => {
    console.log(`Server is running on http://localhost:${port}`);
});