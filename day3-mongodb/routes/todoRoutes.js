const express = require('express');
const todoModel = require('../models/todoModel');
const { addTodo, allTodos, updateTodo, deleteTodo } = require('../controllers/todoController');

const router = express.Router();

router.post('/add-todo', addTodo);

router.get('/alltodos', allTodos);

router.patch('/update-todo/:id', updateTodo);

router.delete('/delete-todo/:id', deleteTodo);

module.exports = router;