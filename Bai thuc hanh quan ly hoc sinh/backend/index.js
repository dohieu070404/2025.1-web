const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Student = require('./Student');

const app = express();
app.use(cors());
app.use(express.json());

// ---- Kết nối MongoDB ----
mongoose.connect('mongodb://localhost:27017/student_db')
    .then(() => console.log("Đã kết nối MongoDB thành công"))
    .catch(err => console.error("Lỗi kết nối MongoDB:", err));


// ---- GET danh sách học sinh ----
app.get('/api/students', async (req, res) => {
    try {
        const students = await Student.find();
        res.json(students);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// ---- GET 1 học sinh ----
app.get('/api/students/:id', async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        if (!student) return res.status(404).json({ error: "Student not found" });
        res.json(student);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// ---- POST: Thêm học sinh ----
app.post('/api/students', async (req, res) => {
    try {
        const newStudent = await Student.create(req.body);
        res.status(201).json(newStudent);
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
});


// ---- PUT: Cập nhật học sinh ----
app.put('/api/students/:id', async (req, res) => {
    try {
        const updatedStu = await Student.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!updatedStu)
            return res.status(404).json({ error: "Student not found" });

        res.json(updatedStu);

    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});


// ---- DELETE: Xóa học sinh ----
app.delete('/api/students/:id', async (req, res) => {
    try {
        const deleted = await Student.findByIdAndDelete(req.params.id);

        if (!deleted)
            return res.status(404).json({ error: "Student not found" });

        res.json({ message: "Đã xóa học sinh", id: deleted._id });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


app.listen(5000, () => console.log("Server đang chạy tại http://localhost:5000"));
