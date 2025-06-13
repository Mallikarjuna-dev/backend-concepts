const express = require('express');
const fs = require('fs');

const router = express.Router();

const readData = () => {
    return JSON.parse(fs.readFileSync('./db.json', 'utf-8'));
};

const writeData = (data) => {
    return fs.writeFileSync('./db.json', JSON.stringify(data));
}

// Get all dishes route
router.get('/', (req, res) => {
    const dishes = readData();
    res.status(200).json(dishes);
});

// Add a new dish route
router.post('/', (req, res) => {
    const dishes = readData();
    const newDish = req.body;

    if (!newDish.name || !newDish.price || !newDish.category) {
        return res.status(400).json({ msg: "Missing required fields" })
    }
    newDish.id = dishes.length ? dishes[dishes.length - 1].id + 1 : 1;
    dishes.push(newDish);
    writeData(dishes);
    res.status(201).json({ msg: "Dish added successfully", dish: newDish });
});

// Update a specific dish by ID
router.put('/:id', (req, res) => {
    const id = req.params.id;
    const dishes = readData();
    const index = dishes.findIndex(d => d.id == id);
    if (index === -1) {
        return res.status(404).json({ msg: "Dish not found" });
    }
    const updatedDish = req.body;
    dishes[index] = { ...dishes[index], ...updatedDish };
    writeData(dishes);
    res.status(200).json({ msg: "Dish updated successfully", dish: updatedDish });
});

// Delete a specific dish by ID
router.delete('/:id', (req, res) => {
    const id = req.params.id;
    const dishes = readData();
    const index = dishes.findIndex(d => d.id == id);
    if (index === -1) {
        return res.status(404).json({ msg: "Dish not found" });
    }
    const deletedDish = dishes.splice(index, 1);
    writeData(dishes);
    res.status(200).json({ msg: "Dish deleted successfully", dish: deletedDish[0] });
});

// Search for dishes by name
router.get('/get', (req, res) => {
    const name = req.query.name;

    if (!name) {
        return res.status(400).json({ msg: "Name query parameter is required" });
    }

    const dishes = readData();
    const filteredDishes = dishes.filter(d =>
        d.name.toLowerCase().includes(name.toLowerCase())
    );
    if (filteredDishes.length === 0) {
        return res.status(404).json({ msg: "No dishes found" });
    }
    res.status(200).json(filteredDishes);
});

// Get a specific dish by ID
router.get('/:id', (req, res) => {
    const id = req.params.id;
    const dishes = readData();
    const dish = dishes.find(d => d.id == id);
    if (!dish) {
        return res.status(404).json({ msg: "Dish not found" });
    }
    res.status(200).json(dish);
});

module.exports = router;