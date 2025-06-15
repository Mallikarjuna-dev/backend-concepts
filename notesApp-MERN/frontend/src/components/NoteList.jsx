import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteNote } from '../redux/actions/noteActions';

export default function NoteList({ setEditingNote }) {
    const notes = useSelector((state) => state.notes);
    const dispatch = useDispatch();

    return (
        <div>
            {notes.map((note) => (
                <div key={note._id} style={{ border: '1px solid #ccc', paddingBottom:"5px" }}>
                    <h4>{note.title}</h4>
                    <p>{note.content}</p>
                    <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                        <button onClick={() => setEditingNote(note)}>Edit</button>
                        <button onClick={() => dispatch(deleteNote(note._id))}>Delete</button>
                    </div>

                </div>
            ))}
        </div>
    );
}