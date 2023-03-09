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
    clearCart: (state) => {
      state.cart = [];
    },
    increment: (state, { payload }) => {
      state.cart = state.cart.map((item) =>
        item._id === payload ? ({ ...item, quantity: item.quantity + 1 }) : item
      );
    },
    decrement: (state, { payload }) => {
      state.cart = state.cart
        .map((item) =>
          item._id === payload ? ({ ...item, quantity: item.quantity - 1 }) : item
        )
        .filter((item) => item.quantity !== 0);
    },
    remove: (state, { payload }) => {
      state.cart.splice(
        state.cart.findIndex((item) => item._id === payload),
        1,
      );
    },
    getTotals: (state) => {
      let { total, quantity } = state.cart.reduce((cartTotal, cartItem) => {
        const { price, quantity } = cartItem;
        cartTotal.total += price * quantity;
        cartTotal.quantity += quantity;
        return cartTotal;
      },
        { total: 0, quantity: 0 }
      );

      total = parseFloat(total.toFixed(2));

      state.total = total;
      state.quantity = quantity;
    },
    toggleQuantity: (state, { payload }) => {
      let tempCart = state.cart.map((item) => {
        if (item._id === payload.id) {
          if (payload.type === 'inc') {
            return { ...item, quantity: item.quantity + 1 };
          }
          if (payload.type === 'dec') {
            return { ...item, quantity: item.quantity - 1 };
          }
        }
        return item;
      });

      tempCart = tempCart.filter((item) => item.quantity !== 0);
      state.cart = tempCart;
    },
  },
});

export const {
  addProduct,
  decrement,
  getTotals,
  increment,
  remove,
  reset,
  toggleQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;
