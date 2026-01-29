import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const backend_url = import.meta.env.VITE_BACKEND_URL;
export const addCart = createAsyncThunk(
  "cart/add",
  async(data,{rejectWithValue})=>{
    try{
      const token = localStorage.getItem('token');
      const response = await axios.post(`${backend_url}/api/product/cart`,data,{headers:{Authorization:`Bearer ${token}`}});
      if(!response.data.success){
        return rejectWithValue(response.data.msg || "Something went wrong");
      }
      return response.data;
    }catch(e){
      return rejectWithValue(
        e.response?.data?.msg || "Server Error"
      );
    }
  }
);
export const getCart = createAsyncThunk(
  "cart/get",
  async(_,{rejectWithValue})=>{
    try{
      const token = localStorage.getItem('token');
      const response = await axios.get(`${backend_url}/api/product/cart`,{headers:{Authorization:`Bearer ${token}`}});
      if(!response.data.success){
        return rejectWithValue(response.data.msg || "Something went wrong");
      }
      return response.data;
    }catch(e){
      return rejectWithValue(
        e.response?.data?.msg || "Server Error"
      );
    }
  }
);
export const removeCart = createAsyncThunk(
  "cart/remove",
  async(cardId,{rejectWithValue})=>{
    try{
      const token = localStorage.getItem('token');
      const response = await axios.delete(`${backend_url}/api/product/cart/${cardId}`,{headers:{Authorization:`Bearer ${token}`}});
      if(!response.data.success){
        return rejectWithValue(response.data.msg || "Something went wrong");
      }
      
      return response.data;
    }catch(e){
      return rejectWithValue(
        e.response?.data?.msg || "Server Error"
      );
    }
  }
);
const CartSlice = createSlice({
  name:"cart",
  initialState:{

    loading:false,
    error:"",
    successMsg:"",
    cartData:[],
    cartLengths:0
  },
  reducers:{
    clearCartMsg:(state)=>{
      state.error = "";
      state.successMsg = "";
    },
   
  },
  extraReducers:(builder)=>{
    builder.addCase(addCart.pending,(state)=>{
      state.loading = true;
      state.error = "";
      state.successMsg = "";
    })
    .addCase(addCart.fulfilled,(state,action)=>{
      state.loading = false;
      state.successMsg = action.payload.msg;
    })
    .addCase(addCart.rejected,(state,action)=>{
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(getCart.pending,(state)=>{
      state.loading = true;
      state.error = "";
      state.successMsg = "";
    })
    .addCase(getCart.fulfilled,(state,action)=>{
      state.loading = false;
      state.successMsg = action.payload.msg;
      state.cartData = action.payload.carts || [],
      state.cartLengths = action.payload.cartLength
    })
    .addCase(getCart.rejected,(state,action)=>{
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(removeCart.pending,(state)=>{
      state.loading = true;
      state.error = "";
      state.successMsg = "";
    })
    .addCase(removeCart.fulfilled,(state,action)=>{
      state.loading = false;
      state.successMsg = action.payload.msg;
    })
    .addCase(removeCart.rejected,(state,action)=>{
      state.loading = false;
      state.error = action.payload;
    })
  }
});
export const {clearCartMsg} =CartSlice.actions;
export default CartSlice.reducer;