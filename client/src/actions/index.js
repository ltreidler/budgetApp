import axios from 'axios';
import { FETCH_USER, FETCH_MONEY } from './types';

export const fetchUser = () => async (dispatch) => {
    const res = await axios.get('/api/current_user');
    dispatch({ type: FETCH_USER, payload: res.data});
};

export const setupUser = (values, history) => async (dispatch) => {
    console.log('setting up user');
    const res = await axios.post('/api/setupUser', values);
    //adjust this so that it 1) sends the data 2) X the backend sends that to Mongo (both to update the user and the finances) 3) sends back the user 4) send that to the userReducer by dispatching FETCH_USER
    dispatch({ type: FETCH_USER, payload: res.data.user});
    dispatch({type: FETCH_MONEY, payload: res.data.money});
    history.push('/budget');
}

export const fetchMoney = () => async (dispatch) => {
    const res = await axios.get('/api/money');
    dispatch({type: FETCH_MONEY, payload:res.data});
}

export const postItem = (values, history) => async (dispatch) => {
    const res = await axios.post('/api/newItem', values);
    history.push('/dash');
    dispatch({type: FETCH_MONEY, payload: res.data});
}

export const editCategory = (newValue) => async (dispatch) => {
    const res = await axios.post('/api/editCategory', newValue);
    dispatch({type: FETCH_MONEY, payload: res.data});
}

export const createCategory = (newCategory) => async (dispatch) => {
    const res = await axios.post('/api/createCategory', newCategory);
    dispatch({type: FETCH_MONEY, payload: res.data});
}