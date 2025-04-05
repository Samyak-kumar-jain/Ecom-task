import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  productList: [],
  productDetails: null, // New state for product details
  error: null, // Error handling state
};

// Thunks
export const fetchAllFilteredProducts = createAsyncThunk(
  "shopProducts/fetchAllFilteredProducts", // Updated action type
  async ({ filterCat, filterBrand, sortParams }) => {
    const query = new URLSearchParams({
      ...filterCat,
      ...filterBrand,
      sortBy: sortParams,
    });

    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/shop/products/get?${query}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }

    const result = await response.json();
    return result;
  }
);

export const fetchProductDetails = createAsyncThunk(
  "shopProducts/fetchProductDetails", // Updated action type
  async (id) => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/shop/products/get/${id}`);

    if (!response.ok) {
      throw new Error("Failed to fetch product details");
    }

    const result = await response.json();
    return result;
  }
);

const ShopProductSlice = createSlice({
  name: "shopProducts",
  initialState,
  reducers: {
    setProductDetails: (state) => {
      state.productDetails = null; // Reset product details
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllFilteredProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null; // Clear previous errors
      })
      .addCase(fetchAllFilteredProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productList = action.payload.data;
      })
      .addCase(fetchAllFilteredProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.productList = [];
        state.error = action.error.message; // Capture the error message
      })
      .addCase(fetchProductDetails.pending, (state) => {
        state.isLoading = true;
        state.error = null; // Clear previous errors
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productDetails = action.payload.data; // Store product details separately
      })
      .addCase(fetchProductDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message; 
        state.productDetails = null;// Capture the error message
      });
  },
});

export const { setProductDetails } = ShopProductSlice.actions; // Export the action
export default ShopProductSlice.reducer;
