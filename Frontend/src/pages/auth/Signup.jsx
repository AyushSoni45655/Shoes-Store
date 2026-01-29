// import React, { useEffect, useState } from 'react'
// import { FaUser, FaPhone } from "react-icons/fa"
// import { IoEyeOff, IoEye } from "react-icons/io5"
// import { MdLock } from "react-icons/md"
// import { NavLink } from 'react-router-dom'
// import { toast } from 'react-hot-toast'
// import { assets } from '../../assets/assets'
// import { userSignUp } from '../../redux-store/slices/userSlice'
// import { useSelector, useDispatch } from 'react-redux'
// import { clearMessages } from '../../redux-store/slices/userSlice'
// const Signup = () => {
//   const dispatch = useDispatch();
//   const {successMsg,error,loader} = useSelector((state)=>state.user); 
//   const [toggle, setToggle] = useState(false)
//   const [rememberme, setRememberMe] = useState(false)

//   const [signupData, setSignupData] = useState({
//     name: "",
//     phone: "",
//     email: "",
//     password: ""
//   })

//   const signupOnChange = (e) => {
//     const { name, value } = e.target
//     setSignupData(prev => ({ ...prev, [name]: value }))
//   }

//   const signupSubmitHandler = (e) => {
//     e.preventDefault();
//     dispatch(userSignUp(signupData));
    
//     setSignupData({
//       name:"",
//       email:"",
//       phone:"",
//       password:""
//     })
//   }
//   useEffect(()=>{
//     if(successMsg){
//       toast.success(successMsg);
//       dispatch(clearMessages())
//     }
//     if(error){
//       toast.error(error);
//       dispatch(clearMessages())
//     }
//   },[successMsg,error,dispatch])

//   const rememberChecked = (e) => {
//     const { name, phone, email, password } = signupData
//     if (!name || !phone || !email || !password) {
//       toast.error("Please fill all fields")
//       return
//     }
//     setRememberMe(e.target.checked)
//   }

//   return (
//     <form
//       onSubmit={signupSubmitHandler}
//       className="h-screen w-full flex items-center justify-center bg-cover bg-center px-4"
//       style={{ backgroundImage: `url(${assets.loginback})` }}
//     >
//       {/* Glass Card */}
//       <div className="
//         w-full max-w-md
//         rounded-2xl
//         border border-white/30
//         bg-white/10
//         backdrop-blur-xl
//         shadow-2xl
//         px-6 py-8
//         flex flex-col gap-5
//       ">
//         <h2 className="text-center text-2xl md:text-3xl font-bold tracking-wide text-white">
//           Create Account
//         </h2>

//         {/* Name */}
//         <div className="flex items-center h-11 rounded-lg overflow-hidden bg-white">
//           <div className="w-12 flex items-center justify-center text-gray-600">
//             <FaUser />
//           </div>
//           <input
//             type="text"
//             name="name"
//             value={signupData.name}
//             onChange={signupOnChange}
//             placeholder="Full Name"
//             className="flex-1 h-full outline-none px-2 text-sm font-medium text-black"
//           />
//         </div>

//         {/* Phone */}
//         <div className="flex items-center h-11 rounded-lg overflow-hidden bg-white">
//           <div className="w-12 flex items-center justify-center text-gray-600">
//             <FaPhone />
//           </div>
//           <input
//             type="tel"
//             name="phone"
//             value={signupData.phone}
//             onChange={signupOnChange}
//             placeholder="Phone Number"
//             className="flex-1 h-full outline-none px-2 text-sm font-medium text-black"
//           />
//         </div>

//         {/* Email */}
//         <div className="flex items-center h-11 rounded-lg overflow-hidden bg-white">
//           <div className="w-12 flex items-center justify-center text-gray-600">
//             <FaUser />
//           </div>
//           <input
//             type="email"
//             name="email"
//             value={signupData.email}
//             onChange={signupOnChange}
//             placeholder="Email Address"
//             className="flex-1 h-full outline-none px-2 text-sm font-medium text-black"
//           />
//         </div>

//         {/* Password */}
//         <div className="flex items-center h-11 rounded-lg overflow-hidden bg-white">
//           <div className="w-12 flex items-center justify-center text-gray-600">
//             <MdLock />
//           </div>

//           <input
//             type={toggle ? "text" : "password"}
//             name="password"
//             value={signupData.password}
//             onChange={signupOnChange}
//             placeholder="Create Password"
//             className="flex-1 h-full outline-none px-2 text-sm font-medium text-black"
//           />

//           <button
//             type="button"
//             onClick={() => setToggle(!toggle)}
//             className="px-3 text-gray-600 hover:text-black"
//           >
//             {toggle ? <IoEye /> : <IoEyeOff />}
//           </button>
//         </div>

//         {/* Remember */}
//         <label className="flex items-center gap-2 text-sm text-white cursor-pointer">
//           <input
//             type="checkbox"
//             checked={rememberme}
//             onChange={rememberChecked}
//             className="accent-white cursor-pointer"
//           />
//           Accept Terms & Conditions
//         </label>

//         {/* Signup Button */}
//         <button
//           disabled={!rememberme}
//           className="
//             h-11 rounded-lg font-bold tracking-wide
//             bg-white text-black
//             hover:bg-gray-200
//             transition
//             disabled:bg-transparent
//             disabled:border
//             disabled:border-white
//             disabled:text-white
//             disabled:cursor-not-allowed
//             disabled:opacity-60
//           "
//         >
//          {loader ? 'Processing':'SignUp'}
//         </button>

