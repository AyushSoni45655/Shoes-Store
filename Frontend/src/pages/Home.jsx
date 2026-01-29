import React from 'react'
import LandingPage from '../component/LandingPage'
import FeaturedCard from '../component/FeaturedCard'
import TopSellers from '../component/TopSellers'
import { assets } from '../assets/assets'
import Testimonials from '../component/Testimonials'
import Brands from '../component/Brands'
import Subscribe from '../component/Subscribe'
import { useSelector } from 'react-redux'
const Home = () => {
  const {data} = useSelector((state)=>state.product);
  const fData = data.filter((item)=>item.isFeature === true).slice(0,6)
  const tSeller = data.filter((item)=>item.bestSellar === true).slice(0,6)  
  return (
    <div className='w-full min-h-screen'>
     <LandingPage/>

    {/* featured card here */}
    <FeaturedCard />

    {/* top  selllers here */}
    <TopSellers/>

    {/* poster here */}
    <div className='w-full bg-[#fec200]  h-fit py-4'>
      <div className='w-full h-full flex px-4 flex-col md:flex-row items-center justify-between '>
        <div className='w-fit h-fit pl-6 order-2 flex flex-col gap-1'>
          <h1 className='headings font-bold tracking-wide text-black text-2xl sm:text-3xl md:text-4xl'>Step Into Comfort & Style</h1>
          <p className='tracking-wider font-semibold '>Premium shoes designed for everyday wear...</p>
          <button className='border-2 w-fit h-fit rounded-full border-green-700 px-12 font-bold text-lg tracking-wide mt-4 py-2'>Shop Now</button>
        </div>
         <img src={assets.shoes} className='h-full order-1 md:order-4 w-96  object-center object-cover' alt="" />
      </div>
     
    </div>

    {/* testimonials here */}
    <Testimonials/>

    {/* top leading brands here */}
    <Brands/>

    {/* subscribe bannar here */}
    <Subscribe/>
    </div>
  )
}

export default Home
