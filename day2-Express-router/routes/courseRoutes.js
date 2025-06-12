const express = require("express");
const {
    GetAllCourse,
    addCourse,
    updateCourse,
    deleteCourse,
    getCourseById,
    getCourseByQuery
} = require("../controllers/courseController");

const router = express.Router();

router.get("/all-courses", GetAllCourse)

router.post("/add-course", addCourse)

router.put("/update-course/:id", updateCourse)

router.delete("/delete-course/:id", deleteCourse)

// Course by ID (Dynamic Routing)
router.get("/course/:id", getCourseById)

// Get courses by title (query parameter)
router.get("/course", getCourseByQuery)


module.exports = router;
