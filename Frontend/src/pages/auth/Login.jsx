import React, { useEffect, useState } from 'react'
import { FaUser } from "react-icons/fa"
import { IoEyeOff, IoEye } from "react-icons/io5"
import { MdLock } from "react-icons/md"
import { NavLink } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { assets } from '../../assets/assets'
import { useSelector,useDispatch } from 'react-redux'
import {useSignIn} from '../../redux-store/slices/userSlice'
import { clearMessages } from '../../redux-store/slices/userSlice'
const Login = () => {
  const dispatch = useDispatch();

  const {loader,successMsg,error} = useSelector((state)=>state.user);

  const [toggle, setToggle] = useState(false)
  const [rememberme, setRememberMe] = useState(false)

  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  })

  const loginOnChange = (e) => {
    const { name, value } = e.target
    setLoginData(prev => ({ ...prev, [name]: value }))
  }

  const loginSubmithandler = (e) => {
    e.preventDefault()
    try{
      dispatch(useSignIn(loginData));
    }catch(e){
      toast.error(e)
    }finally{
      setLoginData({
      email:"",
      password:""
    })
    }
  }
  useEffect(()=>{
    if(error){
      toast.error(error);
      dispatch(clearMessages());
    }
    if(successMsg){
      toast.success(successMsg);
      dispatch(clearMessages());
    }
  },[error,successMsg,dispatch])

  const remmeberedChecked = (e) => {
    const { email, password } = loginData
    if (!email || !password) {
      toast.error("Enter Input Field")
      return
    }
    setRememberMe(e.target.checked)
  }

  return (
    <form
      onSubmit={loginSubmithandler}
      className="h-screen w-full flex items-center justify-center bg-cover bg-center px-4"
      style={{ backgroundImage: `url(${assets.loginback})` }}
    >
      {/* Glass Card */}
      <div className="
        w-full max-w-md
        rounded-2xl
        border border-white/30
        bg-white/10
        backdrop-blur-xl
        shadow-2xl
        px-6 py-8
        flex flex-col gap-5
      ">
        <h2 className="text-center text-2xl md:text-3xl font-bold tracking-wide text-white">
          User Login
        </h2>

        {/* Email */}
        <div className="flex items-center h-11 rounded-lg overflow-hidden bg-white">
          <div className="w-12 h-full flex items-center justify-center text-gray-600">
            <FaUser />
          </div>
          <input
            type="text"
            name="email"
            value={loginData.email}
            onChange={loginOnChange}
            placeholder="Enter your email"
            className="flex-1 h-full outline-none px-2 text-sm font-medium text-black"
          />
        </div>

        {/* Password */}
        <div className="flex items-center h-11 rounded-lg overflow-hidden bg-white">
          <div className="w-12 h-full flex items-center justify-center text-gray-600">
            <MdLock />
          </div>

          <input
            type={toggle ? "text" : "password"}
            name="password"
            value={loginData.password}
            onChange={loginOnChange}
            placeholder="Enter your password"
            className="flex-1 h-full outline-none px-2 text-sm font-medium text-black"
          />

          <button
            type="button"
            onClick={() => setToggle(!toggle)}
            className="px-3 text-gray-600 hover:text-black"
          >
            {toggle ? <IoEye /> : <IoEyeOff />}
          </button>
        </div>

        {/* Remember / Forgot */}
        <div className="flex items-center justify-between text-sm text-white">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={rememberme}
              onChange={remmeberedChecked}
              className="accent-white cursor-pointer"
            />
            Remember Me
          </label>

          <NavLink to={"/fPassword"} className="hover:underline font-semibold">
            Forgot Password?
          </NavLink>
        </div>

        {/* Login Button */}
        <button
          disabled={!rememberme}
          className="
            h-11 rounded-lg font-bold tracking-wide
            bg-white text-black
            hover:bg-gray-200
            transition
            disabled:bg-transparent
            disabled:border
            disabled:border-white
            disabled:text-white
            disabled:cursor-not-allowed
            disabled:opacity-60
          "
        >
          {loader ? 'Processing':"Sign In"}
        </button>

        {/* Signup */}
        
           <button
          className="
            h-11 rounded-lg font-bold tracking-wide
            border border-white text-white
            hover:bg-white hover:text-black
            transition
          "
        >
        <NavLink className="w-full h-full" to={"/signup"}><h2>Sign Up</h2></NavLink>
        </button>
        
       
      </div>
    </form>
  )
}

export default Login
