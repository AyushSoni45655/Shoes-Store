import React,{useState} from "react"
import { AiOutlineEye } from "react-icons/ai";//<AiOutlineEye />
import { AiOutlineEyeInvisible } from "react-icons/ai";//<AiOutlineEyeInvisible />
import { assetss } from "../../assets/assets";
import { login } from "../../react_redux/slices/userSlice";
import { useDispatch,useSelector } from "react-redux";
import {toast} from 'react-hot-toast'
import { useEffect } from "react";
import { clearMessage } from "../../react_redux/slices/userSlice";
const SignIn = () => {
    const {loader,token,error,successMsg} = useSelector((state)=>state.user);
    const dispatch = useDispatch();
  const [togglePassword, settogglePassword] = useState(false)

    const [formData, setFormData] = React.useState({
        email: '',
        password: ''
    });

    const handleSubmit = (e) => {
        const {email,password} = formData;
        e.preventDefault()
        console.log('formdata here',formData);
        if(!email || !password){
            toast.error("enter all fields");
            return;
        }
        dispatch(login(formData));    
      
    }
    useEffect(()=>{

          if(successMsg){
            toast.success(successMsg);
            dispatch(clearMessage())
        } 
        if(error){
            toast.error(error);
            dispatch(clearMessage())
        } 

    },[error,successMsg,dispatch])

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    return (
       <div className="w-full min-h-screen bg-center bg-cover flex items-center  justify-center" style={{
        backgroundImage:`url(${assetss.loginback})`
       }}>
         <form
            onSubmit={handleSubmit}
            className="sm:w-87.5 w-full text-center bg-gray-900 border border-gray-800 rounded-2xl px-8">
            <h1 className="!text-white text-3xl mt-10 font-medium">
               Login
            </h1>

            <p className="text-gray-400 font-semibold tracking-wide text-sm mt-2">Please sign in to continue</p>

         

            <div className="flex items-center w-full mt-4 bg-gray-800 border border-gray-700 h-12 rounded-full overflow-hidden pl-6 gap-2 ">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-gray-400" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"> <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" /> <rect x="2" y="4" width="20" height="16" rx="2" /> </svg>
                <input type="email" name="email" placeholder="Email id" className="w-full bg-transparent text-white placeholder-gray-400 border-none outline-none " value={formData.email} onChange={handleChange} required />
            </div>

            <div className=" flex items-center pr-2  mt-4 w-full bg-gray-800 border border-gray-700 h-12 rounded-full overflow-hidden pl-6 gap-2 ">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-gray-400" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"> <rect width="18" height="11" x="3" y="11" rx="2" ry="2" /> <path d="M7 11V7a5 5 0 0 1 10 0v4" /> </svg>
                <input type={togglePassword ? 'text':"password"} name="password" placeholder="Password" className="w-full bg-transparent text-white placeholder-gray-400 border-none outline-none" value={formData.password} onChange={handleChange} required />
                <span className="font-bold h-5 w-5  text-white" onClick={()=>settogglePassword(!togglePassword)}> {togglePassword ? <AiOutlineEye className="h-5 w-5"/> : <AiOutlineEyeInvisible className="h-5 w-5" /> }</span>
            </div>

           

            <button type="submit" className="my-10 w-full  h-11 rounded-full text-white bg-indigo-600 hover:bg-indigo-500 transition " >
              {loader ? 'processing':"Login"}
            </button>

       
        </form>
       </div>
    )
}
export default SignIn;