import { configureStore } from '@reduxjs/toolkit';

import userReducer from 'redux/user/userSlice';
import cartReducer from 'redux/cart/cartSlice';
import productReducer from 'redux/products/productSlice';

const store = configureStore({
  reducer: {
    products: productReducer,
    user: userReducer,
    cart: cartReducer,
  },
});

export default store;
