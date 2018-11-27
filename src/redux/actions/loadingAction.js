
import {
	TOGGLE_LOADING
} from './../actionTypes';

export const loadingAction = (bool) => ({
	type: TOGGLE_LOADING,
	bool
})
