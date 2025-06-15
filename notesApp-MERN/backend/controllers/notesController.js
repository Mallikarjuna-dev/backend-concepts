const Note = require("../models/Note");


const getNotes = async (req, res) => {
    const notes = await Note.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json(notes);
};

const createNote = async (req, res) => {
    const { title, content } = req.body;
    if (!title || !content) {
        return res.status(400).json({ message: 'Please fill all fields' });
    }
    try {
        const note = await Note.create({
            title,
            content,
            user: req.user._id
        });
        res.status(201).json(note);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

const updateNote = async (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;
    if (!title || !content) {
        return res.status(400).json({ message: 'Please fill all fields' });
    }
    try {
        const note = await Note.findByIdAndUpdate(id, { title, content }, { new: true });
        if (!note) {
            return res.status(404).json({ message: 'Note not found' });
        }
        res.status(200).json(note);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const deleteNote = async (req, res) => {
    const { id } = req.params;
    try {
        const note = await Note.findByIdAndDelete(id);
        if (!note) {
            return res.status(404).json({ message: 'Note not found' });
        }
        res.status(200).json({ message: 'Note deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = { getNotes, createNote, updateNote, deleteNote };