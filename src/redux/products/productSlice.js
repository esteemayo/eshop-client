import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [],
};

export const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    fetchProducts: (state, { payload }) => { },
  },
});

export const { fetchProducts } = productSlice.actions;

export default productSlice.reducer;
