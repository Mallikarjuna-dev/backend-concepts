import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const getAuthHeaders = (token) => ({ headers: { Authorization: `Bearer ${token}` } });

export const fetchNotes = () => async (dispatch, getState) => {
    const { token } = getState().auth;
    console.log(token)
    if (!token) {
        console.error('No token found!');
        return;
    }
    try {
        const res = await axios.get(`${BASE_URL}/api/notes`, getAuthHeaders(token));
        dispatch({ type: 'SET_NOTES', payload: res.data });
    } catch (err) {
        console.error('Error fetching notes:', err.response?.data || err.message);
        alert('Session expired or unauthorized. Please login again.');
    }
};

export const createNote = (noteData) => async (dispatch, getState) => {
    const { token } = getState().auth;
    try {
        const res = await axios.post(`${BASE_URL}/api/notes`, noteData, getAuthHeaders(token));
        dispatch({ type: 'CREATE_NOTE', payload: res.data });
    } catch (error) {
        alert(error.response.data.message || 'Failed to create note');
    }
};

export const updateNote = (id, noteData) => async (dispatch, getState) => {
    const { token } = getState().auth;
    try {
        const res = await axios.put(`${BASE_URL}/api/notes/${id}`, noteData, getAuthHeaders(token));
        dispatch({ type: 'UPDATE_NOTE', payload: res.data });
    } catch (error) {
        alert(error.response.data.message || 'Failed to update note');
    }
};

export const deleteNote = (id) => async (dispatch, getState) => {
    const { token } = getState().auth;
    try {
        await axios.delete(`${BASE_URL}/api/notes/${id}`, getAuthHeaders(token));
        dispatch({ type: 'DELETE_NOTE', payload: id });
    } catch (error) {
        alert(error.response.data.message || 'Failed to delete note');
    }
};
