const express = require('express');

const router = express.Router();

const users = [
    {
        id: 1,
        name: 'John Doe',
        age: 26,
        email: 'doe@gmail.com'
    },
    {
        id: 2,
        name: 'Jessy Pinkman',
        age: 24,
        email: 'jessy@gmail.com'
    },
    {
        id: 3,
        name: 'Walter White',
        age: 42,
        email: 'walt@gmail.com'
    }
]

router.get('/get', (req, res) => {
    res.status(200).json(users[0]);
});


router.get('/list', (req, res) => {
    res.status(200).json(users);
});

module.exports = router;
