const express = require('express');
const port = 3000;

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('This is test route (Ignore this)>');
});

// Get /home route with HTML response
app.get('/home', (req, res) => {
    res.status(200).send('<h2>Welcome to Home Page</h2>');
});

// Get /aboutus route with JSON response
app.get('/aboutus', (req, res) => {
    res.status(200).json({ message: "Welcome to About Us" });
});

// Get /contactus route with dummy JSON response
app.get('/contactus', (req, res) => {
    let contactInfo = {
        email: "dummy@contactus.com",
        phone: "+1-234567890",
        address: "123 Dummy Street, City, Country"
    }
    res.status(200).json(contactInfo);
});

// handle Ubdefined routes with 404 status code
app.use((req, res) => {
    res.status(404).send('404 Not found!');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
})