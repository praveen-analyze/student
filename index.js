require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
})
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.error(err));

// Import Model
const Student = require('./models/Student');

// Routes

// Get all students
app.get('/api/students', async (req, res) => {
    try {
        const students = await Student.find();
        res.json(students);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Add student
app.post('/api/students', async (req, res) => {
    const { name, email, age, course } = req.body;
    const newStudent = new Student({ name, email, age, course });
    try {
        const savedStudent = await newStudent.save();
        res.status(201).json(savedStudent);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update student
app.put('/api/students/:id', async (req, res) => {
    try {
        const updatedStudent = await Student.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json(updatedStudent);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete student
app.delete('/api/students/:id', async (req, res) => {
    try {
        await Student.findByIdAndDelete(req.params.id);
        res.json({ message: 'Student deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
