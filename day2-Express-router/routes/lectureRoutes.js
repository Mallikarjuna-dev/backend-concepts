const express = require("express");

const router = express.Router();

router.get("/all-lectures", (req, res) => {
    res.status(200).json({ msg: "List of lectures..." });
})

router.post("/add-lecture", (req, res) => {
    res.status(201).json({ msg: "Lecture added successfully!" });
})

router.put("/update-lecture/:id", (req, res) => {
    res.status(201).json({ msg: "Lecture updated successfully!" });
})

router.delete("/delete-lecture/:id", (req, res) => {
    res.status(200).json({ msg: "Lecture deleted successfully!" });
})

module.exports = router;