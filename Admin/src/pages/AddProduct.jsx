import React, { useState } from "react";
import {toast} from 'react-hot-toast';
import {useSelector,useDispatch} from 'react-redux'
import { addProduct } from "../react_redux/slices/productSLice";
import {clearProductMessages} from '../react_redux/slices/productSLice'

import { useEffect } from "react";
const AddProduct = () => {
  const dispatch = useDispatch();
  const { loading, error, successMsg } = useSelector((state) => state.product);

  const [addData, setAddData] = useState({
    image1: null,
    image2: null,
    image3: null,
    image4: null,

    title: "",
    description: "",
    price: "",
    oprice: "",
    discount: "",
    stock: "",

    brand: "",
    category: "",
    subCategory: "",

    sizes: [],
    colors: [],

    isFeature: false,
    bestSellar: false,
    isNewArrival: false,
    isTrending: false,
    isActive: true,
  });

  // destructure
  const {
    image1,
    image2,
    image3,
    image4,
    title,
    description,
    price,
    oprice,
    discount,
    stock,
    brand,
    category,
    subCategory,
    sizes,
    colors,
  } = addData;

  // ---------------- handlers ----------------

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setAddData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageChange = (e, key) => {
    const file = e.target.files[0];
    if (!file) return;
    setAddData((prev) => ({ ...prev, [key]: file }));
  };

  const removeImage = (key) => {
    setAddData((prev) => ({ ...prev, [key]: null }));
  };

  const toggleArray = (key, value) => {
    setAddData((prev) => ({
      ...prev,
      [key]: prev[key].includes(value)
        ? prev[key].filter((v) => v !== value)
        : [...prev[key], value],
    }));
  };

  // ---------------- submit ----------------

  const submitHandler = (e) => {
     e.preventDefault();
   try{
    // image validation
    if (![image1, image2, image3, image4].some(Boolean)) {
      toast.error("Upload at least one image");
      return;
    }

    // unified validation
    const fields = {
      title: { value: title, type: "string" },
      description: { value: description, type: "string" },
      brand: { value: brand, type: "string" },
      category: { value: category, type: "string" },
      subCategory: { value: subCategory, type: "string" },
      price: { value: price, type: "number" },
      oPrice: { value: oprice, type: "number" },
      discount: { value: discount, type: "number" },
      stock: { value: stock, type: "number" },
      sizes: { value: sizes, type: "array" },
      colors: { value: colors, type: "array" },
    };

    for (let key in fields) {
      const { value, type } = fields[key];

      if (type === "string" && (!value || value.trim() === "")) {
        toast.error(`Enter ${key}`);
        return;
      }

      if (type === "number" && (value === "" || isNaN(value))) {
        toast.error(`Enter valid ${key}`);
        return;
      }

      if (type === "array" && value.length === 0) {
        toast.error(`Select ${key}`);
        return;
      }
    }

    // FormData
    const formData = new FormData();

    [image1, image2, image3, image4].forEach((img) => {
      if (img) formData.append("images", img);
    });

    formData.append("title", title);
    formData.append("description", description);
    formData.append("brand", brand);
    formData.append("category", category);
    formData.append("subCategory", subCategory);
    formData.append("price", price);
    formData.append("oprice", oprice);
    formData.append("discount", discount);
    formData.append("stock", stock);

    formData.append("sizes", JSON.stringify(sizes));
    formData.append("colors", JSON.stringify(colors));

    formData.append("isFeature", addData.isFeature);
    formData.append("bestSellar", addData.bestSellar);
    formData.append("isNewArrival", addData.isNewArrival);
    formData.append("isTrending", addData.isTrending);
    formData.append("isActive", addData.isActive);

    dispatch(addProduct(formData));
   }catch(e){
    toast.error(e)
   }finally{
    setAddData({
       image1: null,
    image2: null,
    image3: null,
    image4: null,

    title: "",
    description: "",
    price: "",
    oprice: "",
    discount: "",
    stock: "",

    brand: "",
    category: "",
    subCategory: "",

    sizes: [],
    colors: [],

    isFeature: false,
    bestSellar: false,
    isNewArrival: false,
    isTrending: false,
    isActive: true,
    })
   }
  };

  // ---------------- effects ----------------

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearProductMessages());
    }
    if (successMsg) {
      toast.success(successMsg);
      dispatch(clearProductMessages());
    }
  }, [error, successMsg, dispatch]);

  // ---------------- UI ----------------
  return (
    <div className="py-6 flex justify-center bg-gray-100">
      <form onSubmit={submitHandler} className="bg-white p-6 rounded-lg shadow space-y-5 w-full max-w-2xl">

        {/* Images */}
        <div>
          <p className="font-medium">Product Images</p>
          <div className="flex gap-3 mt-2 flex-wrap">
            {[1, 2, 3, 4].map((i) => {
              const key = `image${i}`;
              return (
                <div key={key} className="relative w-24 h-24">
                  <label className="w-full h-full border rounded flex items-center justify-center cursor-pointer overflow-hidden">
                    <input
                      type="file"
                      hidden
                      accept="image/*"
                      onChange={(e) => handleImageChange(e, key)}
                    />
                    {addData[key] ? (
                      <img
                        src={URL.createObjectURL(addData[key])}
                        className="w-full h-full object-cover"
                        alt="preview"
                      />
                    ) : (
                      <span className="text-xs text-gray-400">Upload</span>
                    )}
                  </label>

                  {addData[key] && (
                    <button
                      type="button"
                      onClick={() => removeImage(key)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 text-xs"
                    >
                      ✕
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Title */}
        <input
          name="title"
          value={addData.title}
          onChange={handleChange}
          placeholder="Product Name"
          className="w-full border px-3 py-2 rounded"
        />

        {/* Description */}
        <textarea
          name="description"
          value={addData.description}
          onChange={handleChange}
          placeholder="Description"
          rows={3}
          className="w-full border px-3 py-2 rounded"
        />

        {/* Brand / Category */}
        <div className="flex gap-3">
          {/* <input
            name="brand"
            value={addData.brand}
            onChange={handleChange}
            placeholder="Brand"
            className="w-full border px-3 py-2 rounded"
          /> */}
            {/* sub Ctaegory here */}
        <select
            name="brand"
            value={addData.brand}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="">Brand</option>
            {
               ['Nike','Puma','Campus'].map((item,idx)=>( <option key={idx} value={item}>{item}</option>))
            }
           
           
          </select>
          <select
            name="category"
            value={addData.category}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="">Category</option>
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>

        {/* sub Ctaegory here */}
        <select
            name="subCategory"
            value={addData.subCategory}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="">Sub Category</option>
            {
               ['Sports','Running','Sneakers','Sandals'].map((item,idx)=>( <option key={idx} value={item}>{item}</option>))
            }
           
           
          </select>

        {/* Price */}
        <div className="flex gap-3">
          <input type="number" name="price" value={addData.price} onChange={handleChange} placeholder="Price" className="w-full border px-3 py-2 rounded"/>
          <input type="number" name="oprice" value={addData.oprice} onChange={handleChange} placeholder="Offer Price" className="w-full border px-3 py-2 rounded"/>
        </div>

        {/* discount here */}
          <div>
          <input type="text" value={addData.discount} name="discount" onChange={handleChange} placeholder="Enter Discount" className="w-full border px-3 py-2 rounded"/>
         
        </div>


        {/* Stock */}
        <div>
          <input type="text" value={addData.stock} name="stock" onChange={handleChange} placeholder="Stock" className="w-full border px-3 py-2 rounded"/>
          {/* {!addData.inStock && <p className="text-red-500 text-sm">Out of Stock</p>} */}
        </div>

        {/* Sizes */}
        <div>
          <p className="font-medium">Sizes</p>
          <div className="flex gap-2 flex-wrap">
            {[6,7,8,9,10].map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => toggleArray("sizes", s)}
                className={`px-3 py-1 border rounded ${
                  addData.sizes.includes(s) ? "!bg-indigo-500 text-white" : ""
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Colors */}
        <div>
          <p className="font-medium">Colors</p>
          <div className="flex gap-2 flex-wrap">
            {["Black", "White", "Red",'Brown','Grey'].map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => toggleArray("colors", c)}
                className={`px-3 py-1 border rounded ${
                  addData.colors.includes(c) ? "!bg-indigo-500 text-white" : ""
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Flags */}
        <div className="grid grid-cols-2 gap-3">
          {[
            ["isFeature","Featured"],
            ["bestSellar","Best Seller"],
            ["isNewArrival","New Arrival"],
            ["isTrending","Trending"],
            ["isActive","Active"],
          ].map(([key,label]) => (
            <label key={key} className="flex gap-2 items-center">
              <input
                type="checkbox"
                name={key}
                checked={addData[key]}
                onChange={handleChange}
              />
              {label}
            </label>
          ))}
        </div>

        <button className="w-full bg-indigo-500 text-white py-2 rounded">
         {loading ? 'Adding product ....':"Add Product"}
        </button>

      </form>
    </div>
  );
};

export default AddProduct;


// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { toast } from "react-hot-toast";
// import { addProduct, clearProductMessages } from "../react_redux/slices/productSLice";



// const AddProduct = () => {
//   const dispatch = useDispatch();
//   const { loading, error, successMsg } = useSelector((state) => state.product);

//   const [addData, setAddData] = useState({
//     image1: null,
//     image2: null,
//     image3: null,
//     image4: null,

//     title: "",
//     description: "",
//     price: "",
//     oprice: "",
//     discount: "",
//     stock: "",

//     brand: "",
//     category: "",
//     subCategory: "",

//     sizes: [],
//     colors: [],

//     isFeature: false,
//     bestSellar: false,
//     isNewArrival: false,
//     isTrending: false,
//     isActive: true,
//   });

//   // destructure
//   const {
//     image1,
//     image2,
//     image3,
//     image4,
//     title,
//     description,
//     price,
//     oprice,
//     discount,
//     stock,
//     brand,
//     category,
//     subCategory,
//     sizes,
//     colors,
//   } = addData;

//   // ---------------- handlers ----------------

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setAddData((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//   };

//   const handleImageChange = (e, key) => {
//     const file = e.target.files[0];
//     if (!file) return;
//     setAddData((prev) => ({ ...prev, [key]: file }));
//   };

//   const removeImage = (key) => {
//     setAddData((prev) => ({ ...prev, [key]: null }));
//   };

//   const toggleArray = (key, value) => {
//     setAddData((prev) => ({
//       ...prev,
//       [key]: prev[key].includes(value)
//         ? prev[key].filter((v) => v !== value)
//         : [...prev[key], value],
//     }));
//   };

//   // ---------------- submit ----------------

//   const submitHandler = (e) => {
//     e.preventDefault();

//     // image validation
//     if (![image1, image2, image3, image4].some(Boolean)) {
//       toast.error("Upload at least one image");
//       return;
//     }

//     // unified validation
//     const fields = {
//       title: { value: title, type: "string" },
//       description: { value: description, type: "string" },
//       brand: { value: brand, type: "string" },
//       category: { value: category, type: "string" },
//       subCategory: { value: subCategory, type: "string" },
//       price: { value: price, type: "number" },
//       oPrice: { value: oprice, type: "number" },
//       discount: { value: discount, type: "number" },
//       stock: { value: stock, type: "number" },
//       sizes: { value: sizes, type: "array" },
//       colors: { value: colors, type: "array" },
//     };

//     for (let key in fields) {
//       const { value, type } = fields[key];

//       if (type === "string" && (!value || value.trim() === "")) {
//         toast.error(`Enter ${key}`);
//         return;
//       }

//       if (type === "number" && (value === "" || isNaN(value))) {
//         toast.error(`Enter valid ${key}`);
//         return;
//       }

//       if (type === "array" && value.length === 0) {
//         toast.error(`Select ${key}`);
//         return;
//       }
//     }

//     // FormData
//     const formData = new FormData();

//     [image1, image2, image3, image4].forEach((img) => {
//       if (img) formData.append("images", img);
//     });

//     formData.append("title", title);
//     formData.append("description", description);
//     formData.append("brand", brand);
//     formData.append("category", category);
//     formData.append("subCategory", subCategory);
//     formData.append("price", price);
//     formData.append("oprice", oprice);
//     formData.append("discount", discount);
//     formData.append("stock", stock);

//     formData.append("sizes", JSON.stringify(sizes));
//     formData.append("colors", JSON.stringify(colors));

//     formData.append("isFeature", addData.isFeature);
//     formData.append("bestSellar", addData.bestSellar);
//     formData.append("isNewArrival", addData.isNewArrival);
//     formData.append("isTrending", addData.isTrending);
//     formData.append("isActive", addData.isActive);

//     dispatch(addProduct(formData));
//   };

//   // ---------------- effects ----------------

//   useEffect(() => {
//     if (error) {
//       toast.error(error);
//       dispatch(clearProductMessages());
//     }
//     if (successMsg) {
//       toast.success(successMsg);
//       dispatch(clearProductMessages());
//     }
//   }, [error, successMsg, dispatch]);

//   // ---------------- UI ----------------

//   return (
//     <div className="py-6 flex justify-center bg-gray-100">
//       <form
//         onSubmit={submitHandler}
//         className="bg-white p-6 rounded-lg shadow space-y-5 w-full max-w-2xl"
//       >
//         {/* Images */}
//         <div>
//           <p className="font-medium">Product Images</p>
//           <div className="flex gap-3 mt-2 flex-wrap">
//             {[1, 2, 3, 4].map((i) => {
//               const key = `image${i}`;
//               return (
//                 <label
//                   key={key}
//                   className="w-24 h-24 border rounded flex items-center justify-center cursor-pointer overflow-hidden"
//                 >
//                   <input
//                     type="file"
//                     hidden
//                     accept="image/*"
//                     onChange={(e) => handleImageChange(e, key)}
//                   />
//                   {addData[key] ? (
//                     <img
//                       src={URL.createObjectURL(addData[key])}
//                       className="w-full h-full object-cover"
//                       alt=""
//                     />
//                   ) : (
//                     <span className="text-xs text-gray-400">Upload</span>
//                   )}
//                 </label>
//               );
//             })}
//           </div>
//         </div>

//         <input name="title" value={title} onChange={handleChange} placeholder="Product Name" className="input" />
//         <textarea name="description" value={description} onChange={handleChange} placeholder="Description" rows={3} className="input" />

//         <input name="brand" value={brand} onChange={handleChange} placeholder="Brand" className="input" />

//         <select name="category" value={category} onChange={handleChange} className="input">
//           <option value="">Category</option>
//           <option value="Men">Men</option>
//           <option value="Women">Women</option>
//           <option value="Kids">Kids</option>
//         </select>

//         <select name="subCategory" value={subCategory} onChange={handleChange} className="input">
//           <option value="">Sub Category</option>
//           {["Sports","Running","Casual","Formal","Sneakers","Boots"].map((c) => (
//             <option key={c} value={c}>{c}</option>
//           ))}
//         </select>

//         <div className="flex gap-3">
//           <input type="number" name="price" value={price} onChange={handleChange} placeholder="Price" className="input" />
//           <input type="number" name="oPrice" value={oprice} onChange={handleChange} placeholder="Offer Price" className="input" />
//         </div>

//         <input type="number" name="discount" value={discount} onChange={handleChange} placeholder="Discount" className="input" />
//         <input type="number" name="stock" value={stock} onChange={handleChange} placeholder="Stock" className="input" />

//         {/* Sizes */}
//         <div>
//           <p>Sizes</p>
//           {[6,7,8,9,10].map((s) => (
//             <button key={s} type="button" onClick={() => toggleArray("sizes", s)}
//               className={`px-3 py-1 border rounded ${sizes.includes(s) ? "bg-indigo-500 text-white" : ""}`}>
//               {s}
//             </button>
//           ))}
//         </div>

//         {/* Colors */}
//         <div>
//           <p>Colors</p>
//           {["Black","White","Red","Brown","Grey"].map((c) => (
//             <button key={c} type="button" onClick={() => toggleArray("colors", c)}
//               className={`px-3 py-1 border rounded ${colors.includes(c) ? "bg-indigo-500 text-white" : ""}`}>
//               {c}
//             </button>
//           ))}
//         </div>

//         <button disabled={loading} className="w-full bg-indigo-600 text-white py-2 rounded">
//           {loading ? "Adding..." : "Add Product"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AddProduct;
