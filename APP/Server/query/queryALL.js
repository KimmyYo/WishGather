// 通用的資料查詢函數

const db = require('../config/db');

const queryDatabase = (tableName, res) => {

    db.query(`SELECT * FROM ${tableName}`, (err, results) => {
        if (err) {
            console.error(`Failed to query ${tableName}:`, err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        res.json(results);
    });
};


module.exports = {
    queryDatabase
};