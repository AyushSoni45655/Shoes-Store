import { createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
const backend_url = import.meta.env.VITE_BACKEND_URL;
export const toggleWishlist = createAsyncThunk(
  'wishlist/toggle',
  async(data,{rejectWithValue})=>{
    try{
      const token = localStorage.getItem('token');
      const response = await axios.post(`${backend_url}/api/wishlist`,data,{headers:{
        Authorization:`Bearer ${token}`
      }});
      if(!response.data.success){
        return rejectWithValue(response.data.msg || "Something went wrong");
      }
      console.log('My Data',response.data);
      
      return response.data;

    }catch(e){
      return rejectWithValue(
        e.response?.data?.msg || "Server Error"
      );
    }
  }
);
export const getWishlists = createAsyncThunk(
  'wishlist/get',
  async(_,{rejectWithValue})=>{
    try{
      const token = localStorage.getItem('token');
      const response = await axios.get(`${backend_url}/api/wishlist`,{headers:{
        Authorization:`Bearer ${token}`
      }});
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
export const removeWishlist = createAsyncThunk(
  'wishlist/remove',
  async(id,{rejectWithValue})=>{
    try{
      const token = localStorage.getItem('token');
      const response = await axios.delete(`${backend_url}/api/wishlist/${id}`,{headers:{
        Authorization:`Bearer ${token}`
      }});
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
const WishListSlice = createSlice({
  name:"wishlist",
  initialState:{
    loading:false,
    error:"",
    successMsg:"",
    wishListData:[],
    wishlistLength:0
  },
  reducers:{
    clearWishListMsg:(state)=>{
      state.error = "";
      state.successMsg = "";
    }
  },
  extraReducers:(builder)=>{
    builder.addCase(toggleWishlist.pending, (state)=>{
      state.loading = true;
      state.successMsg = "",
      state.error = ""
    })
    .addCase(toggleWishlist.fulfilled, (state,action)=>{
      state.loading = false;
      state.successMsg = action.payload.msg
    })
    .addCase(toggleWishlist.rejected, (state,action)=>{
      state.loading = false;
      state.successMsg = "",
      console.log('My reject',action.payload);
      state.error = action.payload
    })
    .addCase(getWishlists.pending, (state)=>{
      state.loading = true;
      state.successMsg = "",
      state.error = ""
    })
    .addCase(getWishlists.fulfilled, (state,action)=>{
      state.loading = false;
      state.successMsg = action.payload.msg;
      state.wishListData = action.payload.wishlist;
      state.wishlistLength = action.payload.wishlistLength;
    })
    .addCase(getWishlists.rejected, (state,action)=>{
      state.loading = false;
      state.successMsg = "",
      state.error = action.payload
    })
    .addCase(removeWishlist.pending, (state)=>{
      state.loading = true;
      state.successMsg = "",
      state.error = ""
    })
    .addCase(removeWishlist.fulfilled, (state,action)=>{
      state.loading = false;
      state.successMsg = action.payload.msg;
    })
    .addCase(removeWishlist.rejected, (state,action)=>{
      state.loading = false;
      state.successMsg = "",
      state.error = action.payload
    })
  }
});
export const {clearWishListMsg} = WishListSlice.actions;
export default WishListSlice.reducer;