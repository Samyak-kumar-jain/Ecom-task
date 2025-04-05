import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState={
    cartItems : [],
    isLoading:false,

}
// Async Thunks
export const addToCart = createAsyncThunk(
    "cart/addToCart",
    async ({ userId, productId, quantity }) => {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/shop/cart/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          productId,
          quantity,
        }),
      });
  
      const data = await response.json();
      console.log(data)
      return data;
    }
  );
  
  export const fetchCartItems = createAsyncThunk(
    "cart/fetchCartItems",
    async (userId) => {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/shop/cart/get/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      const data = await response.json();
      
      return data;
    }
  );
  
  export const deleteCartItem = createAsyncThunk(
    "cart/deleteCartItem",
    async ({ userId, productId }) => {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/shop/cart/${userId}/${productId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      const data = await response.json();
      return data;
    }
  );
  
  export const updateCartQuantity = createAsyncThunk(
    "cart/updateCartQuantity",
    async ({ userId, productId, quantity }) => {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/shop/cart/update-cart`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          productId,
          quantity,
        }),
      });
  
      const data = await response.json();
      return data;
    }
  );
  
  // Slice
  const shoppingCartSlice = createSlice({
    name: "shoppingCart",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(addToCart.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(addToCart.fulfilled, (state, action) => {
          state.isLoading = false;
          state.cartItems = action.payload.data;
        })
        .addCase(addToCart.rejected, (state) => {
          state.isLoading = false;
          state.cartItems = [];
        })
        .addCase(fetchCartItems.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(fetchCartItems.fulfilled, (state, action) => {
          state.isLoading = false;
          state.cartItems = action.payload.data;
        })
        .addCase(fetchCartItems.rejected, (state) => {
          state.isLoading = false;
          state.cartItems = [];
        })
        .addCase(updateCartQuantity.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(updateCartQuantity.fulfilled, (state, action) => {
          state.isLoading = false;
          state.cartItems = action.payload.data;
        })
        .addCase(updateCartQuantity.rejected, (state) => {
          state.isLoading = false;
          state.cartItems = [];
        })
        .addCase(deleteCartItem.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(deleteCartItem.fulfilled, (state, action) => {
          state.isLoading = false;
          state.cartItems = action.payload.data;
        })
        .addCase(deleteCartItem.rejected, (state) => {
          state.isLoading = false;
          state.cartItems = [];
        });
    },
  });
  
  export default shoppingCartSlice.reducer;
  