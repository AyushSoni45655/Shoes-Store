import { createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from 'axios';
const backend_Url = import.meta.env.VITE_BACKEND_URL;
export const login = createAsyncThunk(
  'login/admin',
  async(data,{rejectWithValue})=>{
    try{
      const response = await axios.post(`${backend_Url}/api/user/admin`,data);
      if(!response.data.success){
        return rejectWithValue(response.data.msg || 'failed to load data')
      }
      
      return response.data;
    }catch(error){
        return rejectWithValue(
    error?.response?.data?.msg || error.message || "Login Failed"
  );
       ;
    }
  }
);

// get all the users
export const getUsers = createAsyncThunk(
  'user/get',
  async(_,{rejectWithValue})=>{
    try{
      const token = localStorage.getItem('token');
      const response = await axios.get(`${backend_Url}/api/user/`,{headers:{Authorization:`Bearer ${token}`}});
      if(!response.data.success){
        return rejectWithValue(response.data.msg || 'failed to load data')
      }
      
      return response.data;
    }catch(error){
        return rejectWithValue(
    error?.response?.data?.msg || error.message || "Login Failed"
  );
       ;
    }
  }
);
const token  = localStorage.getItem("token") || ''
const UserSlice = createSlice({
  name:"user",
  initialState:{
    token:token,
    error:"",
    loader:false,
    successMsg:"",
    isSidebar:false,
    userLength:0,
    users:[]
  },
  reducers:{
    toggleSideBar:(state)=>{
      state.isSidebar = !state.isSidebar
    },
      clearMessage: (state) => {
    state.error = "";
    state.successMsg = "";
  }

  },
  extraReducers : (builder)=>{
    builder.addCase(login.pending,(state)=>{
      state.loader = true;
      state.error = "";
      state.successMsg = "";
    })
    .addCase(login.fulfilled, (state,action)=>{
      state.loader = false;
      state.error = "";
      state.successMsg = action.payload.msg;
      
      
      state.token = action.payload.token;
      localStorage.setItem('token', action.payload.token)
    })
    .addCase(login.rejected, (state,action)=>{
      state.loader = false;
      
      
      state.error = action.payload;
      state.successMsg = ""
    })
    .addCase(getUsers.pending,(state)=>{
      state.loader = true;
      state.error = "";
      state.successMsg = "";
    })
    .addCase(getUsers.fulfilled, (state,action)=>{
      state.loader = false;
      state.error = "";
      state.successMsg = action.payload.msg;
      state.userLength = action.payload.userLength;
      state.users = action.payload.users;
    })
    .addCase(getUsers.rejected, (state,action)=>{
      state.loader = false;
      state.error = action.payload;
      state.successMsg = ""
    })
  }
});

export const {toggleSideBar,clearMessage} = UserSlice.actions;
export default UserSlice.reducer;