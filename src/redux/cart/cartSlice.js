import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cart: [],
  quantity: 0,
  total: 0,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProduct: (state, { payload }) => {
      state.quantity++;
      state.cart.push(payload);
      state.total += payload.price * payload.quantity;
    },
    increment: (state, { payload }) => {
      const index = state.cart.findIndex((item) => item._id === payload);
      state.cart[index].quantity++;
    },
    reset: (state) => initialState,
  },
});

export const { addProduct, reset } = cartSlice.actions;

export default cartSlice.reducer;
