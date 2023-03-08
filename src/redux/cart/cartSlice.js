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
    reset: (state) => initialState,
    increment: (state, { payload }) => {
      state.cart.map((item) => item.id === payload ? { ...item, quantity: item.quantity++ } : item);
    },
  },
});

export const { addProduct, increment, reset } = cartSlice.actions;

export default cartSlice.reducer;
