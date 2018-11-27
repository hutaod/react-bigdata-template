
import {
	TOGGLE_LOADING
} from './../actionTypes';

const defaultState = {
	loadingstatus: false
}

export default (state = defaultState, action) => {
    switch(action.type) {
        case TOGGLE_LOADING:
            return {
                loadingstatus: action.bool
            }
        default:
            return state
    }
}