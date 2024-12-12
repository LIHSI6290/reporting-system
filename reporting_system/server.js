const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
console.log(process.env.MONGO_URI); // 檢查是否正確加載 MONGO_URI

const mongoose = require('mongoose');

const mongoURI = "mongodb+srv://l0936390242:Aa7ujm,ki8@lihsi.aj855.mongodb.net/LIHSI?retryWrites=true&w=majority";


mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('MongoDB 連接成功！');
  })
  .catch((err) => {
    console.error('MongoDB 連接失敗：', err);
  });

// MongoDB 連線字串
const dbUri = process.env.MONGO_URI; // 確保 `.env` 包含 `MONGO_URI`

// 連接 MongoDB
mongoose.connect(dbUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('成功連接到 MongoDB');
}).catch(err => {
    console.error('無法連接到 MongoDB', err);
});

// 初始化 Express 應用程式
const app = express();

// 中介軟體
app.use(cors());
app.use(bodyParser.json());

// 載入資料模型
const Problem = require('./models/Problem'); // 確保 `models/Problem.js` 存在

// API 路由
// 取得所有問題
app.get('/problems', async (req, res) => {
    const problems = await Problem.find();
    res.json(problems);
});

// 新增問題
app.post('/problems', async (req, res) => {
    const problem = new Problem(req.body);
    await problem.save();
    res.json(problem);
});

// 更新問題
app.patch('/problems/:id', async (req, res) => {
    const updatedProblem = await Problem.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );
    res.json(updatedProblem);
});

// 刪除問題
app.delete('/problems/:id', async (req, res) => {
    await Problem.findByIdAndDelete(req.params.id);
    res.json({ message: "問題已成功刪除" });
});

// 測試路由
app.get('/', (req, res) => {
    res.send("伺服器運行中");
});

// 啟動伺服器
const PORT = 5000;
app.listen(PORT, () => console.log(`伺服器運行於 http://localhost:${PORT}`));
