


// import React, { useState, useEffect, useCallback } from "react";
// import { FaUser } from "react-icons/fa";
// import { FaArrowLeftLong } from "react-icons/fa6";
// import { NavLink, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { toast } from "react-hot-toast";

// import { assets } from "../../assets/assets";
// import { SendEmailHandler } from "../../redux-store/slices/userSlice";
// import { setUserEmail } from "../../redux-store/slices/userSlice";
// const ForgotPassword = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const { successMsg, error, loader } = useSelector(
//     (state) => state.user
//   );

//   const [email, setEmail] = useState("");

//   const submitHandler = async(e)=>{
//     e.preventDefault();
//     if(!email)return;
// try{
// dispatch(setUserEmail(email));
// await dispatch(SendEmailHandler({email})).unwrap();
//     // 3️⃣ success ke baad hi navigate
//     toast.success("OTP sent successfully");
//     navigate("/otpscreen", { replace: true });
// }catch(e){
// toast.error(e)
// }
//   }

 

//   return (
//     <form
//       onSubmit={submitHandler}
//       className="h-screen w-full flex items-center justify-center bg-cover bg-center px-4"
//       style={{ backgroundImage: `url(${assets.loginback})` }}
//     >
//       <div
//         className="
//           w-full max-w-md rounded-2xl
//           border border-white/30
//           bg-white/10 backdrop-blur-xl
//           shadow-2xl px-6 py-8
//           flex flex-col gap-5
//         "
//       >
//         <h2 className="text-center text-2xl md:text-3xl font-bold text-white">
//           Forgot Password?
//         </h2>

//         <p className="text-center text-sm text-white/80">
//           Don’t worry! Enter your email and we’ll send you an OTP.
//         </p>

//         {/* Email */}
//         <div className="flex items-center h-11 rounded-lg overflow-hidden bg-white">
//           <div className="w-12 flex items-center justify-center text-gray-600">
//             <FaUser />
//           </div>
//           <input
//             type="email"
//             placeholder="Enter your email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="flex-1 h-full outline-none px-2 text-sm font-medium text-black"
//           />
//         </div>

//         {/* Button */}
//         <button
//           type="submit"
//           disabled={!email || loader}
//           className={`h-11 rounded-lg font-bold tracking-wide transition
//             ${
//               email && !loader
//                 ? "bg-white text-black"
//                 : "border-2 border-white text-white"
//             }`}
//         >
//           {loader ? "Processing..." : "Reset Password"}
//         </button>

//         {/* Back */}
//         <div className="flex items-center justify-center gap-2">
//           <FaArrowLeftLong className="h-5 w-5 text-green-700" />
//           <NavLink to="/signin" className="text-white font-bold underline">
//             Back To Login
//           </NavLink>
//         </div>
//       </div>
//     </form>
//   );
// };

// export default ForgotPassword;



import React, { useState } from "react";
import { FaUser } from "react-icons/fa";
import { FaArrowLeftLong } from "react-icons/fa6";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";

import { assets } from "../../assets/assets";
import {
  SendEmailHandler,
  setUserEmail
} from "../../redux-store/slices/userSlice";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loader } = useSelector((state) => state.user);

  const [email, setEmail] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!email) return;

    try {
      // 1️⃣ save email in redux
      dispatch(setUserEmail(email));

      // 2️⃣ send OTP
      await dispatch(SendEmailHandler({ email })).unwrap();

      // 3️⃣ success flow
      toast.success("OTP sent successfully");
      navigate("/otpscreen", { replace: true });

    } catch (err) {
     toast.error(err?.message || "Something went wrong");
    }
  };

  return (
    <form
      onSubmit={submitHandler}
      className="h-screen w-full flex items-center justify-center bg-cover bg-center px-4"
      style={{ backgroundImage: `url(${assets.loginback})` }}
    >
      <div className="w-full max-w-md rounded-2xl border border-white/30 bg-white/10 backdrop-blur-xl shadow-2xl px-6 py-8 flex flex-col gap-5">

        <h2 className="text-center text-2xl md:text-3xl font-bold text-white">
          Forgot Password?
        </h2>

        <p className="text-center text-sm text-white/80">
          Don’t worry! Enter your email and we’ll send you an OTP.
        </p>

        {/* Email */}
        <div className="flex items-center h-11 rounded-lg overflow-hidden bg-white">
          <div className="w-12 flex items-center justify-center text-gray-600">
            <FaUser />
          </div>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 h-full outline-none px-2 text-sm font-medium text-black"
          />
        </div>

        {/* Button */}
        <button
          type="submit"
          disabled={!email || loader}
          className={`h-11 rounded-lg font-bold tracking-wide
            ${email && !loader
              ? "bg-white text-black"
              : "border-2 border-white text-white"}`}
        >
          {loader ? "Processing..." : "Reset Password"}
        </button>

        {/* Back */}
        <div className="flex items-center justify-center gap-2">
          <FaArrowLeftLong className="h-5 w-5 text-green-700" />
          <NavLink to="/signin" className="text-white font-bold underline">
            Back To Login
          </NavLink>
        </div>
      </div>
    </form>
  );
};

export default ForgotPassword;
