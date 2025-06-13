const express = require('express');
const userRoutes = require('./routes/usersRoute')

const port = 3000;

const app = express();

app.use(express.json());

// test route
app.get('/', (req, res) => {
    res.status(200).send('Test route');
});

// users routes
app.use('/users', userRoutes);

// Handle 404 for any other routes
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})