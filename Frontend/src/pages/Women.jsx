import React, { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

// 🔹 Shimmer Card
const ShimmerCard = () => (
  <div className="bg-white rounded-2xl shadow-sm overflow-hidden animate-pulse">
    <div className="h-52 sm:h-60 bg-gray-200" />
    <div className="p-4 space-y-3">
      <div className="h-4 bg-gray-200 rounded w-3/4" />
      <div className="h-3 bg-gray-200 rounded w-full" />
      <div className="flex justify-between items-center mt-4">
        <div className="h-5 w-20 bg-gray-200 rounded" />
        <div className="h-8 w-16 bg-gray-200 rounded" />
      </div>
    </div>
  </div>
);

const Women = () => {
  const navigate = useNavigate();
  const { data, loading } = useSelector((state) => state.product);
  const [sortBy, setSortBy] = useState("default");
  const [brand, setBrand] = useState("all");

  // 🔹 Filter + Sort Logic
  const womenData = useMemo(() => {
    let products = data?.filter((item) => item.category === "Women") || [];

    // Brand filter
    if (brand !== "all") {
      products = products.filter(
        (item) => item.brand?.toLowerCase() === brand
      );
    }

    // Price sort
    if (sortBy === "low") {
      products = [...products].sort((a, b) => a.price - b.price);
    }

    if (sortBy === "high") {
      products = [...products].sort((a, b) => b.price - a.price);
    }

    return products;
  }, [data, sortBy, brand]);

  return (
    <div className="min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-10 py-6">
      {/* Header */}
      <div className="mb-6 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">
            Women Collection
          </h1>
          <p className="text-gray-500 mt-1">
            Discover the latest fashion made for you
          </p>
        </div>

        {/* Sort Dropdown */}
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          {/* Brand Filter */}
          <select
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            className="w-full sm:w-44 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
          >
            <option value="all">All Brands</option>
            <option value="nike">Nike</option>
            <option value="puma">Puma</option>
            <option value="campus">Campus</option>
          </select>

          {/* Sort Dropdown */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full sm:w-48 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
          >
            <option value="default">Sort by</option>
            <option value="low">Price: Low to High</option>
            <option value="high">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
        {loading
          ? Array.from({ length: 10 }).map((_, i) => <ShimmerCard key={i} />)
          : womenData.length === 0
          ? (
            <div className="col-span-full text-center text-gray-500 text-lg mt-10">
              No products found
            </div>
          )
          : womenData.map((item) => (
              <div
                key={item._id}
                className="group bg-white rounded-2xl shadow-sm hover:shadow-lg transition overflow-hidden cursor-pointer"
              >
                {/* Image */}
                <div className="relative h-52 sm:h-60 overflow-hidden">
                  <img
                    src={item.images?.[0]}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    onClick={() => navigate(`/product/${item._id}`)}
                  />

                  <button className="absolute top-3 right-3 bg-white p-2 rounded-full shadow hover:scale-110 transition">
                    <FaHeart className="text-gray-400 hover:text-red-500" />
                  </button>
                </div>

                {/* Details */}
                <div className="p-4">
                  <h2 className="text-sm font-semibold text-gray-800 truncate">
                    {item.title}
                  </h2>
                  <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                    {item.description}
                  </p>

                  <div className="flex items-center justify-between mt-3">
                    <span className="text-lg font-bold text-pink-600">
                      ₹{item.price}
                    </span>
                    <button
                      onClick={() => navigate(`/product/${item._id}`)}
                      className="text-xs sm:text-sm bg-pink-600 text-white px-3 py-1.5 rounded-lg hover:bg-pink-700 transition"
                    >
                      View
                    </button>
                  </div>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};

export default Women;
