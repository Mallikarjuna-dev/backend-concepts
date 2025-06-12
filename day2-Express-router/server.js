
const express = require("express");
const fs = require("fs");

const app = express();

app.use(express.json()); // Middleware to parse JSON bodies.

// app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded bodies

app.get("/test", (req, res) => {
    res.json({ msg: "Hello from the test route!" });
});


// Routes 
app.get("/all-courses", (req, res) => {
    let data = JSON.parse(fs.readFileSync('./db.json', 'utf-8'));
    let courses = data.courses;
    res.status(200).json({ msg: "List of courses..", courses });
})

// Course by ID (Dynamic Routing)
app.get("/course/:id", (req, res) => {
    let id = req.params.id;

    let data = JSON.parse(fs.readFileSync('./db.json', 'utf-8'));
    let courses = data.courses;
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
})

// Get courses by title (query parameter)
app.get("/course", (req, res) => {
    let title = req.query.title;

    let data = JSON.parse(fs.readFileSync('./db.json', 'utf-8'));
    let courses = data.courses;
    let flag = true;
    courses.forEach((el, i) => {
        console.log(el)
        if (el.name.includes(title)) {
            flag = false
            res.json({ msg: "Courses found with title containing \"" + title + "\"", course: el });
        }
    })
    if (flag == true) {
        res.status(404).json({ msg: "No courses found with the given title!" });
    }
})

app.post("/add-course", (req, res) => {
    let newCourse = req.body;
    let data = JSON.parse(fs.readFileSync('./db.json', 'utf-8'));
    let courses = data.courses;
    let id = courses[courses.length - 1].id + 1;
    newCourse = { ...newCourse, id };
    // console.log(id)
    courses.push(newCourse);
    fs.writeFileSync('./db.json', JSON.stringify(data));
    res.status(201).json(({ msg: "Course added successfully!" }));
})

app.put("/update-course/:id", (req, res) => {
    let id = req.params.id;
    let updatedCourse = req.body;
    let data = JSON.parse(fs.readFileSync('./db.json', 'utf-8'));
    let courses = data.courses;

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
        fs.writeFileSync('./db.json', JSON.stringify(data));

        res.status(201).send({ msg: "Course updated successfully!" });
    }
})

app.delete("/delete-course/:id", (req, res) => {
    let id = req.params.id;
    let data = JSON.parse(fs.readFileSync('./db.json', 'utf-8'));
    let courses = data.courses;

    let index = courses.findIndex((course) => course.id == id);
    if (index == -1) {
        res.status(404).json({ msg: "Course not found!" });
    } else {
        let updatedCourses = courses.filter((el, i) => {
            return el.id != id;
        })
        data.courses = updatedCourses;
        fs.writeFileSync('./db.json', JSON.stringify(data));

        res.status(200).send({ msg: "Course deleted successfully!" });
    }
})

app.delete("/delete-data", (req, res) => {
    res.send("Data deleted...");
})

app.listen(8080, () => {
    console.log("Server is running on port 8080");
});