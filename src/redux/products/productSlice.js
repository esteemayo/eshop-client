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
    reset: (state) => {
      state.products = [];
      state.filteredProducts = [];
      state.minPrice = 0;
      state.maxPrice = 0;
      state.isFetching = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = null;
    },
    filterProducts: (state, { payload }) => {
      let tempProducts = [...state.products];

      tempProducts = tempProducts.filter((item) => item.price <= parseInt(payload.price));

      tempProducts = tempProducts.filter((item) =>
        Object.entries(payload.filters).every(([key, value]) =>
          item[key].includes(value)
        )
      );

      state.filteredProducts = tempProducts;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(fetchProducts.fulfilled, (state, { payload }) => {
        state.isFetching = false;
        state.isSuccess = true;

        const price = Math.max(...payload.map((item) => item.price));

        state.isFetching = false;
        state.isSuccess = true;
        state.products = payload;
        state.filteredProducts = payload;
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

export const { filterProducts, reset } = productSlice.actions;

export default productSlice.reducer;
