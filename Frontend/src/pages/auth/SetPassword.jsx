// import React, { useState } from 'react'
// import { FaUser, FaPhone } from "react-icons/fa"
// import { IoEyeOff, IoEye } from "react-icons/io5"
// import { MdLock } from "react-icons/md"
// import { NavLink } from 'react-router-dom'
// import { toast } from 'react-hot-toast'
// import { assets } from '../../assets/assets'
// import { userSignUp } from '../../redux-store/slices/userSlice'
// import { useSelector, useDispatch } from 'react-redux'
// import { ResetPasswordHandler} from '../../redux-store/slices/userSlice'
// import { useNavigate } from 'react-router-dom'
// const SetPassword = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const {successMsg,error,loader,user} = useSelector((state)=>state.user); 
//   const [toggle, setToggle] = useState(false)
 
//   const [newPassword,setNewPassword] = useState("");
//   const [checkPassword,setCheckPassword] = useState("");
//   const email = user.email;
//   const onSubmitHandler = (e)=>{
//     e.preventDefault();
//     if(newPassword !== checkPassword){
//       return toast.error("Passwor must be same")
//     }
//     dispatch(ResetPasswordHandler({newPassword,email}))
//     if(successMsg){
//       toast.success(successMsg);
//     }else{
//       toast.error(error);
//     }
//     navigate("/signin",{replace:true});
//   }
//   return (
//     <form
//       onSubmit={onSubmitHandler}
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
//         flex flex-col gap-4
//       ">
//         <h2 className="text-center text-2xl md:text-3xl font-bold tracking-wide text-balck">
//          Secure Your Account
//         </h2>
//         <p className='tracking-tight font-semibold text-white text-center'>Choose a strong password to keep your account safe.</p>

//         {/* Password */}
//         <div className="flex items-center h-11 rounded-lg overflow-hidden bg-white">
//           <div className="w-12 flex items-center justify-center text-gray-600">
//             <MdLock />
//           </div>

//           <input
//             type={toggle ? "text" : "password"}
//             name="password"
//             value={newPassword}
//             onChange={(e)=>setNewPassword(e.target.value)}
//             placeholder="Enter Your New Password"
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

//         {/* check password */}

         
//         <div className="flex items-center h-11 rounded-lg overflow-hidden bg-white">
//           <div className="w-12 flex items-center justify-center text-gray-600">
//             <MdLock />
//           </div>

//           <input
//             type='text'
//             name="checkPassword"
//             value={checkPassword}
//             onChange={(e)=>setCheckPassword(e.target.value)}
//             placeholder="Confirm Your Password"
//             className="flex-1 h-full outline-none px-2 text-sm font-medium text-black"
//           />

          
//         </div>

//         {/* Signup Button */}
//         <button
         
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
//          {loader ? 'Processing':'Continue'}
//         </button>


//         {/* cancel button here */}
        
//         <NavLink className={` h-11 rounded-lg w-full font-bold tracking-wide
//              text-black`} to={`/signin`}>
//           <button
//           className="
//             h-11 rounded-lg font-bold w-full tracking-wide
//             border-2 border-white text-black
//           "
//         >
//          Cancel
//         </button>
//         </NavLink>
      
//       </div>
//     </form>
//   )
// }

// export default SetPassword






// import React, { useState, useEffect, useCallback } from "react";
// import { MdLock } from "react-icons/md";
// import { IoEye, IoEyeOff } from "react-icons/io5";
// import { NavLink, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { toast } from "react-hot-toast";

// import { assets } from "../../assets/assets";
// import { ResetPasswordHandler } from "../../redux-store/slices/userSlice";

// const SetPassword = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const { successMsg, error, loader, user,email } = useSelector(
//     (state) => state.user
//   );

//   const [showPassword, setShowPassword] = useState(false);
//   const [newPassword, setNewPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");

 

//   // ✅ Submit handler
//   const onSubmitHandler = useCallback(
//     (e) => {
//       e.preventDefault();

//       if (!newPassword || !confirmPassword) {
//         return toast.error("All fields are required");
//       }

//       if (newPassword !== confirmPassword) {
//         return toast.error("Passwords do not match");
//       }

//       dispatch(ResetPasswordHandler({ email, newPassword }));
//     },
//     [dispatch, email, newPassword, confirmPassword]
//   );

//   // ✅ Handle async success / error
//   useEffect(() => {
//     if (successMsg) {
//       toast.success(successMsg);
//       navigate("/signin", { replace: true });
//     }

//     if (error) {
//       toast.error(error);
//     }
//   }, [successMsg, error, navigate]);

//   return (
//     <form
//       onSubmit={onSubmitHandler}
//       className="h-screen w-full flex items-center justify-center bg-cover bg-center px-4"
//       style={{ backgroundImage: `url(${assets.loginback})` }}
//     >
//       <div
//         className="
//           w-full max-w-md rounded-2xl
//           border border-white/30
//           bg-white/10 backdrop-blur-xl
//           shadow-2xl px-6 py-8
//           flex flex-col gap-4
//         "
//       >
//         <h2 className="text-center text-2xl md:text-3xl font-bold text-white">
//           Secure Your Account
//         </h2>

//         <p className="text-sm font-semibold text-white/80 text-center">
//           Choose a strong password to keep your account safe.
//         </p>

//         {/* New Password */}
//         <div className="flex items-center h-11 rounded-lg overflow-hidden bg-white">
//           <div className="w-12 flex items-center justify-center text-gray-600">
//             <MdLock />
//           </div>

