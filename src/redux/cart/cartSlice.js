import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cart: [],
  quantity: 0,
  total: 0,
  tax: 0,
  subtotal: 0,
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
      let {
        total,
        quantity,
        subtotal,
        tax,
      } = state.cart.reduce((cartTotal, cartItem) => {
        const { price, quantity } = cartItem;
        const itemTotal = price * quantity;

        cartTotal.subtotal += itemTotal;
        cartTotal.quantity += quantity;
        cartTotal.tax = cartTotal.subtotal * 0.05;
        cartTotal.total = cartTotal.subtotal + cartTotal.tax;
        return cartTotal;
      },
        {
          total: 0,
          quantity: 0,
          subtotal: 0,
          tax: 0,
        }
      );

      tax = parseFloat(tax.toFixed(2));
      subtotal = parseFloat(subtotal.toFixed(2));
      total = parseFloat(total.toFixed(2));

      state.total = total;
      state.quantity = quantity;
      state.subtotal = subtotal;
      state.tax = tax;
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
  clearCart,
  decrement,
  getTotals,
  increment,
  remove,
  reset,
  toggleQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;
