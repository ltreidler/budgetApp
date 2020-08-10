import { combineReducers } from 'redux';
import userReducer from './userReducer';
import { reducer as reduxForm } from 'redux-form';

export default combineReducers({
    user: userReducer,
    form: reduxForm
});