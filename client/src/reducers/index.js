import { combineReducers } from 'redux';
import userReducer from './userReducer';
import moneyReducer from './moneyReducer';
import { reducer as formReducer } from 'redux-form';

export default combineReducers({
    user: userReducer,
    form: formReducer,
    money: moneyReducer
});