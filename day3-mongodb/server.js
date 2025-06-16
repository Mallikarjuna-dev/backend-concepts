const express = require('express');
const todoRoutes = require('./routes/todoRoutes');
const connectDB = require('./config/db');

const app = express();

connectDB();

app.use(express.json());

app.use('/todos', todoRoutes);

app.listen(8000, () => {
    console.log('Server is running on http://localhost:8000');
});