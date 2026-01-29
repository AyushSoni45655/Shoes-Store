import React from 'react'
import { assets } from '../assets/assets'
import { delay, easeIn, easeInOut, easeOut, motion, stagger } from "motion/react"
const LandingPage = () => {
  return (
    <div className='h-[89vh] bg-gray-300  w-full'   >
        <div className='h-full spacing flex items-center justify-center md:justify-between flex-col md:flex-row gap-2'>
          <div className='h-fit order-2 w-full  flex  items-center justify-center md:justify-start flex-col '>
             <motion.h1
           initial={{y:40,opacity:0}}
           transition={{duration:1,delay:0.4,ease:easeInOut,y:40,opacity:0}}
           animate={{y:0,opacity:1}}
            className=' max-w-lg w-full  tracking-wide text-center md:text-start mt-4 md:mt-0 font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl'>Shop The Latest Shoes & Sneakers</motion.h1>
           <button
         
            className='px-16 md:px-6 border-2 mt-4 ml-2 border-black hover:border-none hover:bg-green-600 hover:text-white rounded-lg font-bold text-lg py-2'>Shop Now</button>
          </div>
          <img src={assets.main} className='order-1 md:order-5' alt="" />
          
        </div>
    
    </div>
  )
}

export default LandingPage
