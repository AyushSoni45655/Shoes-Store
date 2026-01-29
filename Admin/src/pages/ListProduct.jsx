
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const ListProduct = () => {
  const { data } = useSelector((state) => state.product);

  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("ALL");
  const [brand, setBrand] = useState("ALL");
  const [sort, setSort] = useState("");

  useEffect(() => {
    let temp = [...data];

    if (category !== "ALL") {
      temp = temp.filter(
        (item) => item.category?.toLowerCase() === category.toLowerCase()
      );
    }

    if (brand !== "ALL") {
      temp = temp.filter(
        (item) => item.brand?.toLowerCase() === brand.toLowerCase()
      );
    }

    if (sort === "LOW_TO_HIGH") {
      temp.sort((a, b) => a.price - b.price);
    }

    if (sort === "HIGH_TO_LOW") {
      temp.sort((a, b) => b.price - a.price);
    }

    setProducts(temp);
  }, [data, category, brand, sort]);

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-6">
      <h1 className="text-3xl font-extrabold mb-6 tracking-wide">
        🛍️ Premium Shoes Collection
      </h1>

      <div className="flex gap-6">
        {/* ================= FILTER SIDEBAR ================= */}
        <aside className="w-64 bg-white rounded-xl shadow-lg p-5 z-1 sticky top-6 h-fit">
          <h3 className="text-xl font-bold mb-4">Filters</h3>

          {/* Category */}
          <div className="mb-4">
            <p className="font-semibold mb-2">Category</p>
            {["ALL", "Men", "Women", "Kids"].map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`block w-full text-left px-3 py-2 rounded-md mb-1 transition
                ${category === cat ? "bg-black text-white" : "hover:bg-gray-200"}`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Brand */}
          <div>
            <p className="font-semibold mb-2">Brand</p>
            {["ALL", "Nike", "Puma", "Campus"].map((br) => (
              <button
                key={br}
                onClick={() => setBrand(br)}
                className={`block w-full text-left px-3 py-2 rounded-md mb-1 transition
                ${brand === br ? "bg-black text-white" : "hover:bg-gray-200"}`}
              >
                {br}
              </button>
            ))}
          </div>
        </aside>

        {/* ================= PRODUCT SECTION ================= */}
        <section className="flex-1">
          {/* Top Sort Bar */}
          <div className="flex justify-between items-center mb-4">
            <p className="text-gray-600">
              Showing <b>{products.length}</b> Products
            </p>

            <select
              onChange={(e) => setSort(e.target.value)}
              className="px-4 py-2 rounded-lg shadow bg-white outline-none"
            >
              <option value="">Sort By Price</option>
              <option value="LOW_TO_HIGH">Low to High</option>
              <option value="HIGH_TO_LOW">High to Low</option>
            </select>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden group"
              >
                {/* Image */}
                <div className="h-56 bg-gray-100 overflow-hidden">
                  <img
                    src={item.images?.[0]}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                  />
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="font-bold text-lg truncate">{item.title}</h3>
                  <p className="text-sm text-gray-500">
                    {item.brand} • {item.category}
                  </p>

                  <div className="flex justify-between items-center mt-3">
                    <span className="text-xl font-extrabold text-black">
                      ₹{item.price}
                    </span>

                    {item.discount > 0 && (
                      <span className="text-green-600 text-sm font-semibold">
                        {item.discount}% OFF
                      </span>
                    )}
                  </div>

                  <button
                    className="mt-4 w-full bg-black text-white py-2 rounded-lg
                    hover:bg-gray-800 transition"
                  >
                    View Product
                  </button>
                </div>
              </div>
            ))}
          </div>

          {products.length === 0 && (
            <p className="text-center text-xl mt-10 text-gray-500">
              😔 No Products Found
            </p>
          )}
        </section>
      </div>
    </div>
  );
};

export default ListProduct;
