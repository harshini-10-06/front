const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    instructor: {
        type: String,
        required: true
    },
    students: {
        type: [String], // Array of student IDs or emails
        default: []
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Course", CourseSchema);
