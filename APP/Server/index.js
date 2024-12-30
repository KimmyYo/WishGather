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

app.get('/deliver', (req, res) => queryDatabase('運送', res));

app.get('/provide', (req, res) => queryDatabase('提供', res));

app.get('/match', (req, res) => queryDatabase('媒合', res));

app.get('/record', (req, res) => queryDatabase('記錄', res));

app.get('/order', (req, res) => queryDatabase('訂購', res));

app.get('/cooperate', (req, res) => queryDatabase('合作', res));

app.get('/getOfferingType', async(req, res) => {
    try{
        let [rows] = await db.promise().query('SELECT DISTINCT TYPE FROM 供品資訊');
        res.status(200).json(rows);

    }catch(error){
        console.error('Error fetching offering types:', error);
        res.status(500).json({error: 'Failed to fetch offering types'});
    }
});

app.get('/temples_info/:id', async(req, res) => {
    console.log(req.body);
    try{
        let query = ` SELECT * FROM 宮廟`;
        if(req.params.id != null && req.params.id != undefined){
            query += ` WHERE tID = ? `;
        }
        let [result] = await db.promise().query(query, req.params.id != null ? [req.params.id]:[]);
        res.json(result);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ errorMessage: "An error occurred while fetching match data." });
    }
})

app.get('/ceremony/:id', async(req, res) => {
    try {
        let query = `SELECT * FROM 法會 AS E JOIN 宮廟 AS T ON E.tID = T.tID`;
        if(req.params.id != null && req.params.id != undefined){
            query += ` WHERE E.tID = ?  `;
        }
        query += 'ORDER BY DATE';
        let [result] = await db.promise().query(query, req.params.id != null ? [req.params.id]:[]);
        res.json(result);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ errorMessage: "An error occurred while fetching match data." });
    }
})

app.get('/matchData', async (req, res) => {
    const { tID, wID, BOOKED_STATUS } = req.query;
    
    try {
        let query = `SELECT MC.tID, MC.wID, MAX(MC.UPD_DATETIME) AS UPD_DATETIME, MAX(CRT_DATETIME) AS CRT_DATETIME,
                            GROUP_CONCAT(MC.matchingID) AS matchingID,
                            W.NAME AS WELFARE_NAME, 
                            W.ADDRESS AS WELFARE_ADDRESS, 
                            W.COORDINATE AS WELFARE_COORDINATE,
                            W.IMAGE AS WELFARE_IMAGE,
                            T.NAME AS TEMPLE_NAME,
                            T.ADDRESS AS TEMPLE_ADDRESS,
                            T.COORDINATE AS TEMPLE_COORDINATE,
                            T.IMAGE AS TEMPLE_IMAGE,
                            READ_CODE('0005', MAX(MC.BOOKED_STATUS)) AS BOOKED_STATUS, 
                            READ_CODE('0002', MAX(MC.CONFIRMED_STATUS)) AS CONFIRMED_STATUS,
                            READ_CODE('0003', MAX(MC.DELIVER_STATUS)) AS DELIVER_STATUS
                     FROM 媒合 AS MC
                     LEFT JOIN 社福機構 AS W ON W.wID = MC.wID
                     LEFT JOIN 宮廟 AS T ON T.tID = MC.tID 
                     `;
        let passVar = [];
        let whereClause;
        if(tID){
            whereClause = `WHERE MC.tID = ?`;
            passVar.push(tID);
        }
        else if(wID){
            whereClause = `WHERE MC.wID = ? `;
            passVar.push(wID);
            if(BOOKED_STATUS){
                whereClause += `AND BOOKED_STATUS = ?`;
                passVar.push(BOOKED_STATUS);
            }
        }
        query += `${whereClause} GROUP BY MC.tID, MC.wID, W.NAME, W.ADDRESS, W.IMAGE ORDER BY MAX(MC.UPD_DATETIME) DESC, MAX(MC.CRT_DATETIME) DESC`;


        let [rows] = await db.promise().query(query, passVar);
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ errorMessage: "An error occurred while fetching match data." });
    }
});

