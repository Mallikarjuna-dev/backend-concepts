const express = require("express");
const courseRoutes = require("./routes/courseRoutes");
const lectureRoutes = require("./routes/lectureRoutes");
const loggerMiddleware = require("./middleware/logger");

const app = express();

app.use(express.json()); // Middleware to parse JSON bodies.

// app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded bodies

app.use(loggerMiddleware); // Custom middleware to log requests

// Test route to check if the server is running
app.get("/test", (req, res) => {
    res.json({ msg: "Hello from the test route!" });
});

// Course Routes 
app.use('/courses', courseRoutes)

// lecture routes
app.use('/lectures', lectureRoutes);

// Unhandled routes
app.use((req, res) => {
    res.status(404).json({ msg: "Request not found!" });
})

// Listning post
app.listen(8080, () => {
    console.log("Server is running on port 8080");
});