//         {/* Login Redirect */}
//         <p className="text-center text-sm text-white">
//           Already have an account?
//           <NavLink to={"/signin"} className="ml-1 font-bold underline">
//             Login
//           </NavLink>
//         </p>
//       </div>
//     </form>
//   )
// }

// export default Signup




import React, { useEffect, useState } from "react";
import { FaUser, FaPhone } from "react-icons/fa";
import { IoEyeOff, IoEye } from "react-icons/io5";
import { MdLock, MdEmail } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { toast } from "react-hot-toast";
import { assets } from "../../assets/assets";
import { userSignUp, clearMessages } from "../../redux-store/slices/userSlice";
import { useSelector, useDispatch } from "react-redux";

const Signup = () => {
  const dispatch = useDispatch();
  const { successMsg, error, loader } = useSelector((state) => state.user);

  const [toggle, setToggle] = useState(false);
  const [rememberme, setRememberMe] = useState(false);

  const [signupData, setSignupData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
  });

  /* =======================
     INPUT CHANGE HANDLER
  ======================== */
  const signupOnChange = (e) => {
    const { name, value } = e.target;
    setSignupData((prev) => ({ ...prev, [name]: value }));
  };

  /* =======================
     SUBMIT HANDLER
  ======================== */
  const signupSubmitHandler = (e) => {
    e.preventDefault();

    const { name, phone, email, password } = signupData;

    if (!name || !phone || !email || !password) {
      toast.error("Please fill all fields");
      return;
    }

    if (phone.length !== 10) {
      toast.error("Phone number must be 10 digits");
      return;
    }

    if (!rememberme) {
      toast.error("Please accept Terms & Conditions");
      return;
    }

    dispatch(userSignUp(signupData));
  };

  /* =======================
     API RESPONSE HANDLING
  ======================== */
  useEffect(() => {
    if (successMsg) {
      toast.success(successMsg);
      setSignupData({
        name: "",
        phone: "",
        email: "",
        password: "",
      });
      setRememberMe(false);
      dispatch(clearMessages());
    }

    if (error) {
      toast.error(error);
      dispatch(clearMessages());
    }
  }, [successMsg, error, dispatch]);

  return (
    <form
      onSubmit={signupSubmitHandler}
      className="h-screen w-full flex items-center justify-center bg-cover bg-center px-4"
      style={{ backgroundImage: `url(${assets.loginback})` }}
    >
      {/* Glass Card */}
      <div className="w-full max-w-md rounded-2xl border border-white/30 bg-white/10 backdrop-blur-xl shadow-2xl px-6 py-8 flex flex-col gap-5">
        <h2 className="text-center text-2xl md:text-3xl font-bold tracking-wide text-white">
          Create Account
        </h2>

        {/* Name */}
        <div className="flex items-center h-11 rounded-lg overflow-hidden bg-white">
          <div className="w-12 flex items-center justify-center text-gray-600">
            <FaUser />
          </div>
          <input
            type="text"
            name="name"
            value={signupData.name}
            onChange={signupOnChange}
            placeholder="Full Name"
            className="flex-1 h-full outline-none px-2 text-sm font-medium text-black"
          />
        </div>

        {/* Phone */}
        <div className="flex items-center h-11 rounded-lg overflow-hidden bg-white">
          <div className="w-12 flex items-center justify-center text-gray-600">
            <FaPhone />
          </div>
          <input
            type="tel"
            name="phone"
            value={signupData.phone}
            onChange={signupOnChange}
            placeholder="Phone Number"
            maxLength={10}
            className="flex-1 h-full outline-none px-2 text-sm font-medium text-black"
          />
        </div>

        {/* Email */}
        <div className="flex items-center h-11 rounded-lg overflow-hidden bg-white">
          <div className="w-12 flex items-center justify-center text-gray-600">
            <MdEmail />
          </div>
          <input
            type="email"
            name="email"
            value={signupData.email}
            onChange={signupOnChange}
            placeholder="Email Address"
            className="flex-1 h-full outline-none px-2 text-sm font-medium text-black"
          />
        </div>

        {/* Password */}
        <div className="flex items-center h-11 rounded-lg overflow-hidden bg-white">
          <div className="w-12 flex items-center justify-center text-gray-600">
            <MdLock />
          </div>
          <input
            type={toggle ? "text" : "password"}
            name="password"
            value={signupData.password}
            onChange={signupOnChange}
            placeholder="Create Password"
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

        {/* Terms */}
        <label className="flex items-center gap-2 text-sm text-white cursor-pointer">
          <input
            type="checkbox"
            checked={rememberme}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="accent-white cursor-pointer"
          />
          Accept Terms & Conditions
        </label>

        {/* Button */}
        <button
          disabled={loader || !rememberme}
          className="h-11 rounded-lg font-bold tracking-wide bg-white text-black hover:bg-gray-200 transition disabled:bg-transparent disabled:border disabled:border-white disabled:text-white disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loader ? "Processing..." : "Sign Up"}
        </button>

        {/* Redirect */}
        <p className="text-center text-sm text-white">
          Already have an account?
          <NavLink to="/signin" className="ml-1 font-bold underline">
            Login
          </NavLink>
        </p>
      </div>
    </form>
  );
};

export default Signup;
