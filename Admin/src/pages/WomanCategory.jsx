import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import { deleteProduct } from "../react_redux/slices/productSLice";
import { clearProductMessages } from "../react_redux/slices/productSLice";
import {toast} from 'react-hot-toast'
const WomanCategory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
   
  const {data,loading,successMsg,error} = useSelector((state)=>state.product);
  
  const pHandle = ['None','Edit','Delete']
 const handleAction = (value,product)=>{
  if(value === 'Edit'){
    console.log('I am editing here',product.title);
    navigate(`/admin/category/${product.category.toLowerCase()}/edit/${product._id}`)
  }
  if(value === 'Delete'){
    const confirm = window.confirm('Are your sure you want to delete ',product.title);
    if(confirm){
      console.log('deleted product id is a :',product.title);
      const id = product._id;
      console.log('This is my local id',id);
      
      dispatch(deleteProduct({id:id}))
    }
   
  }
  
 }
  
 useEffect(()=>{
  if(error){
    toast.error(error)
    dispatch(clearProductMessages());
  }
  if(successMsg){
    toast.success(successMsg);
    dispatch(clearProductMessages())
  }
 },[error,dispatch,successMsg])
  

  const [brand, setBrand] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [search, setSearch] = useState("");

  const menProducts = data.filter(
    (item) =>
      item.category === "Women" &&
      (brand ? item.brand === brand : true) &&
      (subCategory ? item.subCategory === subCategory : true) &&
      item.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 bg-slate-100 min-h-screen">

      {/* 🔹 Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-slate-800">
          Men Shoes
        </h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
          + Add Shoe
        </button>
      </div>

      {/* 🔹 Filters */}
      <div className="bg-white p-4 rounded-xl shadow mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">

        <input
          type="text"
          placeholder="Search shoe..."
          className="border px-3 py-2 rounded-lg"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="border px-3 py-2 rounded-lg"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
        ><option value="">All Brands</option>
          {['Nike','Puma','Campus'].map((item,id)=>(<option key={id} value={item}>{item}</option>))}
          
          
        </select>

        <select
          className="border px-3 py-2 rounded-lg"
          value={subCategory}
          onChange={(e) => setSubCategory(e.target.value)}
        >
          <option value="">All SubCategories</option>
          {['Running','Sports','Sneakers','Sandals'].map((ietm,id)=>(<option key={id} value={ietm}>{ietm}</option>))}
         
        </select>

        <button
          onClick={() => {
            setBrand("");
            setSubCategory("");
            setSearch("");
          }}
          className="bg-slate-200 rounded-lg"
        >
          Clear
        </button>
      </div>

      {/* 🔹 Table */}
      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-slate-200 text-slate-700">
            <tr>
              <th className="p-3">Image</th>
              <th className="p-3">Name</th>
              <th className="p-3">Brand</th>
              <th className="p-3">SubCategory</th>
              <th className="p-3">Price</th>
              <th className="p-3">Feature</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {menProducts.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center p-6 text-slate-500">
                  No Men Shoes Found
                </td>
              </tr>
            )}

            {menProducts.map((item) => (
              <tr
                key={item._id}
                className="border-b hover:bg-slate-50"
              >
                <td className="p-3">
                  <img
                    src={item.images[0]}
                    alt={item.title}
                    className="w-14 h-14 rounded object-cover"
                  />
                </td>

                <td className="p-3 font-medium">{item.title}</td>
                <td className="p-3">{item.brand}</td>
                <td className="p-3">{item.subCategory}</td>
                <td className="p-3">₹{item.price}</td>

                <td className="p-3 space-x-1">
                  {item.isNewArrival && (
                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs">
                      New
                    </span>
                  )}
                  {item.bestSellar && (
                    <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded text-xs">
                      Best
                    </span>
                  )}
                  {item.isTrending && (
                    <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded text-xs">
                      Trending
                    </span>
                  )}
                </td>

                <td className="p-3 space-x-2">
                  {/* <button className="text-blue-600">Edit</button>
                  <button className="text-red-600">Delete</button> */}
                  <select onChange={(e)=>handleAction(e.target.value,item)} name="" id="" className="border-2 border-blue-400 rounded-md p-1">
                    {pHandle.map((item,id)=>(<option key={id}  value={item}>{item}</option>))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WomanCategory;
