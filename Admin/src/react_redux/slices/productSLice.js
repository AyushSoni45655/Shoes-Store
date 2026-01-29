import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const backned_Url = import.meta.env.VITE_BACKEND_URL;
export const getProduct = createAsyncThunk(
  'product/get',
  async(_,{rejectWithValue})=>{
    const token = localStorage.getItem('token');
    try{
      const response = await axios.get(`${backned_Url}/api/product/list`);
      if(!response.data.success){
        return rejectWithValue(response.data.msg || 'something going wrong!!!')
      }
      return response.data;
    }catch(e){
      return rejectWithValue(e.response?.data?.msg || 'server error')
    }
  }
)

export const deleteProduct = createAsyncThunk(
  'product/delete',
  async(data,{rejectWithValue})=>{
    const token = localStorage.getItem('token');
    try{
      const response = await axios.post(`${backned_Url}/api/product/delete`,data,{headers:{Authorization:`Bearer ${token}`}});
      if(!response.data.success){
        return rejectWithValue(response.data.msg || 'something going wrong!!!')
      }
      return response.data;
    }catch(e){
      return rejectWithValue(e.response?.data?.msg || 'server error')
    }
  }
)

export const editProduct = createAsyncThunk(
  'product/edit',
  async(data,{rejectWithValue})=>{
   
    const token = localStorage.getItem('token');
    try{
      console.log('all data slice',data);
      
      const response = await axios.post(`${backned_Url}/api/product/edit`,data,{headers:{Authorization:`Bearer ${token}`}});
      if(!response.data.success){
        return rejectWithValue(response.data.msg || 'something going wrong!!!')
      }
     
      
      return response.data;
    }catch(e){
      return rejectWithValue(e.response?.data?.msg || 'server error')
    }
  }
)
export const addProduct = createAsyncThunk(
  'product/add',
  async(data,{rejectWithValue})=>{
    const token = localStorage.getItem('token');
    try{
      const response = await axios.post(`${backned_Url}/api/product/add`,data,{headers:{Authorization: `Bearer ${token}`}});
      if(!response.data.success){
        return rejectWithValue(response.data.msg || 'something going wrong!!!')
      }
      return response.data;
    }catch(e){
      return rejectWithValue(e.response?.data?.msg || 'server error')
    }
  }
)
const ProductSlice = createSlice({
  name:"product",
  initialState:{
    loading:false,
    error:"",
    successMsg:"",
    data:[]
  },
  reducers:{
    clearProductMessages:(state)=>{
      state.error = "",
      state.successMsg = ""
    }
  },
  extraReducers:(builder)=>{
    builder.addCase(addProduct.pending,(state)=>{
      state.loading = true;
      state.error = "",
      state.successMsg = ""
    })
    .addCase(addProduct.fulfilled,(state,action)=>{
      state.loading = false;
      state.successMsg = action.payload.msg;
      state.error = "";
    })
    .addCase(addProduct.rejected,(state,action)=>{
      state.loading = false;
      state.successMsg = "",
      state.error = action.payload;
    })
    .addCase(getProduct.pending,(state)=>{
      state.loading = true;
      state.error = "",
      state.successMsg = ""
    })
    .addCase(getProduct.fulfilled,(state,action)=>{
      state.loading = false;
      state.successMsg = action.payload.msg;
      state.data = action.payload.products
    })
    .addCase(getProduct.rejected,(state,action)=>{
      state.loading = false;
      state.successMsg = "",
      state.error = action.payload;
    })
      .addCase(editProduct.pending,(state)=>{
      state.loading = true;
      state.error = "",
      state.successMsg = ""
    })
    .addCase(editProduct.fulfilled,(state,action)=>{
      state.loading = false;
      state.successMsg = action.payload.msg;
       state.data = state.data.map((item) =>
          item._id === action.payload.product._id
            ? action.payload.product
            : item
        );
    })
    .addCase(editProduct.rejected,(state,action)=>{
      state.loading = false;
      
      state.error = action.payload;
    })

    .addCase(deleteProduct.pending,(state)=>{
      state.loading = true;
      state.error = "",
      state.successMsg = ""
    })
    .addCase(deleteProduct.fulfilled,(state,action)=>{
      state.loading = false;
      state.successMsg = action.payload.msg;
    })
    .addCase(deleteProduct.rejected,(state,action)=>{
      state.loading = false;
      state.error = action.payload;
    })
  }

});

export const {clearProductMessages} = ProductSlice.actions;
export default ProductSlice.reducer;