import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/Authslice/authslice.js'
import shopProductReducer from "../features/Shopslice/Shopslice.js"
import shoppingCartReducer from "../features/CartSlice/Cartslice.js"
import AddressReducer from "../features/Shopslice/Addressslice.js"


const store =  configureStore({
  reducer: {
    authen : authReducer,
   
  
    shopProducts :  shopProductReducer,
    shoppingCart: shoppingCartReducer,
    address:AddressReducer,
   
  }
})

export default store;

