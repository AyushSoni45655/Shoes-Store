import React from 'react'
import Card from './Card'
import { useSelector } from 'react-redux';
const FeaturedCard = () => {
   const {data} = useSelector((state)=>state.product);
  const fData = data.filter((item)=>item.isFeature === true).slice(0,6);
  
  return (
    <div className='h-fit w-full  flex flex-col gap-4'>
      <div className='spacing flex items-center justify-center flex-col gap-6 h-fit w-full'>
        <h2 className='font-bold text-black tracking-wider headings text-3xl sm:text-4xl md:text-5xl mt-8'>Featured Products</h2>
        <div className='flex items-center justify-center flex-row gap-6 flex-wrap w-full h-fit'>
          {
            fData.map((item)=>(

               <Card product={{image:item.images[0],featured:item.isFeature,bestseller:item.bestsellar,name:item.title, price: item.price,
                  oldPrice: item.oprice,
                  rating: item.rating,discount:item.discount,id:item._id}}/>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default FeaturedCard
