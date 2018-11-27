import { createStore, applyMiddleware, combineReducers  } from 'redux';
import thunk from 'redux-thunk';

import loadingReducer from './reducers/loadingReducer';
import loginReducer from './reducers/loginReducer'

const rootReducer = combineReducers({
	loadingReducer,
	loginReducer
});

const store = createStore(
	rootReducer,
	applyMiddleware(thunk)
);

export default store