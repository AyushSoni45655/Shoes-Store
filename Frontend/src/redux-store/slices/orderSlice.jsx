import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

// create order

export const createOrder = createAsyncThunk(
  'order/create',
  async(data,{rejectWithValue})=>{
    try{
      
      const token = localStorage.getItem('token')
      const response = await axios.post(`${backendUrl}/api/order/create`,data,{headers:{
        Authorization:`Bearer ${token}`
      }});
      if(!response.data.success){
         return rejectWithValue(response.data.msg || "Something went wrong");
      }
      return response.data;
    }catch(e){
      return rejectWithValue(e.response?.data?.msg || 'Server Error')
    }
  }
);


// CANCEL ORDER
export const cancelOrder = createAsyncThunk(
  'order/cancel',
  async(data,{rejectWithValue})=>{
    try{
      
      const token = localStorage.getItem('token')
      const response = await axios.post(`${backendUrl}/api/order/cancel`,data,{headers:{
        Authorization:`Bearer ${token}`
      }});
      if(!response.data.success){
         return rejectWithValue(response.data.msg || "Something went wrong");
      }
      return response.data;
    }catch(e){
      return rejectWithValue(e.response?.data?.msg || 'Server Error')
    }
  }
);


//verify order


export const verifyOrders = createAsyncThunk(
  'order/verify',
  async(data,{rejectWithValue})=>{
    try{
      
      const token = localStorage.getItem('token')
      const response = await axios.post(`${backendUrl}/api/order/verify`,data,{headers:{
        Authorization:`Bearer ${token}`
      }});
      if(!response.data.success){
         return rejectWithValue(response.data.msg || "Something went wrong");
      }
      return response.data;
    }catch(e){
      return rejectWithValue(e.response?.data?.msg || 'Server Error')
    }
  }
);

// get all orders
export const getOrders = createAsyncThunk(
  'order/get',
  async(_,{rejectWithValue})=>{
    try{
      
      const token = localStorage.getItem('token')
      const response = await axios.get(`${backendUrl}/api/order`,{headers:{
        Authorization:`Bearer ${token}`
      }});
      if(!response.data.success){
         return rejectWithValue(response.data.msg || "Something went wrong");
      }
      return response.data;
    }catch(e){
      return rejectWithValue(e.response?.data?.msg || 'Server Error')
    }
  }
);
const OrderSlice = createSlice({
  name:"order",
  initialState:{
    error:"",
    successMsg:"",
    loading:false,
    orderData:[]
  },
  reducers:{
    clearOrderMsg:(state)=>{
      state.error = "";
      state.successMsg = "";
    }
  },
  extraReducers:(builder)=>{
    builder.addCase(createOrder.pending,(state)=>{
      state.loading = true;
      state.error = "";
      state.successMsg = "";
    })
    .addCase(createOrder.fulfilled,(state,actions)=>{
      state.loading = false;
      state.successMsg = actions.payload.msg;
    })
    .addCase(createOrder.rejected,(state,actions)=>{
      state.loading = false;
      state.successMsg = "";
      state.error = actions.payload;
    })
    .addCase(getOrders.pending,(state)=>{
      state.loading = true;
      state.error = "";
      state.successMsg = "";
    })
    .addCase(getOrders.fulfilled,(state,actions)=>{
      state.loading = false;
      state.successMsg = actions.payload.msg;
      state.orderData = actions.payload.orders
    })
    .addCase(getOrders.rejected,(state,actions)=>{
      state.loading = false;
      state.successMsg = "";
      state.error = actions.payload;
    })
      .addCase(verifyOrders.pending,(state)=>{
      state.loading = true;
      state.error = "";
      state.successMsg = "";
    })
    .addCase(verifyOrders.fulfilled,(state,actions)=>{
      state.loading = false;
      state.successMsg = actions.payload.msg;
      
    })
    .addCase(verifyOrders.rejected,(state,actions)=>{
      state.loading = false;
      state.successMsg = "";
      state.error = actions.payload;
    })

      .addCase(cancelOrder.pending,(state)=>{
      state.loading = true;
      state.error = "";
      state.successMsg = "";
    })
    .addCase(cancelOrder.fulfilled,(state,actions)=>{
      state.loading = false;
      state.successMsg = actions.payload.msg;
      
    })
    .addCase(cancelOrder.rejected,(state,actions)=>{
      state.loading = false;
      state.successMsg = "";
      state.error = actions.payload;
    })
  }
})
export default OrderSlice.reducer;
export const {clearOrderMsg} = OrderSlice.actions;