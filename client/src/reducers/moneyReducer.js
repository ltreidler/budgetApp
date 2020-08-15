import { FETCH_MONEY } from '../actions/types';

export default function(state = null, action) {
    switch(action.type) {
        case FETCH_MONEY:
            return action.payload || false;
        default:
            return state;
    }
}