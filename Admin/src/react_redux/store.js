import { configureStore } from "@reduxjs/toolkit";
import UserSlice from './slices/userSlice.js'
import ProductSlice from "./slices/productSLice.js";
import OrderSlice from './slices/orderSlice.js'
 const store = configureStore({
  reducer:{
    user:UserSlice,
    product:ProductSlice,
    order:OrderSlice
  }
});
export default store;