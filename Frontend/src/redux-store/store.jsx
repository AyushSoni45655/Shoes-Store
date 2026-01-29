import { configureStore } from "@reduxjs/toolkit";
import userReducer from './slices/userSlice'
import productSlice from './slices/productSlice'
import CartSlice from "./slices/cartSlice";
import WishListSlice from './slices/wishlistSlice';
import OrderSlice from './slices/orderSlice'
const store = configureStore({
  reducer:{
    user:userReducer,
    product:productSlice,
    cart:CartSlice,
    wishlist:WishListSlice,
    order:OrderSlice
  }
});
export default store;