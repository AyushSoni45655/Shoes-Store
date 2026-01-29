



import React, { useState } from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { FunnelIcon } from "@heroicons/react/24/outline";
import ShoesCard from "../component/ShoesCard";


const categories = ["All", "Sports", "Running", "Sneakers", "Sandals"];
const brands = ["All", "Nike", "Puma", "Campus"];
const sizes = ["All", 6, 7, 8, 9, 10];


const Men = () => {
  const { data } = useSelector((state) => state.product);
  const manData = data.filter((item) => item.category === "Men");

  const [filters, setFilters] = useState({
    category: "All",
    brand: "All",
    size: "All",
 
  });

  const [sort, setSort] = useState("");

  const filteredData = manData
    .filter((p) => (filters.category !== "All" ? p.subCategory === filters.category : true))
    .filter((p) => (filters.brand !== "All" ? p.brand === filters.brand : true))

    .filter((p) => (filters.size !== "All" ? p.sizes?.includes(Number(filters.size)) : true))
    .sort((a, b) => {
      if (sort === "low") return a.price - b.price;
      if (sort === "high") return b.price - a.price;
      return 0;
    });

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 px-6 py-8">
      <div className="max-w-7xl mx-auto flex gap-8">

        {/* FILTER SIDEBAR */}
        <aside className="hidden lg:block w-72 bg-white rounded-2xl shadow-md p-6 sticky top-6 h-fit">
          <div className="flex items-center gap-2 mb-6">
            <FunnelIcon className="w-5 h-5" />
            <h2 className="text-xl font-semibold">Filters</h2>
          </div>

          {[{ title: "Category", data: categories, key: "category" },
            { title: "Brand", data: brands, key: "brand" },
            { title: "Size", data: sizes, key: "size" }
            ].map((section) => (
            <div key={section.key} className="mb-5">
              <p className="text-sm font-medium mb-2">{section.title}</p>
              <select
                className="w-full rounded-xl border border-neutral-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                value={filters[section.key]}
                onChange={(e) => setFilters({ ...filters, [section.key]: e.target.value })}
              >
                {section.data.map((item, i) => (
                  <option key={i} value={item}>{item}</option>
                ))}
              </select>
            </div>
          ))}
        </aside>

        {/* MAIN CONTENT */}
        <main className="flex-1">
          {/* HEADER */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Men’s Collection</h1>
              <p className="text-neutral-500 text-sm mt-1">Premium footwear curated for you</p>
            </div>

            <select
              className="w-56 rounded-xl border border-neutral-300 px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-black"
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="">Sort by</option>
              <option value="low">Price: Low to High</option>
              <option value="high">Price: High to Low</option>
            </select>
          </div>

          {/* PRODUCTS GRID */}
          {filteredData.length === 0 ? (
            <div className="text-center py-20 text-neutral-500">No products found</div>
          ) : (
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {filteredData.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <ShoesCard data={item} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Men;
