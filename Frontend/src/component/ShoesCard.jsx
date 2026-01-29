


import React from "react";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";

const ShoesCard = ({ data }) => {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
    >
      {/* IMAGE */}
      <div className="relative h-56 bg-gradient-to-br from-neutral-100 to-neutral-200 overflow-hidden">
        <img
          src={data.images?.[0]}
          alt={data.title}
          className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
        />

        {/* BRAND BADGE */}
        <span className="absolute top-3 left-3 bg-black text-white text-[11px] px-3 py-1 rounded-full uppercase tracking-wide">
          {data.brand}
        </span>

        {/* BUY NOW */}
        <NavLink to={`/products/${data._id}`}><button className="absolute bottom-0 left-0 w-full bg-black text-white py-3 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-all duration-300">
          Buy Now
        </button></NavLink>
      </div>

      {/* CONTENT */}
      <div className="p-4 space-y-2">
        <h3 className="text-sm font-semibold leading-snug line-clamp-2">
          {data.title}
        </h3>

        <p className="text-xs text-neutral-500">
          Men’s {data.subCategory || "Footwear"}
        </p>

        <div className="flex items-center justify-between pt-2">
          <span className="text-lg font-bold text-black">
            ₹{data.price}
          </span>

          <span className="text-xs text-green-600 font-medium">
            Free Delivery
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default ShoesCard;
