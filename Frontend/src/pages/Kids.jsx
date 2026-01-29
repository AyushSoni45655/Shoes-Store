import React, { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa";

// 🔹 Shimmer Bubble Card (Kids style)
const KidsShimmer = () => (
  <div className="animate-pulse bg-white rounded-3xl p-3 shadow-sm">
    <div className="h-40 bg-gray-200 rounded-2xl" />
    <div className="mt-3 h-3 bg-gray-200 rounded w-3/4" />
    <div className="mt-2 h-3 bg-gray-200 rounded w-1/2" />
    <div className="mt-3 h-6 bg-gray-200 rounded-full w-24" />
  </div>
);

const Kids = () => {
  const brands = ["All", "Nike", "Puma", "Campus"];
  const navigate = useNavigate();
  const [activeBrand, setActiveBrand] = useState("All");
  const { data, loading } = useSelector((state) => state.product);
  

  // 🔹 Kids filter logic
  const kidsData = useMemo(() => {
    if (activeBrand === "All") {
      return data?.filter((item) => item.category === "Kids") || [];
    }

    return (
      data?.filter(
        (item) =>
          item.category === "Kids" &&
          item.brand?.toLowerCase() === activeBrand.toLowerCase()
      ) || []
    );
  }, [data, activeBrand]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-yellow-50 to-blue-50 px-4 sm:px-6 lg:px-10 py-6">
      {/* Header */}
      {/* Brand Filter */}
      <div className="flex justify-center gap-3 flex-wrap mb-6">
        {brands.map((brand) => (
          <button
            key={brand}
            onClick={() => setActiveBrand(brand)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
              activeBrand === brand
                ? "bg-purple-600 text-white"
                : "bg-white text-gray-700 hover:bg-purple-100"
            }`}
          >
            {brand}
          </button>
        ))}
      </div>

      <div className="text-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-purple-700">
          Kids Zone 🎈
        </h1>
        <p className="text-gray-600 mt-2">
          Fun, colorful & comfy styles for kids
        </p>
      </div>

      {/* Age Group Filter */}
      

      {/* Products Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {loading
          ? Array.from({ length: 10 }).map((_, i) => <KidsShimmer key={i} />)
          : kidsData.length === 0
          ? (
            <div className="col-span-full text-center text-gray-500 text-lg mt-10">
              No kids products found 🧸
            </div>
          )
          : kidsData.map((item) => (
              <div
                key={item._id}
                onClick={() => navigate(`/products/${item._id}`)}
                className="group bg-white rounded-3xl p-3 shadow-md hover:shadow-xl transition cursor-pointer"
              >
                {/* Image */}
                <div className="relative h-40 rounded-2xl overflow-hidden">
                  <img
                    src={item.images?.[0]}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition"
                  />

                  {/* Buy Now Button */}
                  <NavLink to={`/products/${item._id}`}><button
                    className="absolute bottom-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-purple-600 text-white text-sm px-4 py-1.5 rounded-full shadow transition"
                  >
                    Buy Now
                  </button></NavLink>
                </div>

                {/* Info */}
                <div className="mt-3">
                  <h2 className="text-sm font-semibold text-gray-800 truncate">
                    {item.title}
                  </h2>

                  {/* Rating */}
                  <div className="flex items-center gap-1 mt-1">
                    <FaStar className="text-yellow-400 text-xs" />
                    <span className="text-xs text-gray-600">4.5</span>
                  </div>

                  <div className="flex items-center justify-between mt-2">
                    <span className="text-base font-bold text-purple-600">
                      ₹{item.price}
                    </span>
                    <span className="text-xs bg-purple-100 text-purple-700 px-3 py-1 rounded-full">
                      New
                    </span>
                  </div>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};

export default Kids;
