import { combineReducers } from 'redux';

const initialState = {
    loading: true,
    cartItems: []
};

const cartItemsReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SHOW_LOADING':
            return {
                ...state,
                loading: true
            }
        case 'HIDE_LOADING':
            return {
                ...state,
                loading: false
            }
        case 'UpdateCart':
            return {
                ...state,
                cartItems: [...state.cartItems, action.payload]
            };

        case 'Update':
            return {
                ...state,
                cartItems: state.cartItems.map(item =>
                    item._id === action.payload._id ? { ...item, quantity: action.payload.quantity } : item
                ),
            };
        case 'DELETE_FROM_CART':
            return {
                ...state,
                cartItems: state.cartItems.filter(
                    item => item._id !== action.payload._id
                )
            }
        default:
            return state;
    }
};

const rootReducer = combineReducers({
    cart: cartItemsReducer,
});

export default rootReducer;
