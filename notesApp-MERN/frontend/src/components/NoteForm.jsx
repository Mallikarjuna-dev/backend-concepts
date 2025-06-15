import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createNote, updateNote } from '../redux/actions/noteActions';

export default function NoteForm({ editingNote, setEditingNote }) {
    const [note, setNote] = useState({ title: '', content: '' });
    const dispatch = useDispatch();

    useEffect(() => {
        if (editingNote) {
            setNote(editingNote);
        }
    }, [editingNote]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingNote) {
            dispatch(updateNote(editingNote._id, note));
            setEditingNote(null);
        } else {
            dispatch(createNote(note));
        }
        setNote({ title: '', content: '' });
    };

    return (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: "20px", width: '300px', marginTop: "50px", margin: 'auto' }}>
            <input
                type="text"
                placeholder="Title"
                value={note.title}
                onChange={(e) => setNote({ ...note, title: e.target.value })}
            />
            <textarea
                placeholder="Content"
                value={note.content}
                onChange={(e) => setNote({ ...note, content: e.target.value })}
            ></textarea>
            <button type="submit">{editingNote ? 'Update' : 'Add'} Note</button>
        </form>
    );
}