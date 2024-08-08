import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import rootReducer from './rootReducer'; // Ensure the correct import
import { thunk } from 'redux-thunk'; // Correct import

const initialState = {
    cart: {
        cartItems: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []
    }
};

const middleware = [thunk];

// Enable Redux DevTools Extension if available
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware(...middleware))
);

export default store;
