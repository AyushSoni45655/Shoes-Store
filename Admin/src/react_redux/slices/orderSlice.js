import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const backendUrl = import.meta.env.VITE_BACKEND_URL;


// get all orders
export const getAOrders = createAsyncThunk(
  'order/get',
  async(_,{rejectWithValue})=>{
    try{
      
      const token = localStorage.getItem('token')
      const response = await axios.get(`${backendUrl}/api/order/admin`,{headers:{
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

// delete order
export const deleteAOrders = createAsyncThunk(
  'order/delete',
  async(id,{rejectWithValue})=>{
    try{
      
      const token = localStorage.getItem('token')
      const response = await axios.delete(`${backendUrl}/api/order/${id}`,{headers:{
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

// status changer api
// delete order
export const statusChanger = createAsyncThunk(
  'order/statusChange',
  async(data,{rejectWithValue})=>{
    try{
      
      const token = localStorage.getItem('token')
      const response = await axios.post(`${backendUrl}/api/order/status`,data,{headers:{
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
    oError:"",
    oSuccessMsg:"",
    oLoading:false,
    oLength:0,
    orderData:[]
  },
  reducers:{
    clearOrderMsg:(state)=>{
      state.oError = "";
      state.oSuccessMsg = "";
    }
  },
  extraReducers:(builder)=>{
    builder
    .addCase(getAOrders.pending,(state)=>{
      state.oLoading = true;
      state.oError = "";
      state.oSuccessMsg = "";
    })
    .addCase(getAOrders.fulfilled,(state,actions)=>{
      state.oLoading = false;
      state.oSuccessMsg = actions.payload.msg;
      state.oLength = actions.payload.orderLength;
      state.orderData = actions.payload.orders
    })
    .addCase(getAOrders.rejected,(state,actions)=>{
      state.oLoading = false;
      state.oSuccessMsg = "";
      state.oError = actions.payload;
    })
    .addCase(deleteAOrders.pending,(state)=>{
      state.oLoading = true;
      state.oError = "";
      state.oSuccessMsg = "";
    })
    .addCase(deleteAOrders.fulfilled,(state,actions)=>{
      state.oLoading = false;
      state.oSuccessMsg = actions.payload.msg;
    })
    .addCase(deleteAOrders.rejected,(state,actions)=>{
      state.oLoading = false;
      state.oSuccessMsg = "";
      state.oError = actions.payload;
    })
    .addCase(statusChanger.pending,(state)=>{
      state.oLoading = true;
      state.oError = "";
      state.oSuccessMsg = "";
    })
    .addCase(statusChanger.fulfilled,(state,actions)=>{
      state.oLoading = false;
      state.oSuccessMsg = actions.payload.msg;
    })
    .addCase(statusChanger.rejected,(state,actions)=>{
      state.oLoading = false;
      state.oSuccessMsg = "";
      state.oError = actions.payload;
    })
   
  }
})
export default OrderSlice.reducer;
export const {clearOrderMsg} = OrderSlice.actions;