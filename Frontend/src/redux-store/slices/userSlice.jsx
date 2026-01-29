import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
const backend_url = import.meta.env.VITE_BACKEND_URL;

export const useSignIn = createAsyncThunk(
  "user/signIn",
  async(data,{rejectWithValue})=>{
    try{
      const response = await axios.post(`${backend_url}/api/user/signin`,data);
      if(!response.data.success){
        return rejectWithValue(response.data.msg || "Failed to load data")
      }
      console.log('here is a signin data',response.data);
      
      return response.data;
    }catch(e){
      return rejectWithValue(e.response?.data?.msg || "Failed");
      
    }
  }
)
export const userSignUp = createAsyncThunk(
  "user/signup",
  async(data,{rejectWithValue})=>{
    try{
      const response = await axios.post(`${backend_url}/api/user/signup`,data);
      if(!response.data.success){
        return rejectWithValue(response.data.msg || "SignUp Failed");
      }
      return response.data;
    }catch(e){
      return rejectWithValue(e.message);
    }
  }
);
export const SendEmailHandler = createAsyncThunk(
  "forgotPassword/sendEmail",
  async(data,{rejectWithValue})=>{
    try{
      const response = await axios.post(`${backend_url}/api/user/sendemail`,data);
      if(!response.data.success){
         return rejectWithValue(response.data.msg || "Failed to load data")
      }
      return response.data;
    }catch(e){
       return rejectWithValue(e.response?.data?.msg || "Failed")
    }
  }
)

export const OtpVerificationHandler = createAsyncThunk(
  "forgotPassword/OtpVerify",
  async(data,{rejectWithValue})=>{
    try{
      const response = await axios.post(`${backend_url}/api/user/verifyOtp`,data);
      if(!response.data.success){
         return rejectWithValue(response.data.msg || "Failed to load data")
      }
      return response.data;
    }catch(e){
       return rejectWithValue(e.response?.data?.msg || "Failed")
    }
  }
)

export const ResetPasswordHandler = createAsyncThunk(
  "forgotPassword/resetPassword",
  async(data,{rejectWithValue})=>{
    try{
      const response = await axios.post(`${backend_url}/api/user/resetPassword`,data);
      if(!response.data.success){
         return rejectWithValue(response.data.msg || "Failed to load data")
      }
      return response.data;
    }catch(e){
       return rejectWithValue(e.response?.data?.msg || "Failed")
    }
  }
)


const initialState = {
  email:localStorage.getItem("email") || "",
  token:localStorage.getItem("token") || "",
  loader:false,
  successMsg:"",
  error:"",
  user:JSON.parse(localStorage.getItem("user")) || null,

}

const UserSlice = createSlice({
  name:"user",
  initialState:initialState,
  reducers:{
    logOut(state){
       state.user = null;
    state.token = null;
    state.error = "";
    state.successMsg = "";

    localStorage.removeItem("token");
    localStorage.removeItem("user");
    },
    setUserEmail:(state,action)=>{
      console.log(action.payload);
      state.email = action.payload;
      localStorage.setItem('email', action.payload);
    },
    clearMessages: (state) => {
    state.successMsg = "";
    state.error = "";
  }
  },
  extraReducers:(builder)=>{
    builder.addCase(userSignUp.pending,(state)=>{
      state.loader = true;
      state.error = "";
      state.successMsg = ""
    }).addCase(userSignUp.fulfilled, (state,action)=>{
      state.loader = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.successMsg = action.payload.msg;

        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("user", JSON.stringify(action.payload.user));
    }).addCase(userSignUp.rejected, (state,action)=>{
      state.loader = false;
      state.error = action.payload;
      
    })


    .addCase(useSignIn.pending, (state)=>{
      state.loader = true;
      state.error = ""
      state.successMsg = ""
    }).addCase(useSignIn.fulfilled, (state,action)=>{
      state.successMsg = action.payload.msg;
      state.loader = false;
      console.log('i am a payload for user',action.payload);
      state.user = action.payload.user;
       console.log('i am a payload for token',action.payload);
      state.token = action.payload.token;

        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("user", JSON.stringify(action.payload.user));
    }).addCase(useSignIn.rejected, (state,action)=>{
      state.loader = false;
      state.error = action.payload;
     
    })

    .addCase(SendEmailHandler.pending,(state)=>{
      state.loader = true;
      state.error = "",
      state.successMsg = ""
    })
    .addCase(SendEmailHandler.fulfilled,(state,action)=>{
      state.loader = false;
      state.successMsg = action.payload.msg;
    })
    .addCase(SendEmailHandler.rejected,(state,action)=>{
      state.loader = false;
      state.error = action.payload
    })


      .addCase(OtpVerificationHandler.pending,(state)=>{
      state.loader = true;
      state.error = "",
      state.successMsg = ""
    })
    .addCase(OtpVerificationHandler.fulfilled,(state,action)=>{
      state.loader = false;
      state.successMsg = action.payload.msg;
    })
    .addCase(OtpVerificationHandler.rejected,(state,action)=>{
      state.loader = false;
      state.error = action.payload
    })


      .addCase(ResetPasswordHandler.pending,(state)=>{
      state.loader = true;
      state.error = "",
      state.successMsg = ""
    })
    .addCase(ResetPasswordHandler.fulfilled,(state,action)=>{
      state.loader = false;
      state.successMsg = action.payload.msg;
    })
    .addCase(ResetPasswordHandler.rejected,(state,action)=>{
      state.loader = false;
      state.error = action.payload
    })
  }
});
export const  {logOut,setUserEmail,clearMessages} = UserSlice.actions;
export default UserSlice.reducer;