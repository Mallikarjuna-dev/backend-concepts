const express = require("express");
const {
    GetAllCourse,
    addCourse,
    updateCourse,
    deleteCourse,
    getCourseById,
    getCourseByQuery
} = require("../controllers/courseController");
const dataCheck = require("../middleware/dataCheck");

const router = express.Router();

router.get("/all-courses", GetAllCourse)

// Post route to add a course with data validation middleware (dataCheck)
router.post("/add-course", dataCheck, addCourse)

router.put("/update-course/:id", updateCourse)

router.delete("/delete-course/:id", deleteCourse)

// Course by ID (Dynamic Routing)
router.get("/course/:id", getCourseById)

// Get courses by title (query parameter)
router.get("/course", getCourseByQuery)


module.exports = router;
