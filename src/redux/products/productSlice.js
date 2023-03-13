import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getProducts } from 'services/productService';

export const fetchProducts = createAsyncThunk(
  'products/getProducts',
  async (category, { rejectWithValue }) => {
    try {
      const { data } = await getProducts(category)
      return data.products;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const initialState = {
  products: [],
  isFetching: false,
  isError: false,
  isSuccess: false,
  message: null,
};

export const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    fetchProducts: (state, { payload }) => { },
  },
});

export default productSlice.reducer;