app.get('/matchDetails', async (req, res) => {
    const { wID, tID, BOOKED_STATUS} = req.query
    const query = `SELECT M.tID, MD.wID, 
                          OD.CHN, SUM(MD.amount) AS AMOUNT, 
                          READ_CODE('0004', MD.TYPE) AS TYPE,
                          READ_CODE('0005', M.BOOKED_STATUS) AS BOOKED_STATUS,
                          READ_CODE('0003', M.DELIVER_STATUS) AS DELIVER_STATUS,
                          READ_CODE('0002', M.CONFIRMED_STATUS) AS CONFIRMED_STATUS
                   FROM 媒合細項 AS MD
                   JOIN 媒合 AS M ON M.wID = MD.wID AND M.tID = MD.tID
                   LEFT JOIN 供品資訊 AS OD
                   ON MD.oID = OD.oID
                   WHERE MD.wID = ? AND M.tID = ? AND M.BOOKED_STATUS = ?
                   GROUP BY M.tID, MD.wID, OD.CHN, MD.TYPE, M.BOOKED_STATUS, M.DELIVER_STATUS, M.CONFIRMED_STATUS`;
    try {
        const [rows] = await db.promise().query(query, [wID, tID, BOOKED_STATUS]);
        res.json({matchingDetails: rows});
    }
    catch(error){
        console.log(error);
        res.status(500).json({errorMessage: "Failed to fetch matching details"});
    }
})

app.post('/delete_event', async(req, res) => {
    const { eID } = req.body;
    const queryDeleteEvent = `DELETE FROM hf.法會 WHERE eID = ?`;

    try {
        const [result] = await db.promise().query(queryDeleteEvent, [eID]);
        res.status(200).json({ message: '刪除法會成功' });
    } catch (error) {
        console.error('Database error:', error);
        return res.status(500).json({ error: '刪除法會成功，請稍後再試' });
    }

})


app.post('/temple_event', async (req, res) => {
    const { tID, eID, NAME, DESCRIPTION, DATE } = req.body;

    if(!eID){
        queryInsertEvent = `INSERT INTO hf.法會 (tID, NAME, DESCRIPTION, DATE) VALUES (?, ?, ?, ?)`;
        values = [tID, NAME, DESCRIPTION, DATE];
    }
    else{
        queryInsertEvent =  `UPDATE hf.法會 SET NAME = ?, DESCRIPTION = ?, DATE = ? WHERE eID = ?`;
        values = [NAME, DESCRIPTION, DATE, eID];
    }

    try {
        const [result] = await db.promise().query(queryInsertEvent, values);
        res.status(200).json({success: true});
    } catch (error) {
        console.error('Database error:', error);
        return res.status(500).json({ success: false});
    }
});


// 取得宮廟的供品
app.get('/believer_get_temple_items/:temple_id', (req, res) => {
    const temple_id = req.params.temple_id;
    const query = 'SELECT * FROM temple_offering WHERE mID = ?';
    db.query(query, [temple_id], (err, results) => {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }
      res.json(results);
    });
  });

// 取得宮廟資訊
app.get('/believer_get_temple_info/:temple_id', (req, res) => {  // 修改路由名稱
    const temple_id = req.params.temple_id;
    const query = 'SELECT * FROM 宮廟 WHERE tID = ?';
    db.query(query, [temple_id], (err, results) => {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }
      res.json(results[0]);
    });
  });

// 將供品加入購物車
app.post('/add_to_cart', (req, res) => {
    try {
      const { templeName, itemCount, totalAmount, IMAGE, pID, tID, type } = req.body;
  
      // 基本資料驗證
      if (!templeName || !itemCount || itemCount < 1) {
        return res.status(400).json({ 
          error: 'Invalid input data',
          details: 'Temple name and valid item count are required' 
        });
      }
  
      const query = `
        INSERT INTO cart_items (
          templeName, 
          itemCount, 
          totalAmount, 
          IMAGE, 
          pID, 
          tID,
          TYPE
        ) VALUES (?, ?, ?, ?, ?, ?, ?)
      `;
  
      const values = [
        templeName, 
        itemCount, 
        totalAmount, 
        IMAGE, 
        pID, 
        tID,
        type
      ];
  
      db.query(query, values, (err, results) => {
        if (err) {
          console.error('Error adding item to cart:', err);
          return res.status(500).json({ error: 'Failed to add item to cart' });
        }
  
        res.status(200).json({ 
          message: 'Item added to cart successfully',
          cartItemId: results.insertId
        });
      });
  
    } catch (error) {
      console.error('Error processing add to cart:', error);
      res.status(400).json({ 
        error: 'Processing error',
        message: error.message 
      });
    }
  });

// Delete temple offering
app.delete('/temple_offering/:id', (req, res) => {
    const offeringId = req.params.id; 
  
    const query = 'DELETE FROM temple_offering WHERE offering_id = ?';
  
    db.query(query, [offeringId], (err, results) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({ error: 'Database error' });
      }
  
      res.status(200).json({ message: 'Offering deleted successfully' });
    });
  });

