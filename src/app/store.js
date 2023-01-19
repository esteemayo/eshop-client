import { configureStore } from '@reduxjs/toolkit';

import userReducer from 'redux/user';
import cartReducer from 'redux/cart';
import productReducer from 'redux/products';

const store = configureStore({
  reducer: {
    products: productReducer,
    user: userReducer,
    cart: cartReducer,
  },
});

export default store;
