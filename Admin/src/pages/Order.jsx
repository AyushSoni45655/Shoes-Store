import { MdOutlineDeleteForever } from "react-icons/md";

import { TbStatusChange } from "react-icons/tb";

import React, { useEffect, useMemo, useState } from "react";

import { FiSearch, FiMoreVertical } from "react-icons/fi";
import { deleteAOrders, getAOrders } from "../react_redux/slices/orderSlice";
import { clearOrderMsg } from "../react_redux/slices/orderSlice";
import { useDispatch,useSelector } from "react-redux";
import {toast} from 'react-hot-toast';
import { statusChanger } from "../react_redux/slices/orderSlice";
const Order = () => {
  const dispatch = useDispatch();
 
  const {oError,oSuccessMsg,oLoading} = useSelector((state)=>state.order);
  const { orderData } = useSelector((state) => state.order);
  const [search, setSearch] = useState("");
  useEffect(()=>{
    if(oError){
      toast.error(oError);
      dispatch(clearOrderMsg());
    }
    if(oSuccessMsg){
      toast.success(oSuccessMsg);
      dispatch(clearOrderMsg());
    }
  },[dispatch,oError,oSuccessMsg]);

  const filteredOrders = useMemo(() => {
    return orderData?.filter(
      (o) =>
        
        o.orderId.toLowerCase().includes(search.toLowerCase()) ||
        o.userId?.name.toLowerCase().includes(search.toLowerCase()) ||
        o.userId?.email.toLowerCase().includes(search.toLowerCase())
    );
  }, [orderData, search]);

  const statusColor = (status) => {
    if (status === "CONFIRMED") return "bg-green-100 text-green-700";
    if (status === "PENDING") return "bg-yellow-100 text-yellow-700";
    return "bg-red-100 text-red-700";
  };

  // status chager here
  const [cStatus, setcStatus] = useState('PENDING');
 
// delete soft order
const deleteHandler = (id)=>{
const success = window.confirm('Are You sure you want to delete this order!!!');
if(success){
  dispatch(deleteAOrders(id));
  dispatch(getAOrders())
}
}
const statusChagerHandler = (id,status)=>{
  if(id || status){
    dispatch(statusChanger({id,status}))
  }
}

const visibleOrders = filteredOrders.filter((order)=> !order.isDeleted)
  

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8fafc] to-[#eef2ff] p-6">

      {/* ===== Header ===== */}
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-4xl font-black text-gray-900 tracking-tight">
            Orders
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Monitor, manage & track all customer orders
          </p>
        </div>

        <div className="relative w-full md:w-80">
          <FiSearch className="absolute left-4 top-3 text-gray-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by order, user or email..."
            className="w-full pl-11 pr-4 py-2.5 rounded-xl bg-white shadow focus:ring-2 focus:ring-indigo-400 outline-none"
          />
        </div>
      </div>

      {/* ================= Desktop Table ================= */}
      <div className="hidden lg:block bg-white/70 backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden">
        <table className="w-full">
          <thead className="bg-indigo-600 text-white">
            <tr>
              <th className="p-4 text-left">Order</th>
              <th className="p-4 text-left">Customer</th>
              <th className="p-4 text-left">Payment</th>
              <th className="p-4 text-center">Status</th>
              <th className="p-4 text-right">Amount</th>
              <th className="p-4 text-center">Date</th>
              <th className="p-4 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {visibleOrders?.map((order) => 
              ( <tr
                key={order._id}
              
                className="border-b hover:bg-indigo-50 transition"
              >
                {/* Order ID */}
                <td className="p-4 font-semibold text-indigo-600">
                  {order.orderId}
                </td>

                {/* Customer */}
                <td className="p-4">
                  <p className="font-semibold">{order.userId?.name}</p>
                  <p className="text-xs text-gray-500">
                    {order.userId?.email}
                  </p>
                </td>

                {/* Payment */}
                <td className="p-4">
                  <span className="font-semibold">{order.paymentMethod}</span>
                  <p
                    className={`text-xs font-semibold ${
                      order.paymentStatus === "PAID"
                        ? "text-green-600"
                        : "text-orange-500"
                    }`}
                  >
                    {order.paymentStatus}
                  </p>
                </td>

                {/* Order Status */}
                <td className="p-4 text-center">
                  <span
                    className={`px-3 py-1 text-xs rounded-full font-bold ${statusColor(
                      order.orderStatus
                    )}`}
                  >
                    {order.orderStatus}
                  </span>
                </td>

                {/* Amount */}
                <td className="p-4 text-right font-bold">
                  ₹{order.totalAmount}
                </td>

                {/* Date */}
                <td className="p-4 text-center text-sm text-gray-500">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>

                {/* Action */}
                <td className="flex gap-4   p-2 items-center font-bold text-green-500  w-fit h-fit">
                  <MdOutlineDeleteForever onClick={()=>deleteHandler(order._id)} className="h-7 w-7 !text-red-400"/>
                  <div className="flex group relative ">
                     <TbStatusChange className="h-7 w-7 "/>
                  <select value={cStatus} onChange={(e)=>statusChagerHandler(order._id,e.target.value)}  className=" absolute  right-0 left-0 opacity-0 p-1 text-black border-2 rounded-md group-hover:opacity-100 " name="" id="">
                   {
                     ['PENDING','CONFIRMED','SHIPPED','DELIVERED','CANCELLED'].map((item,id)=>(<option key={id} value={item}>{item}</option>))
                   }
                  </select>
                  </div>
                 
                </td>
              </tr>)
            )}
          </tbody>
        </table>
      </div>

      {/* ================= Mobile Cards ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 lg:hidden">
        {filteredOrders?.map((order) => (
          <div
            key={order._id}
            className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg p-5 hover:scale-[1.02] transition"
          >
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-bold text-indigo-600">
                  {order.orderId}
                </h3>
                <p className="text-sm text-gray-500">
                  {order.userId?.name}
                </p>
              </div>

              <span
                className={`px-3 py-1 text-xs rounded-full font-bold ${statusColor(
                  order.orderStatus
                )}`}
              >
                {order.orderStatus}
              </span>
            </div>

            <p className="text-sm text-gray-600">
              💳 {order.paymentMethod} ({order.paymentStatus})
            </p>
            <p className="text-sm text-gray-600">
              💰 ₹{order.totalAmount}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              {new Date(order.createdAt).toLocaleDateString()}
            </p>

            <button className="mt-3 text-indigo-600 font-semibold text-sm">
              View Details →
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Order;
