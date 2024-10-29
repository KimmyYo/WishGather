// orders_confirm
app.post('/orders_confirm/:id', async (req, res) => {
  const userId = req.params.id; // 取得用戶的 pID

  // 從請求的 body 中獲取訂單資料
  const { activity_name, totalAmount, pickup_date, pickup_time, payment_method, note, cart_id, donation, tID } = req.body;

  // 檢查必要欄位是否存在
  if (!activity_name || !totalAmount || !pickup_date || !pickup_time || !payment_method || !cart_id) {
    return res.status(400).json({ error: '請填寫所有必要的訂單資訊' });
  }

  try {
    // 1. 先找到最新的 order_id
    const [id_result] = await db.promise().query('SELECT MAX(order_id) AS order_id FROM hf.訂單');
    const ORDER_ID = (id_result[0].order_id || 0) + 1; // 如果資料表是空的，從 1 開始

    // 2. 插入訂單到 hf.訂單 表
    const queryInsertOrder = `
      INSERT INTO hf.訂單 (order_id, pID, activity_name, pickup_date, pickup_time, payment_method, note, totalAmount, cart_id, donation_status, tID)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
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
      donation ? "是" : "否", // 如果 donation 是 true，保存 "是"，否則 "否"
      tID
    ];

    await db.promise().query(queryInsertOrder, values);

    // 3. 查詢當前最大的 gID，並用於供品表插入
    const [maxGIDResult] = await db.promise().query('SELECT MAX(gID) AS max_gID FROM hf.供品');
    let nextGID = (maxGIDResult[0].max_gID || 0) + 1; // 如果供品表為空，從 1 開始

    // 4. 從 cart_items 中取得對應 cart_id 的項目，並插入到供品表
    const [cartItems] = await db.promise().query('SELECT * FROM cart_items WHERE cart_id = ?', [cart_id]);

    for (const item of cartItems) {
      const queryInsertOffering = `
        INSERT INTO hf.供品 (gID, tID_fk, NAME, TYPE, AMOUNT, IS_DONATED, IS_SCANNED, dID)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `;
      const offeringValues = [
        nextGID,            // 使用遞增的 gID
        tID,                // tID_fk 表示對應的 temple ID
        item.templeName,    // NAME 使用 templeName
        item.TYPE || '未知',// TYPE，假設存在於 cart_items 中，如果不存在則使用 "未知"
        item.itemCount,     // AMOUNT 使用 itemCount
        donation ? 1 : 0,   // IS_DONATED 根據 donation 狀態設置
        0,                  // IS_SCANNED 初始設為 0
        null                // dID 設為 null
      ];
      await db.promise().query(queryInsertOffering, offeringValues);

      // 更新 gID 以便下一次插入
      nextGID++;
    }

    // 5. 刪除 cart_items 表中對應的 cart_id 資料
    const queryDeleteCartItem = 'DELETE FROM cart_items WHERE cart_id = ?';
    await db.promise().query(queryDeleteCartItem, [cart_id]);

    // 返回成功的響應，包含插入的訂單 ID
    res.status(200).json({ message: '訂單確認成功，供品已新增，購物車已清除', orderId: ORDER_ID });
  } catch (err) {
    console.error('插入訂單或供品時發生錯誤:', err);
    return res.status(500).json({ error: '插入訂單失敗，請稍後再試' });
  }
});
