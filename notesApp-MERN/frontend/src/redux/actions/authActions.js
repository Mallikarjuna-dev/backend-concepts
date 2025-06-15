import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const login = (credentials) => async (dispatch) => {
    try {
        const res = await axios.post(`${BASE_URL}/api/auth/login`, credentials);
        dispatch({
            type: 'LOGIN_SUCCESS',
            payload: res.data,
        });
        localStorage.setItem('token', res.data.token);
    } catch (error) {
        alert(error.response.data.message || 'Login failed');
    }
};

export const signup = (userData) => async (dispatch) => {
    try {
        const res = await axios.post(`${BASE_URL}/api/auth/signup`, userData);
        dispatch({
            type: 'SIGNUP_SUCCESS',
            payload: res.data,
        });
        localStorage.setItem('token', res.data.token);
        window.location.href = '/';
    } catch (error) {
        alert(error.response.data.message || 'Signup failed');
    }
};

export const logout = () => (dispatch) => {
    localStorage.removeItem('token');
    dispatch({ type: 'LOGOUT' });
    window.location.href = '/login';
}