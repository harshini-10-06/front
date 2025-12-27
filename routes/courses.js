const express = require("express");
const router = express.Router();
const Course = require("../models/Course");

// =====================
// GET ALL COURSES
// =====================
router.get("/", async (req, res) => {
    try {
        const courses = await Course.find();
        res.json(courses);
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

// =====================
// CREATE NEW COURSE
// =====================
router.post("/", async (req, res) => {
    try {
        const { title, instructor } = req.body;
        if (!title || !instructor) {
            return res.status(400).json({ message: "Title and instructor required" });
        }

        const newCourse = new Course({
            title,
            instructor,
            students: []
        });

        await newCourse.save();
        res.json({ message: "Course created", course: newCourse });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

// =====================
// DELETE COURSE BY ID
// =====================
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        await Course.findByIdAndDelete(id);
        res.json({ message: "Course deleted" });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
