


// import React, { useState, useEffect } from "react";
// import { CiMail } from "react-icons/ci";
// import { MdFormatListNumbered } from "react-icons/md";
// import { useSelector, useDispatch } from "react-redux";
// import { OtpVerificationHandler } from "../../redux-store/slices/userSlice";
// import { toast } from "react-hot-toast";
// import { useNavigate } from "react-router-dom";

// const OtpScreen = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const { successMsg, error, loader, email } = useSelector(
//     (state) => state.user
//   );

//   const [otp, setOtp] = useState("");
//   const isOtpValid = otp.length === 6;


//   // 🔁 Handle success / error AFTER redux update
//   useEffect(() => {
//     if (successMsg) {
//       toast.success(successMsg);
//       navigate("/setPassword", { replace: true });
//     }

//     if (error) {
//       toast.error(error);
//     }
//   }, [successMsg, error, navigate]);

//   const handleChange = (e) => {
//     const value = e.target.value.replace(/\D/g, "");
//     if (value.length <= 6) {
//       setOtp(value);
//     }
//   };

//   const submitterHandler = (e) => {
//     e.preventDefault();

//     if (!isOtpValid) {
//       toast.error("Please enter valid 6-digit OTP");
//       return;
//     }

//     dispatch(OtpVerificationHandler({ otp, email }));
//   };

//   return (
//     <form
//       onSubmit={submitterHandler}
//       className="w-full min-h-screen px-2 flex items-center justify-center"
//     >
//       <div className="w-full max-w-lg p-4 border-2 border-gray-500 rounded-lg flex flex-col items-center">

//         {/* Icon */}
//         <div className="mt-2 p-2 border-2 border-gray-500 rounded-md">
//           <CiMail className="h-12 w-10 text-blue-400" />
//         </div>

//         {/* Title */}
//         <h2 className="mt-4 text-lg sm:text-xl md:text-2xl font-bold tracking-widest text-black">
//           SECURE VERIFICATION
//         </h2>

//         {/* Subtitle */}
//         <p className="text-gray-500 font-semibold tracking-wider text-center">
//           Enter the 6-digit code sent to your email address
//         </p>

//         {/* OTP Input */}
//         <div className="mt-4 flex items-center h-11 w-full rounded-lg overflow-hidden bg-gray-300">
//           <div className="w-12 flex items-center justify-center text-gray-600">
//             <MdFormatListNumbered />
//           </div>
//           <input
//             type="text"
//             inputMode="numeric"
//             placeholder="Enter OTP"
//             value={otp}
//             onChange={handleChange}
//             className="flex-1 h-full px-2 outline-none text-sm font-medium text-black bg-transparent"
//           />
//         </div>

//         {/* Continue Button */}
//         <button
//           type="submit"
//           disabled={!isOtpValid || loader}
//           className={`h-11 w-full my-6 flex items-center justify-center rounded-lg font-bold tracking-wide
//             ${
//               isOtpValid
//                 ? "bg-blue-400 text-black"
//                 : "border-2 border-blue-500 text-gray-500"
//             }
//           `}
//         >
//           {loader ? "Processing..." : "Continue"}
//         </button>

//         {/* Resend */}
//         <div className="flex items-center gap-1 text-sm">
//           <p className="text-gray-500 font-semibold">
//             Didn’t receive any code?
//           </p>
//           <button
//             type="button"
//             className="font-bold underline text-black"
//           >
//             Resend Code
//           </button>
//         </div>
//       </div>
//     </form>
//   );
// };

// export default OtpScreen;






// import React, { useState, useEffect, useCallback, useMemo } from "react";
// import { CiMail } from "react-icons/ci";
// import { MdFormatListNumbered } from "react-icons/md";
// import { useSelector, useDispatch } from "react-redux";
// import { OtpVerificationHandler } from "../../redux-store/slices/userSlice";
// import { clearMessages } from "../../redux-store/slices/userSlice";
// import { toast } from "react-hot-toast";
// import { useNavigate } from "react-router-dom";

// const OtpScreen = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const { successMsg, error, loader, email } = useSelector(
//     (state) => state.user
//   );

//   const [otp, setOtp] = useState("");

//   // ✅ derived state (no re-render issues)
//   const isOtpValid = useMemo(() => otp.length === 6, [otp]);

 
 
//   // ✅ OTP input handler
//   const handleChange = useCallback((e) => {
//     const value = e.target.value.replace(/\D/g, "");
//     if (value.length <= 6) setOtp(value);
//   }, []);
// const submitHandler = async(e)=>{
// e.preventDefault();
// if(!email)return;
// try{
// await dispatch(OtpVerificationHandler({otp,email})).unwrap();

// // 3️⃣ success flow
//       toast.success("OTP sent successfully");
//       navigate("/setPassword", { replace: true });
// }catch(err){
//  toast.error(err?.message || "Something went wrong");
// }
// }
//   return (
//     <form
//       onSubmit={submitHandler}
//       className="w-full min-h-screen px-2 flex items-center justify-center"
//     >
//       <div className="w-full max-w-lg p-4 border-2 border-gray-500 rounded-lg flex flex-col items-center">

