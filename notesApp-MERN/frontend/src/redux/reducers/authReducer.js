const token = localStorage.getItem('token');

const initialState = {
    user: null,
    token: token || null,
};

export default function authReducer(state = initialState, action) {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
        case 'SIGNUP_SUCCESS':
            return {
                ...state,
                user: action.payload.user,
                token: action.payload.token,
            };
        case 'LOGOUT':
            return {
                ...state,
                user: null,
                token: null,
            };
        default:
            return state;
    }
}