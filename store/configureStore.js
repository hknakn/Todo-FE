import { createStore, combineReducers } from 'redux';
import userReducer from '../redux/reducers/userRedcure';

const rootReducer = combineReducers(
    { user: userReducer }
);

const configureStore = () => createStore(rootReducer);

export default configureStore;