//         {/* Icon */}
//         <div className="mt-2 p-2 border-2 border-gray-500 rounded-md">
//           <CiMail className="h-12 w-10 text-blue-400" />
//         </div>

//         <h2 className="mt-4 text-xl font-bold tracking-widest">
//           SECURE VERIFICATION
//         </h2>

//         <p className="text-gray-500 font-semibold text-center">
//           Enter the 6-digit code sent to your email
//         </p>

//         {/* OTP Input */}
//         <div className="mt-4 flex items-center h-11 w-full rounded-lg bg-gray-300">
//           <div className="w-12 flex items-center justify-center text-gray-600">
//             <MdFormatListNumbered />
//           </div>
//           <input
//             type="text"
//             inputMode="numeric"
//             placeholder="Enter OTP"
//             value={otp}
//             onChange={handleChange}
//             className="flex-1 h-full px-2 outline-none bg-transparent"
//           />
//         </div>

//         {/* Button */}
//         <button
//           type="submit"
//           disabled={!isOtpValid || loader}
//           className={`h-11 w-full my-6 rounded-lg font-bold
//             ${
//               isOtpValid && !loader
//                 ? "bg-blue-400 text-black"
//                 : "border-2 border-blue-500 text-gray-500"
//             }`}
//         >
//           {loader ? "Processing..." : "Continue"}
//         </button>

//         {/* Resend */}
//         <div className="flex gap-1 text-sm">
//           <span className="text-gray-500">Didn’t receive any code?</span>
//           <button type="button" className="font-bold underline">
//             Resend Code
//           </button>
//         </div>
//       </div>
//     </form>
//   );
// };

// export default OtpScreen;










import React, { useState, useCallback, useMemo, useEffect } from "react";
import { CiMail } from "react-icons/ci";
import { MdFormatListNumbered } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import {
  OtpVerificationHandler,
  clearMessages,
} from "../../redux-store/slices/userSlice";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const OtpScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loader, email } = useSelector((state) => state.user);

  const [otp, setOtp] = useState("");

  /* 🔐 Guard: direct access protection */
  useEffect(() => {
    if (!email) {
      toast.error("Session expired");
      navigate("/fPassword", { replace: true });
    }
  }, [email, navigate]);

  /* ✅ Derived state */
  const isOtpValid = useMemo(() => otp.length === 6, [otp]);

  /* ✅ OTP input handler */
  const handleChange = useCallback((e) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length <= 6) setOtp(value);
  }, []);

  /* ✅ Submit handler */
  const submitHandler = async (e) => {
    e.preventDefault();

    if (!isOtpValid) {
      toast.error("Enter valid 6-digit OTP");
      return;
    }

    try {
      await dispatch(
        OtpVerificationHandler({ otp, email })
      ).unwrap();

      toast.success("OTP verified successfully");
      dispatch(clearMessages());
      navigate("/setPassword", { replace: true });

    } catch (err) {
      toast.error(err?.message || "Invalid OTP");
    }
  };

  return (
    <form
      onSubmit={submitHandler}
      className="w-full min-h-screen flex items-center justify-center px-2"
    >
      <div className="w-full max-w-lg p-4 border-2 border-gray-500 rounded-lg flex flex-col items-center">

        {/* Icon */}
        <div className="mt-2 p-2 border-2 border-gray-500 rounded-md">
          <CiMail className="h-12 w-10 text-blue-400" />
        </div>

        <h2 className="mt-4 text-xl font-bold tracking-widest">
          SECURE VERIFICATION
        </h2>

        <p className="text-gray-500 font-semibold text-center">
          Enter the 6-digit code sent to your email
        </p>

        {/* OTP Input */}
        <div className="mt-4 flex items-center h-11 w-full rounded-lg bg-gray-300">
          <div className="w-12 flex justify-center text-gray-600">
            <MdFormatListNumbered />
          </div>

          <input
            type="text"
            inputMode="numeric"
            placeholder="Enter OTP"
            value={otp}
            onChange={handleChange}
            className="flex-1 h-full px-2 outline-none bg-transparent"
          />
        </div>

        {/* Button */}
        <button
          type="submit"
          disabled={!isOtpValid || loader}
          className={`h-11 w-full my-6 rounded-lg font-bold transition
            ${
              isOtpValid && !loader
                ? "bg-blue-400 text-black"
                : "border-2 border-blue-500 text-gray-500 cursor-not-allowed"
            }`}
        >
          {loader ? "Processing..." : "Continue"}
        </button>

        {/* Resend */}
        <div className="flex gap-1 text-sm">
          <span className="text-gray-500">Didn’t receive any code?</span>
          <button
            type="button"
            className="font-bold underline"
            onClick={() => toast("Resend OTP feature pending")}
          >
            Resend Code
          </button>
        </div>
      </div>
    </form>
  );
};

export default OtpScreen;
