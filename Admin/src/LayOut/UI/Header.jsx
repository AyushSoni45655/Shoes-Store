import React from 'react'
import { GiHamburgerMenu } from "react-icons/gi";
import { toggleSideBar } from '../../react_redux/slices/userSlice';
import {useDispatch} from 'react-redux'
const Header = () => {
  const dispatch = useDispatch();
  return (
    <div className='w-full bg-[#F8FAFC] border-b-2 border-b-[#E2E8F0] text-[#0F172A]  h-fit flex items-center justify-between p-2'>
      {/* hambur icon and logo */}
      <div className='w-fit h-full flex  items-center justify-between flex-row gap-4'>
        <GiHamburgerMenu onClick={()=>dispatch(toggleSideBar())} className='h-6  w-10 text-[#475569]' />
        <h1 className='font-bold text-2xl !text-[#0F172A] tracking-tight '>AdminS</h1>
      </div>

      {/* profile icon here */}
      <div className='h-12 w-12 rounded-full bg-red-600'></div>
    </div>
  )
}

export default Header
