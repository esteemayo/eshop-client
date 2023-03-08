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
    reset: (state) => initialState,
    addProduct: (state, { payload }) => {
      state.quantity++;
      state.cart.push(payload);
      state.total += payload.price * payload.quantity;
    },
    increment: (state, { payload }) => {
      state.cart = state.cart.map((item) =>
        item._id === payload ? { ...item, quantity: item.quantity + 1 } : item
      );
    },
    decrement: (state, { payload }) => {
      state.cart = state.cart.map((item) =>
        item._id === payload ? { ...item, quantity: item.quantity - 1 } : item
      );
    },
    getTotals: (state) => {
      let { total } = state.cart.reduce((cartTotal, cartItem) => {
        const { price, quantity } = cartItem;
        cartTotal.total += price * quantity;
        return cartTotal;
      }, { total: 0 });

      total = parseFloat(total.toFixed(2));

      state.total = total;
    },
  },
});

export const { addProduct, decrement, getTotals, increment, reset } = cartSlice.actions;

export default cartSlice.reducer;
