const express = require('express');
const { getNotes, createNote, updateNote, deleteNote } = require('../controllers/notesController');
const middlewareAuth = require('../middleware/authMiddleware');

const router = express.Router();

router.use(middlewareAuth);

router.get('/', getNotes);

router.post('/', createNote);

router.put('/:id', updateNote);

router.delete('/:id', deleteNote);

module.exports = router;