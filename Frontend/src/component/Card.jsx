import React from 'react';
import { FaHeart } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import {NavLink} from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import { clearWishListMsg } from '../redux-store/slices/wishlistSlice';
import { toggleWishlist } from '../redux-store/slices/wishlistSlice';
import {toast} from 'react-hot-toast';
import { useEffect } from 'react';
import { getWishlists } from '../redux-store/slices/wishlistSlice';
const Card = ({ product }) => {
  const dispatch = useDispatch();
 
  const {error,successMsg,loading,wishListData,wishlistLength} = useSelector((state)=>state.wishlist);

  console.log(product.discount);
  const OPrice = product.oldPrice || 0;
  const discount = product.discount || 0;
  
  // clear wishlist messages
  useEffect(()=>{
  
     if(error){
      toast.error(error);
      dispatch(clearWishListMsg());
    }
  },[dispatch,error])
  const price = Math.round(OPrice - (OPrice * discount)/100);

  console.log(price);
  const isWishlisted = wishListData?.some(
    (item) => item.productId?._id === product.id
  );
  const wishlistHandler = (e) => {
  e.preventDefault();
  e.stopPropagation();

  dispatch(toggleWishlist({ productId: product.id }))
    .then(() => dispatch(getWishlists()));
};
  
  return (
    <NavLink to={`/products/${product.id}`} className='h-fit rounded-md w-full sm:w-96 flex flex-col gap-2 bg-white shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden relative'>
      
      {/* Product Image */}
      <div
        className='w-full  overflow-hidden ransition-all duration-300 
                hover:scale-105 hover:shadow-2xl 
                hover:-translate-y-2 cursor-pointer relative h-44 rounded-md bg-gray-100 flex items-end justify-end'
        style={{
          
          backgroundImage: `url(${product.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Top-right wishlist + badges */}
        <div className='absolute top-2 right-2 flex flex-col gap-1'>
          {product.featured && (
            <span className='bg-green-800 text-white text-xs px-2 py-1 rounded-full font-semibold'>
              ⭐ Featured
            </span>
          )}
          {product.bestseller && (
            <span className='bg-red-600 text-white text-xs px-2 py-1 rounded-full font-semibold'>
              🔥 Bestseller
            </span>
          )}
        </div>

        {/* Top-left star or extra */}
        <div className='absolute top-2 left-2 flex items-center gap-1'>
          <div onClick={wishlistHandler} className='w-fit h-fit'> 
            <FaHeart className={`h-6 w-6  ${isWishlisted ? 'text-red-700':'text-gray-600'} `}/></div>
        
          
        </div>
      </div>

      {/* Product Content */}
      <div className='w-full flex flex-col gap-1 h-fit p-2'>
        <h2 className='font-semibold text-gray-800 line-clamp-1'>{product.name}</h2>

        {/* Rating */}
        <div className='flex flex-row gap-[2px] items-center h-fit w-fit'>
          {[...Array(5)].map((_, i) => (
            <FaStar
              key={i}
              className={i < product.rating ? "text-yellow-400 h-3 w-3" : "text-gray-300 h-3 w-3"}
            />
          ))}
        </div>

        {/* Price */}
        <h2 className='font-bold text-lg text-black tracking-wider'>
          ${`${price}.00`}{" "}
          {product.oldPrice && (
            <span className='font-semibold tracking-wide text-md text-gray-500 line-through'>
              ${product.oldPrice.toFixed(2)}
            </span>
          )}
        </h2>
      </div>
    </NavLink>
  );
};

export default Card;
