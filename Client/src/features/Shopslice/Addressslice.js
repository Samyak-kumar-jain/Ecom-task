import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    isLoading:false,
    addressList:[]
}

export const addNewAddress = createAsyncThunk(
    "/addresses/addNewAddress",
    async (formData) => {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/shop/address/add`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
  
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
  
      const data = await response.json();
      return data;
    }
  );

 export const fetchAllAddresses = createAsyncThunk(
    "/addresses/fetchAllAddresses",
    async (userId) => {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/shop/address/get/${userId}`);
  
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
  
      const data = await response.json();
      return data;
    }
  );
  
 export const editaAddress = createAsyncThunk(
    "/addresses/editaAddress",
    async ({ userId, addressId, formData }) => {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/shop/address/update/${userId}/${addressId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
  
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
  
      const data = await response.json();
      return data;
    }
  );
  
export const deleteAddress = createAsyncThunk(
    "/addresses/deleteAddress",
    async ({ userId, addressId }) => {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/shop/address/delete/${userId}/${addressId}`,
        {
          method: "DELETE",
        }
      );
  
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
  
      const data = await response.json();
      return data;
    }
  );
  
  


const addressSlice = createSlice({
    name:"address",
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder
          .addCase(addNewAddress.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(addNewAddress.fulfilled, (state, action) => {
            state.isLoading = false;
          })
          .addCase(addNewAddress.rejected, (state) => {
            state.isLoading = false;
          })
          .addCase(fetchAllAddresses.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(fetchAllAddresses.fulfilled, (state, action) => {
            state.isLoading = false;
            state.addressList = action.payload.data;
          })
          .addCase(fetchAllAddresses.rejected, (state) => {
            state.isLoading = false;
            state.addressList = [];
          });
      },
})

export default addressSlice.reducer;
