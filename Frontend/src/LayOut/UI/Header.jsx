import React from "react";
import { assets,navs } from "../../assets/assets";
import { NavLink } from "react-router-dom";
import { FaRegHeart } from "react-icons/fa";
import { LuShoppingCart } from "react-icons/lu";
import { FaRegUserCircle } from "react-icons/fa";
import { useSelector, useDispatch } from 'react-redux'
import { delay, easeIn, easeOut, motion, stagger } from "motion/react"
import { logOut } from "../../redux-store/slices/userSlice";
import {toast} from 'react-hot-toast'
const Header = () => {
  const {cartLengths} = useSelector((state)=>state.cart);
  const {wishlistLength} = useSelector((state)=>state.wishlist);
    const [open, setOpen] = React.useState(false)
    const dispatch = useDispatch();
    const token = useSelector((state)=>state.user.token);
    const logOutFun = ()=>{
      dispatch(logOut());
      toast.success("LogOut Completed✅")
    }
    
    return (
        <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32
         py-4 border-b mb-1 border-gray-300  relative transition-all">
            <div className="h-13 w-13 border-[2px] border-blue-500  overflow-hidden  rounded-full ">
                 <img src={assets.sh_logo} className="h-full object-center object-cover rounded-full w-full" alt="" />
            </div>
           

            {/* Desktop Menu */}
            <motion.div
  className="hidden sm:flex items-center gap-6"
  initial="hidden"
  animate="visible"
  variants={{
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15, // 👈 ek ek karke
        delayChildren: 0.3,    // thoda late start
      },
    },
  }}
>
  {navs.map((item) => (
    <NavLink
      key={item.id}
      to={item.path}
      className={({ isActive }) =>
        isActive ? "text-green-800" : "text-black"
      }
    >
      <motion.h1
        variants={{
          hidden: { y: 50, opacity: 0 }, // neeche se
          visible: {
            y: 0,
            opacity: 1,
            transition: {
              duration: 0.6,
              ease: "easeOut",
            },
          },
        }}
        className="font-bold text-md tracking-wider
                   border-b-2 border-transparent
                   hover:border-green-800
                   transition-colors duration-300"
      >
        {item.name}
      </motion.h1>
    </NavLink>
  ))}
  
</motion.div>
            <div className="flex flex-row justify-between gap-8">
                <div className="relative flex flex-row justify-between gap-8 items-center h-fit w-fit">
               <NavLink to={`/wishlist`}> <div className="relative"><FaRegHeart className="h-6 w-6"/> <div className="h-5 w-5 rounded-full bg-black bottom-3 left-4 right-0 absolute text-white font-medium text-sm flex items-center justify-center p-2"><p className="text-sm font-medium">{wishlistLength}</p></div></div></NavLink>
               {/* cart here */}
                <NavLink to={"/cart"}>  <div className="relative"><LuShoppingCart className="h-6 w-6" /><div className="h-5 w-5 rounded-full bg-black bottom-3 left-4 right-0 absolute text-white font-medium text-sm flex items-center justify-center p-2"><p className="text-sm font-medium">{cartLengths}</p></div></div></NavLink>
                <div className="group relative inline-block">
  <FaRegUserCircle className="h-6 w-6 cursor-pointer" />

  <div
    className="absolute top-8 right-0
    bg-gray-400 p-2 rounded-md
    flex flex-col gap-1
    invisible opacity-0
    group-hover:visible group-hover:opacity-100
    transition-all duration-200"
  >
   <NavLink to={'/profile'}> <h2 className="text-black border-b-[2px] border-b-gray-500 mb-1 font-bold pl-2">Profile</h2></NavLink>
    {
      localStorage.getItem('token') ? (  <NavLink to={`/orders`}><h2 className="text-black border-b-[2px] border-b-gray-500 mb-1 font-bold pl-2">Orders</h2></NavLink>):null
    }
   
    {/* <div className="h-[1px] w-full bg-gray-600 rounded-full"></div> */}

    {token ? (
      <button
        onClick={logOutFun}
        className="py-1 w-full bg-blue-600 rounded-md"
      >
        LogOut
      </button>
    ) : (
      <NavLink to="/signin">
        <button className="py-1 w-full bg-blue-600 rounded-md">
          Login
        </button>
      </NavLink>
    )}
  </div>
</div>

                
            </div>

            <button onClick={() => open ? setOpen(false) : setOpen(true)} aria-label="Menu" className="sm:hidden">
                {/* Menu Icon SVG */}
                <svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="21" height="1.5" rx=".75" fill="#426287" />
                    <rect x="8" y="6" width="13" height="1.5" rx=".75" fill="#426287" />
                    <rect x="6" y="13" width="15" height="1.5" rx=".75" fill="#426287" />
                </svg>
            </button>

            </div>
            {/* Mobile Menu */}
            <div className={`${open ? 'flex' : 'hidden'} items-center justify-center absolute top-[60px] h-screen left-0 w-full
             bg-white mt-2 shadow-md py-4 flex-col  gap-4 px-5 text-sm md:hidden`}>
                {
                navs.map((item)=>(<NavLink onClick={()=>setOpen(false)} to={item.path} key={item.id}><h1 className="font-bold text-lg">{item.name}</h1></NavLink>))
              }
                <button
               
                 className="cursor-pointer px-6 py-2 mt-2 bg-indigo-500 hover:bg-indigo-600 transition text-white rounded-full text-sm">
                    Login
                </button>
            </div>

        </nav>
    )
}

export default Header;