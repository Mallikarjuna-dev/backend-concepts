const express = require('express');
const dishRoutes = require('./routes/dishRoutes');

const port = 3000;

const app = express();

app.use(express.json());

// Dishes API routes
app.use('/dishes', dishRoutes);

//Handle Undefined Routes
app.use((req, res) => {
    res.status(404).json({ msg: "Route not found" });
});

// start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});