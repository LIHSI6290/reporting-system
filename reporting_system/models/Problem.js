const mongoose = require('mongoose');

// 定義問題數據結構
const ProblemSchema = new mongoose.Schema({
    description: { type: String, required: true }, // 問題描述
    department: { type: String, required: true }, // 部門
    priority: { type: String, required: true },   // 優先級
    status: { type: String, default: "待處理" },  // 狀態
    createdAt: { type: Date, default: Date.now }, // 創建時間
    updatedAt: { type: Date, default: Date.now }, // 更新時間
    assignedTo: { type: String }                 // 接收人員
});

module.exports = mongoose.model('Problem', ProblemSchema);
