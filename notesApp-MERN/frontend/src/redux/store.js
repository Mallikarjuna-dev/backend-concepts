import { legacy_createStore, applyMiddleware, combineReducers } from 'redux';
import { thunk } from 'redux-thunk';
import authReducer from './reducers/authReducer';
import notesReducer from './reducers/noteReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    notes: notesReducer
});

const store = legacy_createStore(rootReducer, applyMiddleware(thunk));

export default store;