// Edit temple offering
app.post('/edit_temple_offering/:id', (req, res) => {
    try {
      const OFFERING_TYPES = {
        '水果': 'A',
        '飲料': 'B',
        '包裝零食': 'C',
        '一般零食': 'D',
        '罐頭': 'E',
        '米': 'F'
      };
  
      const offeringId = req.params.id;
      const { mID, name, type, amount, price, remark, imageUrl } = req.body;
      
      console.log('Received data:', req.body);
  
      // 基本資料驗證
      if (!name || !type || isNaN(price) || price < 0) {
        return res.status(400).json({ 
          error: 'Invalid input data',
          details: 'Name, type and valid price are required' 
        });
      }
  
      // 驗證並轉換供品類型
      const convertedType = OFFERING_TYPES[type];
      if (!convertedType) {
        return res.status(400).json({ 
          error: 'Invalid offering type',
          validTypes: Object.keys(OFFERING_TYPES)
        });
      }
  
      const query = `
        UPDATE temple_offering
        SET mID = ?, 
            NAME = ?, 
            TYPE = ?, 
            AMOUNT = ?, 
            PRICE = ?, 
            DESCRIPTION = ?, 
            IMAGE = ?
        WHERE offering_id = ?
      `;
  
      const values = [
        mID, 
        name, 
        convertedType, 
        amount, 
        price, 
        remark, 
        imageUrl, 
        offeringId
      ];
  
      db.query(query, values, (err, results) => {
        if (err) {
          console.error('Error updating offering:', err);
          return res.status(500).json({ error: 'Database error' });
        }
  
        if (results.affectedRows === 0) {
          return res.status(404).json({ error: 'Offering not found' });
        }
  
        res.status(200).json({ 
          message: 'Offering updated successfully',
          convertedType: convertedType
        });
      });
  
    } catch (error) {
      console.error('Error processing offering update:', error);
      res.status(400).json({ 
        error: 'Processing error',
        message: error.message 
      });
    }
  });
  
// Get temple offering
app.get('/get_temple_offering/:userId', (req, res) => {
    const userId = req.params.userId;

    const query = 'SELECT * FROM temple_offering WHERE mID = ?';
  
    db.query(query, [userId], (err, results) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({ error: 'Database error' });
      }
  
      // 返回查詢結果
      res.status(200).json(results);
    });
  });