//           <input
//             type={showPassword ? "text" : "password"}
//             value={newPassword}
//             onChange={(e) => setNewPassword(e.target.value)}
//             placeholder="Enter new password"
//             className="flex-1 h-full outline-none px-2 text-sm font-medium text-black"
//           />

//           <button
//             type="button"
//             onClick={() => setShowPassword(!showPassword)}
//             className="px-3 text-gray-600 hover:text-black"
//           >
//             {showPassword ? <IoEye /> : <IoEyeOff />}
//           </button>
//         </div>

//         {/* Confirm Password */}
//         <div className="flex items-center h-11 rounded-lg overflow-hidden bg-white">
//           <div className="w-12 flex items-center justify-center text-gray-600">
//             <MdLock />
//           </div>

//           <input
//             type={showPassword ? "text" : "password"}
//             value={confirmPassword}
//             onChange={(e) => setConfirmPassword(e.target.value)}
//             placeholder="Confirm password"
//             className="flex-1 h-full outline-none px-2 text-sm font-medium text-black"
//           />
//         </div>

//         {/* Submit Button */}
//         <button
//           type="submit"
//           disabled={loader || !newPassword || !confirmPassword}
//           className="
//             h-11 rounded-lg font-bold tracking-wide
//             bg-white text-black transition
//             hover:bg-gray-200
//             disabled:bg-transparent
//             disabled:border disabled:border-white
//             disabled:text-white
//             disabled:cursor-not-allowed
//             disabled:opacity-60
//           "
//         >
//           {loader ? "Processing..." : "Continue"}
//         </button>

//         {/* Cancel */}
//         <NavLink
//           to="/signin"
//           className="h-11 rounded-lg w-full font-bold tracking-wide"
//         >
//           <button
//             type="button"
//             className="h-11 w-full rounded-lg border-2 border-white text-white"
//           >
//             Cancel
//           </button>
//         </NavLink>
//       </div>
//     </form>
//   );
// };

// export default SetPassword;






import React, { useState, useEffect, useCallback, useMemo } from "react";
import { MdLock } from "react-icons/md";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";

import { assets } from "../../assets/assets";
import {
  ResetPasswordHandler,
  clearMessages,
} from "../../redux-store/slices/userSlice";

const SetPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { successMsg, error, loader, email } = useSelector(
    (state) => state.user
  );

  const [showPassword, setShowPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // ✅ Derived state
  const isFormValid = useMemo(() => {
    return (
      newPassword.length >= 8 &&
      confirmPassword.length >= 8 &&
      newPassword === confirmPassword
    );
  }, [newPassword, confirmPassword]);

  // 🔐 Guard: direct access protection
  useEffect(() => {
    if (!email) {
      toast.error("Session expired");
      navigate("/fPassword", { replace: true });
    }
  }, [email, navigate]);

  // ✅ Submit handler
  const onSubmitHandler = useCallback(
    (e) => {
      e.preventDefault();

      if (!isFormValid) {
        toast.error("Passwords must match & be at least 8 characters");
        return;
      }

      dispatch(ResetPasswordHandler({ email, newPassword: newPassword }));
    },
    [dispatch, email, newPassword, isFormValid]
  );

  // 🔁 Handle async success / error
  useEffect(() => {
    if (successMsg) {
      toast.success(successMsg);
      dispatch(clearMessages());
      navigate("/signin", { replace: true });
    }

    if (error) {
      toast.error(error);
      dispatch(clearMessages());
    }
  }, [successMsg, error, dispatch, navigate]);

  return (
    <form
      onSubmit={onSubmitHandler}
      className="h-screen w-full flex items-center justify-center bg-cover bg-center px-4"
      style={{ backgroundImage: `url(${assets.loginback})` }}
    >
      <div className="w-full max-w-md rounded-2xl border border-white/30 bg-white/10 backdrop-blur-xl shadow-2xl px-6 py-8 flex flex-col gap-4">

        <h2 className="text-center text-2xl md:text-3xl font-bold text-white">
          Secure Your Account
        </h2>

        <p className="text-sm font-semibold text-white/80 text-center">
          Choose a strong password to keep your account safe.
        </p>

        {/* New Password */}
        <div className="flex items-center h-11 rounded-lg bg-white">
          <div className="w-12 flex justify-center text-gray-600">
            <MdLock />
          </div>

          <input
            type={showPassword ? "text" : "password"}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Enter new password"
            className="flex-1 h-full px-2 outline-none text-black"
          />

          <button
            type="button"
            onClick={() => setShowPassword((p) => !p)}
            className="px-3 text-gray-600"
          >
            {showPassword ? <IoEye /> : <IoEyeOff />}
          </button>
        </div>

        {/* Confirm Password */}
        <div className="flex items-center h-11 rounded-lg bg-white">
          <div className="w-12 flex justify-center text-gray-600">
            <MdLock />
          </div>

          <input
            type={showPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm password"
            className="flex-1 h-full px-2 outline-none text-black"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={!isFormValid || loader}
          className={`h-11 rounded-lg font-bold transition
            ${
              isFormValid && !loader
                ? "bg-white text-black hover:bg-gray-200"
                : "border border-white text-white opacity-60 cursor-not-allowed"
            }`}
        >
          {loader ? "Processing..." : "Continue"}
        </button>

        {/* Cancel */}
        <NavLink to="/signin">
          <button
            type="button"
            className="h-11 w-full rounded-lg border-2 border-white text-white font-bold"
          >
            Cancel
          </button>
        </NavLink>
      </div>
    </form>
  );
};

export default SetPassword;
