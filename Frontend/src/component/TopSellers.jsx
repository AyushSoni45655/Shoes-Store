import React from 'react'
import Card from './Card'
import { useSelector } from 'react-redux';
const TopSellers = () => {
    const {data} = useSelector((state)=>state.product);
  const tSeller = data.filter((item)=>item.bestSellar === true).slice(0,6)  
  return (
    <div className='w-full h-fit py-6 mt-4 flex flex-col gap-4 bg-[#f5f5f5]'>
      <div className='w-full h-fit spacing flex flex-col gap-6 items-center justify-center'>
        <h1 className='headings font-bold text-3xl text-black sm:text-4xl md:text-5xl tracking-wider'>The Best Seller</h1>
         <div className='flex items-center justify-center flex-row gap-6 flex-wrap w-full h-fit'>
          {
            tSeller.map((item)=>(
               <Card product={{image:item.images[0],featured:false,bestseller:item.bestSellar,name:item.title, price: item.price,
                  oldPrice: item.oprice,
                  rating: item.rating,discount:item.discount,id:item._id}}/>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default TopSellers
