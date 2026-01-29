
import React, { useState } from "react";

import { FaHeart } from "react-icons/fa";
import { MdOutlineFavorite } from "react-icons/md";
import {NavLink} from 'react-router-dom'
import { useDispatch,useSelector } from "react-redux";
import { toggleWishlist,getWishlists } from "../redux-store/slices/wishlistSlice";
const Arrivals = () => {
  const dispatch  = useDispatch();
  const { data, loading } = useSelector((state) => state.product);
   const {wishListData} = useSelector((state) => state.wishlist);

    const wishlistHandler = (e,id) => {
    e.preventDefault();
    e.stopPropagation();
  
    dispatch(toggleWishlist({ productId:id  }))
      .then(() => dispatch(getWishlists()));
  };
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedBrand, setSelectedBrand] = useState("All");
  const [sortBy, setSortBy] = useState("Newest");

  // Unique categories & brands for filter dropdown
  const categories = ["All", ...new Set(data.map((item) => item.category))];
  const brands = ["All", ...new Set(data.map((item) => item.brand))];

  // Filtered data
  let arrivals = data
    .filter((item) => item.isNewArrival && item.isActive)
    .filter((item) =>
      selectedCategory === "All" ? true : item.category === selectedCategory
    )
    .filter((item) =>
      selectedBrand === "All" ? true : item.brand === selectedBrand
    );

   


  // Sorting
  if (sortBy === "PriceLow") {
    arrivals = arrivals.sort((a, b) => a.price - b.price);
  } else if (sortBy === "PriceHigh") {
    arrivals = arrivals.sort((a, b) => b.price - a.price);
  } else if (sortBy === "Newest") {
    arrivals = arrivals.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <p className="text-lg font-semibold">Loading New Arrivals...</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">


             {/* Header */}
      <div className="text-center py-4 ">
        <h1 className="text-3xl md:text-4xl font-bold">New Arrivals</h1>
        <p className="text-gray-500 mt-2">
          Discover the latest drops 🔥
       </p>
     </div>


      {/* Banner */}
      <div className="relative w-full h-[240px] md:h-[340px] overflow-hidden">
        <img
          src="https://i.pinimg.com/474x/c6/9c/e0/c69ce09062deeebb82adcf923f562fed.jpg"
          alt="New Arrivals Banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-white text-center px-4">
          <h1 className="text-3xl md:text-5xl font-bold tracking-wide">
            New Arrivals
          </h1>
          <p className="mt-3 text-sm md:text-lg text-gray-200">
            Step into the latest sneaker drops
          </p>
        </div>
      </div>

      

      {/* Filter & Sort Bar */}
      <div className="flex flex-col md:flex-row justify-between items-center px-6 md:px-12 py-6 gap-4">
        {/* Category Filter */}
        <select
          className="border rounded-md px-3 py-2 bg-white"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        {/* Brand Filter */}
        <select
          className="border rounded-md px-3 py-2 bg-white"
          value={selectedBrand}
          onChange={(e) => setSelectedBrand(e.target.value)}
        >
          {brands.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>

        {/* Sort */}
        <select
          className="border rounded-md px-3 py-2 bg-white"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="Newest">Newest First</option>
          <option value="PriceLow">Price: Low to High</option>
          <option value="PriceHigh">Price: High to Low</option>
        </select>
      </div>

      {/* Product Grid */}
      <div className="px-6 md:px-12 pb-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {arrivals.length > 0 ? (
          arrivals.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden group"
            >
              <div className="relative">
                <div className="w-full h-[260px] relative group">
                   <img
                  src={item.images?.[0]}
                  alt={item.title}
                  className="w-full h-full absolute z-0 inset-0 object-cover group-hover:scale-105 transition duration-300"
                />
                 <NavLink to={`/products/${item._id}`}><button className="absolute bottom-0 hidden group-hover:block   z-10 bg-gray-600 h-8 w-full">Quick Buy</button></NavLink>
                </div>
               
               
                <span className="absolute top-3 left-3 bg-black text-white text-xs px-2 py-1 rounded-md">
                  NEW
                </span>
                <MdOutlineFavorite onClick={(e)=>wishlistHandler(e,item._id)} className={`absolute top-3 right-3 h-6 w-6 cursor-pointer ${
    wishListData?.some((wish) => wish.productId?._id === item._id)
      ? "text-red-700"
      : "text-gray-200"
  }`} />
                
              </div>
              <div className="p-4">
                <h3 className="text-sm font-semibold truncate">{item.title}</h3>
                <p className="text-xs text-gray-500 mt-1">
                  {item.brand} • {item.category}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-lg font-bold">₹{item.price}</span>
                  {item.discount > 0 && (
                    <>
                      <span className="text-sm text-gray-400 line-through">
                        ₹{item.oprice}
                      </span>
                      <span className="text-xs text-green-600 font-semibold">
                        {item.discount}% OFF
                      </span>
                    </>
                  )}
                </div>
                <p
                  className={`text-xs mt-1 ${
                    item.inStock ? "text-green-600" : "text-red-500"
                  }`}
                >
                  {item.inStock ? "In Stock" : "Out of Stock"}
                </p>
              
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full mt-20">
            No products found
          </p>
        )}
      </div>
    </div>
  );
};

export default Arrivals;
