const { getData, addOrUpdateCourse } = require("../models/courseModel");


const GetAllCourse = (req, res) => {
    let courses = getData().courses;
    res.status(200).json({ msg: "List of courses..", courses });
}

const addCourse = (req, res) => {
    let newCourse = req.body;
    let data = getData().data;
    let courses = getData().courses;
    let id = courses[courses.length - 1].id + 1;

    newCourse = { ...newCourse, id };
    courses.push(newCourse);
    data.courses = courses;
    addOrUpdateCourse(data);
    res.status(201).json(({ msg: "Course added successfully!" }));
}

const updateCourse = (req, res) => {
    let id = req.params.id;
    let updatedCourse = req.body;
    let data = getData().data;
    let courses = getData().courses;
    let index = courses.findIndex((course) => course.id == id);
    if (index == -1) {
        res.status(404).json({ msg: "Course not found!" });
    } else {
        let updatedCourses = courses.map((el, i) => {
            if (el.id == id) {
                return { ...el, ...updatedCourse };
            } else {
                return el;
            }
        })
        data.courses = updatedCourses;
        addOrUpdateCourse(data);
        res.status(201).send({ msg: "Course updated successfully!" });
    }
}

const deleteCourse = (req, res) => {
    let id = req.params.id;
    let data = getData().data;
    let courses = getData().courses;

    let index = courses.findIndex((course) => course.id == id);
    if (index == -1) {
        res.status(404).json({ msg: "Course not found!" });
    } else {
        let updatedCourses = courses.filter((el, i) => {
            return el.id != id;
        })
        data.courses = updatedCourses;
        addOrUpdateCourse(data);
        res.status(200).send({ msg: "Course deleted successfully!" });
    }
}

const getCourseById = (req, res) => {
    let id = req.params.id;
    let courses = getData().courses;
    let index = courses.findIndex((course) => course.id == id);
    if (index == -1) {
        res.status(404).json({ msg: "Course not found!" });
    } else {
        courses.forEach((el, i) => {
            if (el.id == id) {
                res.status(200).json({ msg: `Course with ID ${id} fetched successfully!`, course: el });
            }
        })
    }
}

const getCourseByQuery = (req, res) => {
    let title = req.query.title;
    let courses = getData().courses;
    let flag = true;
    courses.forEach((el, i) => {
        if (el.name.includes(title)) {
            flag = false
            res.json({ msg: "Courses found with title containing \"" + title + "\"", course: el });
        }
    })
    if (flag == true) {
        res.status(404).json({ msg: "No courses found with the given title!" });
    }
}

module.exports = {
    GetAllCourse,
    addCourse,
    updateCourse,
    deleteCourse,
    getCourseById,
    getCourseByQuery
};
