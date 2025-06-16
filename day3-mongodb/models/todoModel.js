const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
    title: String,
    description: String,
    status: Boolean,
    noLikes: Number
});

module.exports = mongoose.model('Todo', todoSchema);