const todoModel = require("../models/todoModel");

const addTodo = async (req, res) => {
    await todoModel.create(req.body);
    res.status(201).json({
        message: "Todo created successfully"
    });
}

const allTodos = async (req, res) => {
    let todos = await todoModel.find();
    res.status(200).json({
        message: "All todos fetched successfully",
        todos: todos
    });
}

const updateTodo = async (req, res) => {
    let { id } = req.params;
    await todoModel.findByIdAndUpdate(id, req.body);
    res.status(201).json({
        message: "Todo updated successfully",
    });
}

const deleteTodo = async (req, res) => {
    let { id } = req.params;
    await todoModel.findByIdAndDelete(id);
    res.status(201).json({
        message: "Todo deleted successfully",
    });
}

module.exports = { addTodo, allTodos, updateTodo, deleteTodo };