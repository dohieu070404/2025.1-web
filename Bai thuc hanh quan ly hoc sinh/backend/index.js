const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Student = require('./Student');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/student_db')
    .then(() => console.log(' Đã kết nối MongoDB thành công'))
    .catch(err => console.error(' Lỗi MongoB:', err));


app.get('/api/students', async (req, res) => {
    try {
        const students = await Student.find();
        res.json(students);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/', (req, res) => {
    res.send('Student API đang chạy...');
});

app.listen(PORT, () => {
    console.log(` Server đang chạy tại http://localhost:${PORT}`);
});
