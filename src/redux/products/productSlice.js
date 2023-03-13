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
  filteredProducts: [],
  price: 0,
  minPrice: 0,
  maxPrice: 0,
  isFetching: false,
  isError: false,
  isSuccess: false,
  message: null,
};

export const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(fetchProducts.fulfilled, (state, { payload }) => {
        console.log(payload)
        state.isFetching = false;
        state.isSuccess = true;
        state.products = payload;
        state.filteredProducts = payload;
        const price = Math.max(...payload.map((item) => item.price));
        state.price = price;
        state.maxPrice = price;
      })
      .addCase(fetchProducts.rejected, (state, { payload }) => {
        state.isFetching = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = payload.message;
      })
  },
});

export default productSlice.reducer;