// Temple upload offering
app.post('/uploadOffering/:id', (req, res) => {
    try {
      const OFFERING_TYPES = {
        '水果': 'A',
        '飲料': 'B',
        '包裝零食': 'C',
        '一般零食': 'D',
        '罐頭': 'E',
        '米': 'F'
      };
  
      const { name, price, remark, amount, imageUri, type } = req.body;
      const mID = req.params.id;
  
      // 基本資料驗證
      if (!name || !type || isNaN(price) || price < 0) {
        return res.status(400).json({ 
          error: 'Invalid input data',
          details: 'Name, type and valid price are required' 
        });
      }
  
      // 驗證並轉換供品類型
      const convertedType = OFFERING_TYPES[type];
      if (!convertedType) {
        return res.status(400).json({ 
          error: 'Invalid offering type',
          validTypes: Object.keys(OFFERING_TYPES)
        });
      }
  
      const query = `
        INSERT INTO temple_offering (mID, NAME, TYPE, AMOUNT, PRICE, DESCRIPTION, IMAGE)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `;
  
      const values = [mID, name, convertedType, amount, price, remark, imageUri];
  
      db.query(query, values, (err, results) => {
        if (err) {
          console.error('Error inserting offering:', err);
          return res.status(500).json({ error: 'Database error' });
        }
  
        res.status(200).json({ 
          message: 'Offering uploaded successfully', 
          offeringId: results.insertId,
          convertedType: convertedType
        });
      });
  
    } catch (error) {
      console.error('Error processing offering upload:', error);
      res.status(400).json({ 
        error: 'Processing error',
        message: error.message 
      });
    }
  });

  // order confirm
  app.post('/orders_confirm/:id', async (req, res) => {
    const userId = req.params.id;
    
    const {
      activity_name,
      totalAmount,
      pickup_date,
      pickup_time,
      payment_method,
      note,
      cart_id,
      donation,
      tID,
      type
    } = req.body;
  
    if (!activity_name || !totalAmount || !pickup_date || !pickup_time || !payment_method || !cart_id || !tID) {
      return res.status(400).json({ error: '請填寫所有必要的訂單資訊' });
    }
  
    let ORDER_ID;
  
    try {
      // 1. 找到最新的 order_id
      const [id_result] = await db.promise().query('SELECT MAX(order_id) AS order_id FROM hf.訂單');
      ORDER_ID = (id_result[0].order_id || 0) + 1;
  
      // 2. 插入訂單
      const queryInsertOrder = `
        INSERT INTO hf.訂單 (
          order_id, pID, activity_name, pickup_date, pickup_time,
          payment_method, note, totalAmount, cart_id, donation_status, tID, TYPE
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;
  
      const values = [
        ORDER_ID,
        userId,
        activity_name,
        pickup_date,
        pickup_time,
        payment_method,
        note || '',
        totalAmount,
        cart_id,
        donation ? "是" : "否",
        tID,
        type || 'A'
      ];
  
      await db.promise().query(queryInsertOrder, values);
  
      // 3. 查詢當前最大的 gID
      const [maxGIDResult] = await db.promise().query('SELECT MAX(gID) AS max_gID FROM hf.供品');
      let nextGID = (maxGIDResult[0].max_gID || 0) + 1;
  
      // 4. 獲取購物車項目並插入供品表
      const [cartItems] = await db.promise().query('SELECT * FROM cart_items WHERE cart_id = ?', [cart_id]);
  
      if (cartItems.length === 0) {
        throw new Error('購物車是空的');
      }
  
      for (const item of cartItems) {
        const itemType = item.TYPE || type || 'A';
  
        const queryInsertOffering = `
          INSERT INTO hf.供品 (
            gID, tID_fk, NAME, TYPE, AMOUNT, IS_DONATED, IS_SCANNED, dID
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `;
  
        const offeringValues = [
          nextGID,
          tID,
          item.templeName,
          itemType,
          item.itemCount || 1,
          donation ? 1 : 0,
          'N',
          null
        ];
  
        await db.promise().query(queryInsertOffering, offeringValues);
        nextGID++;
      }
  
      // 5. 清除購物車
      await db.promise().query('DELETE FROM cart_items WHERE cart_id = ?', [cart_id]);
  
      res.status(200).json({
        message: '訂單確認成功，供品已新增，購物車已清除',
        orderId: ORDER_ID,
        type: type || 'A'
      });
  
    } catch (err) {
      console.error('插入訂單或供品時發生錯誤:', err);
      
      // 如果訂單已建立但供品插入失敗，嘗試回滾訂單
      if (ORDER_ID) {
        try {
          await db.promise().query('DELETE FROM hf.訂單 WHERE order_id = ?', [ORDER_ID]);
          console.log(`已回滾訂單 ${ORDER_ID}`);
        } catch (rollbackErr) {
          console.error('回滾訂單失敗:', rollbackErr);
        }
      }
  
      return res.status(500).json({
        error: '插入訂單失敗，請稍後再試',
        details: err.message
      });
    }
  });


// 連接CartPage
app.get('/cartItems/:id', (req, res) => {
    const userId = req.params.id; // 從路徑參數中取得 userId
  
    if (!userId) {
      return res.status(400).json({ error: '缺少 userId 參數' });
    }
  
    // 查詢購物車資料的 SQL 語句，根據信眾的 pID 查詢m對應的購物車項目
    const query = `
      SELECT cart_items.*
      FROM cart_items
      JOIN 信眾 ON 信眾.pID = cart_items.pID
      WHERE 信眾.pID = ?;
    `;
  
    // 執行 SQL 查詢
    db.query(query, [userId], (err, results) => {
      if (err) {
        console.error('查詢購物車資料時發生錯誤:', err);
        return res.status(500).json({ error: '查詢購物車資料失敗' });
      }
  
      // 返回查詢結果
      res.json(results);
    });
  });
  

// 個資維護(fetch the user information)
app.get('/updateInfo/:id', async (req, res) => {
    try {
        let userId = req.params.id;
        // 先取得該使用者的基本資料
        let query = `SELECT * FROM 會員 WHERE mID = ?`;
        let [result] = await db.promise().query(query, [userId]);

        if (result.length === 0) {
            return res.status(404).json({ message: '找不到使用者' });
        }

        let user = result[0]; 
        let role = user.ROLE;
        let addressQuery;

        // 根據使用者的角色，從對應的表取得地址資料
        if (role === '信眾') {
            addressQuery = `SELECT r.ADDRESS 
                            FROM 會員 m 
                            JOIN 信眾 r ON m.mID = r.pID 
                            WHERE m.mID = ?`;
        } else if (role === '宮廟') {
            addressQuery = `SELECT t.ADDRESS 
                            FROM 會員 m 
                            JOIN 宮廟 t ON m.mID = t.tID 
                            WHERE m.mID = ?`;
        } else if (role === '社福') {
            addressQuery = `SELECT w.ADDRESS 
                            FROM 會員 m 
                            JOIN 社福機構 w ON m.mID = w.wID 
                            WHERE m.mID = ?`;
        } else {
            return res.status(400).json({ message: '未知的角色' });
        }

        // 執行查詢來取得地址
        let [addressResult] = await db.promise().query(addressQuery, [userId]);

        if (addressResult.length > 0) {
            user.ADDRESS = addressResult[0].ADDRESS;
        } else {
            user.ADDRESS = null; // 如果沒有找到地址，設為 null
        }
        res.json(user);
    } catch (error) {
        console.error('查詢執行錯誤:', error);
        res.status(500).json({ errorMessage: "取得使用者資料時發生錯誤。" });
    }
});

// 個資維護(Update the user information)
app.post('/updateUser', async (req, res) => {
    const { mID, NAME, PHONE, EMAIL, PASSWORD, ADDRESS, ROLE } = req.body;

    // 檢查必要的資料
    if (!mID || !NAME || !EMAIL || !PASSWORD || !ROLE) {
        return res.status(400).json({ message: '缺少必要欄位' });
    }

    try {
        // 開始交易
        await db.promise().query('START TRANSACTION');

        // 更新會員資料表
        const updateMemberQuery = `
            UPDATE 會員
            SET NAME = ?, PHONE_NUM = ?, EMAIL = ?, PASSWORD = ?
            WHERE mID = ?
        `;
        await db.promise().query(updateMemberQuery, [NAME, PHONE, EMAIL, PASSWORD, mID]);

        // 根據不同的 ROLE 更新對應的表
        if (ROLE === '信眾') {
            // 更新信眾表中的 NAME, PHONE, EMAIL, ADDRESS
            const updateBelieversQuery = `
                UPDATE 信眾
                SET NAME = ?, PHONE = ?, EMAIL = ?, ADDRESS = ?
                WHERE pID = ?
            `;
            await db.promise().query(updateBelieversQuery, [NAME, PHONE, EMAIL, ADDRESS, mID]);

        } else if (ROLE === '宮廟') {
            // 更新宮廟表中的 NAME, ADDRESS
            const updateTemplesQuery = `
                UPDATE 宮廟
                SET NAME = ?, ADDRESS = ?
                WHERE tID = ?
            `;
            await db.promise().query(updateTemplesQuery, [NAME, ADDRESS, mID]);

        } else if (ROLE === '社福') {
            // 更新社福表中的 NAME, ADDRESS
            const updateWelfareQuery = `
                UPDATE 社福機構
                SET NAME = ?, ADDRESS = ?
                WHERE wID = ?
            `;
            await db.promise().query(updateWelfareQuery, [NAME, ADDRESS, mID]);
        }

        // 提交交易
        await db.promise().query('COMMIT');
        res.json({ message: '更新成功' });

    } catch (error) {
        // 若出錯，回滾交易
        await db.promise().query('ROLLBACK');
        console.error('更新失敗:', error);
        res.status(500).json({ message: '更新資料時發生錯誤', details: error.sqlMessage, sqlState: error.sqlState });
    }
});






// 註冊交易：先INSERT進入會員TABLE，再依ROLE編號各自進入（信眾、宮廟、社福機構TABLE）
app.post('/signup', async(req, res) => {
    const data = req.body;
    // 0. 檢查是否有重複的email或電話號碼
    // 1. 先找到最新的mID
    const [id_result] = await db.promise().query('SELECT MAX(mID) AS mID FROM hf.會員');
    const MEMBER_ID = (id_result[0].mID || 0) + 1;
    // 2. 決定會員ROLE
    
    let INS_ROLE_TB_SQL, insertRoleParams;
    if(data.ROLE == 'A'){
        // TODO: 調整信眾table (不跟會員重複)
        INS_ROLE_TB_SQL = `INSERT INTO 信眾 (pID, NAME, EMAIL, PHONE, ADDRESS) VALUES( ?, ?, ?, ?, ?)`;
        insertRoleParams = [MEMBER_ID, data.NAME, data.EMAIL, data.PHONE_NUM, data.ADDRESS];
    }
    else if(data.ROLE == 'B'){
        INS_ROLE_TB_SQL = `INSERT INTO 宮廟 (tID, NAME, ADDRESS, COORDINATE) 
                           VALUES (?, ?, ?, ST_GeomFromText(?))`;
        insertRoleParams = [MEMBER_ID, data.NAME, data.ADDRESS, `POINT(${data.LONGTITUDE} ${data.LATITUDE})`];
    }
    else if(data.ROLE == 'C'){
        INS_ROLE_TB_SQL = `INSERT INTO 社福機構 (wID, NAME, PREFERENCES, ADDRESS, COORDINATE) 
                           VALUES (?, ?, ?, ?, ST_GeomFromText(?))`;
        insertRoleParams = [MEMBER_ID, data.NAME, data.PREFERENCES, data.ADDRESS, `POINT(${data.LONGTITUDE} ${data.LATITUDE})`];
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
    }
    catch (error){
        await db.promise().rollback();
        console.log(error);
        res.status(500).json({ error: 'Transaction failed.', details: error.message });
    }
})

app.post('/updateUser/:id', async(req, res) => {
    const userId = req.params.id;
    // 1. 先SELECT user role 從會員table 
    const [result] = await db.promise().query('SELECT ROLE FROM 會員 WHERE mID = ?', [userId]);
    let userRole = result[0].ROLE;

    // 2. 從ROLE選擇需要更改的TABLE
    let updateTable = userRole == '公廟' ? '公廟' : '社福' // 選擇role對應的table
    try {
        await db.promise().beginTransaction();
        // if else 如果沒有需要個別table改的東
        // update 會員 

        // update 身份 
        await db.promise().commit();
    }
    catch(error){
        await db.promise().rollback();
    }
})


// after login -- token

const JWT_SECRET = 'jwt_secret'; // Replace with a real secret key
const JWT_REFRESH_SECRET = 'jwt_refresh_secret';

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
            const refreshToken = jwt.sign({userId: user.mID, email: user.EMAIL, role: user.ROLE },
                JWT_REFRESH_SECRET, {expiresIn: '7d'}
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
    const { token:refreshToken } = req.body;
    if(!refreshToken){
        return res.status(403).json({ error: 'Refresh token is required' });
    }
    jwt.verify(refreshToken, JWT_REFRESH_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'Invalid refresh token' });
        }
        const newAccessToken = jwt.sign(
            { userId: user.userId, role: user.role },
            JWT_SECRET,
            { expiresIn: '1h' }  // New short-lived access token
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

        );        console.log("here");

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
        const response = await axios.post('http://localhost:5000/proimg', form, {
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
            const objectName = detection["name"];
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
            'SELECT * FROM 宮廟 WHERE tID = ?', [userId]
        );

        if (existingUsers.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Insert new scan result
        const [scanResult] = await db.promise().query(
            'INSERT INTO ScanResults (user_id) VALUES (?)', [userId]
        );

        const scanResultId = scanResult.insertId;

        const queryInsertOffering = `INSERT INTO 供品 (tID_fk, NAME, TYPE, AMOUNT, IS_SCANNED)
                                     SELECT ?, gInfo.CHN, gInfo.TYPE, ?, 'Y'
                                     FROM 供品資訊 AS gInfo
                                     WHERE gInfo.CHN = ?`;

        try {
            // await db.promise.beginTransaction();
            for (const item of items) {
                await db.promise().query(
                    'INSERT INTO ScanItems (scan_result_id, item_name, item_count) VALUES (?, ?, ?)', [scanResultId, item.name, item.count]
                );
    
                await db.promise().query(
                    queryInsertOffering,  [userId, item.count, item.name]
                )
            }
            // await db.promise().commit();
        }
        catch (error){
            // await db.promise().rollback();
            throw error
        }
        // Insert scan items
       

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


// Route for uploading profile picture
app.post('/user/:userId/profilePicture', async (req, res) => {
    const { userId } = req.params;
    const { photo } = req.body;
    if (!photo) {
      return res.status(400).json({ error: 'No photo provided' });
    }
    try {
      // Decode base64 image
      const base64Data = photo.replace(/^data:image\/\w+;base64,/, "");
      const buffer = Buffer.from(base64Data, 'base64');
      // Generate filename with user ID
      const filename = `profile_${userId}.png`;
      const filepath = path.join(__dirname, 'uploads', 'profilePictures', filename);
      // Ensure the directory exists
      const dir = path.dirname(filepath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      // Write the file (this will overwrite any existing file with the same name)
      fs.writeFileSync(filepath, buffer);
      // Generate the relative URL for the image
      const relativeImageUrl = `/uploads/profilePictures/${filename}`;
      
      // Check 宮廟 table first, then 社福機構 table
      db.query(
        'SELECT 1 FROM 宮廟 WHERE tID = ? UNION SELECT 1 FROM 社福機構 WHERE wID = ? LIMIT 1',
        [userId, userId],
        (error, results) => {
          if (error) {
            console.error('Error checking tables:', error);
            return res.status(500).json({ error: 'Failed to check user existence' });
          }
          if (results.length === 0) {
            return res.status(404).json({ error: 'User not found in either table' });
          }
          // User exists in one of the tables, update both (it's safe as it will only affect existing records)
          db.query(
            'UPDATE 宮廟 SET IMAGE = ? WHERE tID = ?',
            [relativeImageUrl, userId],
            (error1) => {
              if (error1) console.error('Error updating 宮廟:', error1);
              
              db.query(
                'UPDATE 社福機構 SET IMAGE = ? WHERE wID = ?',
                [relativeImageUrl, userId],
                (error2) => {
                  if (error2) console.error('Error updating 社福機構:', error2);
                  
                  if (error1 && error2) {
                    return res.status(500).json({ error: 'Failed to update profile picture in both databases' });
                  }
                  res.json({ imageUrl: relativeImageUrl });
                }
              );
            }
          );
        }
      );
    } catch (error) {
      console.error('Error uploading profile picture:', error);
      res.status(500).json({ error: 'Failed to upload profile picture' });
    }
  });
  
  // Route to get profile picture
  app.get('/user/:userId/profilePicture', async (req, res) => {
    const { userId } = req.params;
    try {
      db.query(
        'SELECT IMAGE FROM 宮廟 WHERE tID = ? UNION SELECT IMAGE FROM 社福機構 WHERE wID = ? LIMIT 1',
        [userId, userId],
        (error, results) => {
          if (error) {
            console.error('Error querying database:', error);
            return res.status(500).json({ error: 'Failed to fetch profile picture' });
          }
          if (results.length > 0 && results[0].IMAGE) {
            res.json({ imageUrl: results[0].IMAGE });
          } else {
            // If no picture found, return a default relative URL
            res.json({ imageUrl: '/uploads/profilePictures/default.png' });
          }
        }
      );
    } catch (error) {
      console.error('Error fetching profile picture:', error);
      res.status(500).json({ error: 'Failed to fetch profile picture' });
    }
  });

app.get('/readCode/:codeKind', async(req, res) => {
    const { codeKind } = req.params;
    const query = `SELECT * FROM hf.CODE_COMMON WHERE CODE_KIND = ?`;
    try {
        const [rows] = await db.promise().query(query, [codeKind]);
        res.json({code: rows});
    }
    catch(error){
        console.log(error);
        res.status(500).json({ error: 'Failed to fetch code' });
    }
})
// 1. 宮廟按下一鍵媒合 trigger API
// 2. 抓取需要的資訊傳送給function 
// 3. 回傳媒合結果放入資料庫
app.post('/match_algo', async(req, res) => {
  debugger
    const { tID } = req.body;

    // // Tables: 宮廟資料，社福資料，供品資料
    const queyGetTempleOfferingInfo = ` SELECT tID, ST_AsText(COORDINATE) AS COORDINATE, 
                                               gID, oID, 
                                               offering.TYPE AS OFFERING_TYPE, offering.AMOUNT AS OFFERING_AMOUNT
                                        FROM hf.供品 AS offering 
                                        JOIN hf.供品資訊	AS offering_info
                                            ON offering.NAME = offering_info.CHN
                                        JOIN hf.宮廟 as temple 
                                            ON offering.tID_fk = temple.tID 
                                        WHERE tID_fk = ? AND offering.TYPE != 'A'
                                        AND IS_DONATED IS NULL
                                        ORDER BY OFFERING_TYPE, gID`;
                                        
    const queryGetWelfarePreferInfo = `SELECT wID, ST_AsText(COORDINATE) AS COORDINATE,
                                              PREFERENCES, NUM_OF_PEOPLE
                                       FROM hf.社福機構
                                       WHERE COORDINATE IS NOT NULL`;
    const [templeOfferingInfo] = await db.promise().query(queyGetTempleOfferingInfo, [tID]);
    const [welfareInfo] = await db.promise().query(queryGetWelfarePreferInfo);
    // MatchingAlgo(templeOfferingInfo, welfareInfo);
    if(templeOfferingInfo.length == 0){
        res.status(200).json({
            success: true,
            hasOffering: false
        });
        return;
    }
    
    const matchingInfo = {
        'temple_data': templeOfferingInfo,
        'welfare_data': welfareInfo
    }

    // 計算
    const response = await axios.post('http://localhost:5000/matching', matchingInfo, {
        headers: {
            'Content-Type': 'application/json'  // Set the content type to JSON
        }
    });
    
    // GET max matchingID 
    const [id_result] = await db.promise().query('SELECT MAX(matchingID) AS matchingID FROM 媒合');
    const initMatchingID = (id_result[0].matchingID || 0);
    let tempMatchingId = initMatchingID;
    // Insert into database
    console.log(response.data.allocation)
    const allocation = response.data.allocation;
    const matchingResult = allocation.matching;
    const matchingDetails = allocation.matching_detail;

    let queryMatchingInsert = `INSERT INTO hf.媒合 (tID, wID, matchingID, TYPE_A, TYPE_B, TYPE_C, TYPE_D, TYPE_E, TYPE_F, BOOKED_STATUS, DELIVER_STATUS, CONFIRMED_STATUS, CRT_DATETIME) VALUES `;
    // // 主檔
    const values = matchingResult.map((item) =>{
        tempMatchingId += 1
        return `(${item.tID}, ${item.wID}, ${tempMatchingId}, ${item.TYPE_A}, ${item.TYPE_B}, ${item.TYPE_C}, ${item.TYPE_D}, ${item.TYPE_E}, ${item.TYPE_F}, '${item.BOOKED_STATUS}', '${item.DELIVER_STATUS}', '${item.CONFIRMED_STATUS}', NOW())`
        
    });
    queryMatchingInsert += values.join(", ");

    tempMatchingId = initMatchingID;
    let queryInsertMatchDetail = 'INSERT INTO hf.媒合細項 (TYPE, amount, oID, wID, tID, matchingID) VALUES ';
    const detailvalue = matchingDetails.map((item) =>{
        tempMatchingId += 1
        return `('${item.TYPE}', ${item.amount}, ${item.oID}, ${item.wID}, ${tID}, ${tempMatchingId})`
    });
    
    queryInsertMatchDetail += detailvalue.join(', ');

    let queryUpdateOfferingPending = `UPDATE 供品 AS O
                                      INNER JOIN 供品資訊 AS OD ON OD.CHN = O.NAME
                                      INNER JOIN 媒合細項 AS MD ON OD.oID = MD.oID
                                      INNER JOIN 媒合 AS MC ON MC.matchingID = MD.matchingID
                                      SET O.IS_DONATED = 0
                                      WHERE OD.oID IN (?) `;
    const pendingoIDValues = matchingDetails.map((item) => item.oID);
    console.log(queryMatchingInsert);
    console.log(queryInsertMatchDetail);
    try{
        await db.promise().beginTransaction();
        await db.promise().query(
            queryMatchingInsert
        );
        await db.promise().query(
            queryInsertMatchDetail
        );
        await db.promise().query(
            queryUpdateOfferingPending, [pendingoIDValues]
        );
        await db.promise().commit();
        res.status(200).json({
            success: true,
            hasOffering: true
        });
    }catch(error){
        await db.promise().rollback();
        console.log (error);
        res.status(500).json({
            success: false,
            hasOffering: false
        });
    } 
        

});
app.put('/updateStatus', async(req, res) => {
    const { CONFIRMED_STATUS, BOOKED_STATUS, matchingID } = req.body;
    console.log('update status...');
    let query, queryPending, statusCol;
    if(CONFIRMED_STATUS) {
        query = `UPDATE 媒合 
                 SET CONFIRMED_STATUS = ?, 
                     DELIVER_STATUS = 'B',
                     UPD_DATETIME = NOW()
                 WHERE matchingID IN (?) AND BOOKED_STATUS = 'B'`;
        
        statusCol = CONFIRMED_STATUS;
    }
    else if(BOOKED_STATUS){
        query = `UPDATE 媒合 
                 SET BOOKED_STATUS = ? ,
                     UPD_DATETIME = NOW()
                 WHERE matchingID IN (?)`;
        statusCol = BOOKED_STATUS;
    }
    queryPending = `UPDATE 供品 AS O
                INNER JOIN 供品資訊 AS OD ON OD.CHN = O.NAME
                INNER JOIN 媒合細項 AS MD ON OD.oID = MD.oID
                INNER JOIN 媒合 AS MC ON MC.matchingID = MD.matchingID
                SET O.IS_DONATED = 1
                WHERE MC.matchingID IN (?)`;
    console.log(matchingID);
    try{
        db.promise().beginTransaction();
        db.promise().query(query, [statusCol, matchingID]);
        db.promise().query(queryPending, [matchingID]);
        db.promise().commit();
        res.status(200).json({
            success: true
        });
    }   
    catch(error){
        db.promise().rollback();
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Internal Server Failed'
        });
    }

   
})

  // 提供上傳的文件
  app.use('/uploads', express.static('uploads'));

// 開給全部
app.listen(port, '0.0.0.0', () => {
    console.log(`Server is running on http://localhost:${port}`);
});