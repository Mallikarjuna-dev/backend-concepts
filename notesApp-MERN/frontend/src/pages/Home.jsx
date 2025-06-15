import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchNotes } from '../redux/actions/noteActions';
import NoteForm from '../components/NoteForm';
import NoteList from '../components/NoteList';

export default function Home() {
    const dispatch = useDispatch();
    const [editingNote, setEditingNote] = useState(null);

    useEffect(() => {
        dispatch(fetchNotes());
    }, [dispatch]);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: "10px", textAlign: "center", width: '300px', marginTop: "30px", margin: 'auto' }}>
            <h2>Your Notes</h2>
            <NoteForm editingNote={editingNote} setEditingNote={setEditingNote} />
            <NoteList setEditingNote={setEditingNote} />
        </div>
    );
}