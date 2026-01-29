import React, { useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";

import { FiMinus } from "react-icons/fi";
import { MdAdd } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";

import { NavLink, useNavigate } from "react-router-dom";
import { removeCart } from "../redux-store/slices/cartSlice";
const Cart = () => {
  const dispatch = useDispatch();
  const { loading, cartData } = useSelector(
    (state) => state.cart
  );
  const removeCartHandler = (id)=>{
    dispatch(removeCart(id));
    
  }
  const navigate = useNavigate();
  const handlerGoCheckOut = ()=>{
    navigate("/checkout",{
      state:{
        source:"Cart"
      }
    })
  }

  

  /* Normalize Cart Data (Optimized) */
 
  
  const data = useMemo(
    () =>
      cartData?.map((item) => ({
        cId: item?._id,
        price: item?.price,
        quantity: item?.quantity,
        color: item?.color,
        size: item?.size,
        pId:item?.productId?._id,
        image: item?.productId?.images?.[0],
        title: item?.productId?.title,
        brand: item?.productId?.brand,
        category: item?.productId?.category,
        subCategory: item?.productId?.subCategory,
      })) || [],
    [cartData]
  );
  /* Total Price */
  const totalPrice = useMemo(
    () => data.reduce((acc, item) => acc + item.price * item.quantity, 0),
    [data]
  );



  /* Loading */
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="loader" />
      </div>
    );
  }

  /* Empty Cart */
  if (!cartData || cartData.length === 0) {
    return (
      <div className="h-screen flex flex-col items-center justify-center gap-4">
        <h3 className="font-bold text-xl">Shopping Cart</h3>
        <p className="text-gray-500 font-medium">Your cart is currently empty.</p>
        <NavLink to="/" className="text-red-400 font-semibold">
          Continue Shopping
        </NavLink>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen px-2 md:px-6 py-4 flex flex-col gap-6">
      {/* Cart Items */}
      {data.map((item) => (
        <div
          key={item.cId}
          className="flex flex-col md:flex-row justify-between items-center gap-4 border-t-2 border-gray-300 pt-4"
        >
          {/* Left */}
          <div className="flex gap-4 items-center w-full md:w-1/2">
            <NavLink to={`/products/${item.pId}`}>
              <img
              src={item.image}
              alt={item.title}
              className="w-28  h-24 object-cover rounded"
            />
                </NavLink>
            <div className="flex flex-col gap-1">
             <NavLink to={`/products/${item.pId}`}> <h4 className="text-red-600 font-medium">{item.title}</h4></NavLink>
              <p className="text-sm text-gray-500">
                {item.color} / {item.size}
              </p>
              <p className="text-sm text-green-600">
                {item.brand} / {item.category} / {item.subCategory}
              </p>
            </div>
          </div>

          {/* Right */}
          <div className="flex flex-col md:flex-row items-center gap-6">
            <h4 className="font-semibold text-gray-600">
              Rs. {item.price}.00
            </h4>

            {/* Quantity */}
            <div className="flex items-center border-2 border-gray-400 rounded px-2 py-1 gap-3">
              <button className="text-red-400">
                <FiMinus />
              </button>
              <span className="font-semibold">{item.quantity}</span>
              <button className="text-red-400">
                <MdAdd />
              </button>
            </div>

            {/* Remove */}
            <button onClick={()=>removeCartHandler(item.cId)} className="flex items-center gap-1 text-red-400 font-medium">
              Remove <RxCross2 />
            </button>

            {/* Item Total */}
            <h4 className="font-semibold text-gray-600">
              Rs. {(item.price * item.quantity).toFixed(2)}
            </h4>
          </div>
        </div>
      ))}

      {/* Subtotal */}
      <div className="flex justify-end border-t-2 border-gray-300 pt-4">
        <div className="w-full md:w-96 flex flex-col gap-2">
          <h2 className="font-bold text-lg">
            SubTotal : Rs. {totalPrice.toFixed(2)}
          </h2>
          <p className="text-sm">
            Tax included.{" "}
            <span className="text-red-400">Shipping</span> calculated at checkout.
          </p>
          <button onClick={handlerGoCheckOut} className="bg-black text-white py-2 font-bold text-lg">
            CheckOut
          </button>
          <NavLink to="/" className="text-red-400 font-medium">
            Continue Shopping
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Cart;

