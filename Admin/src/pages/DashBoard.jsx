




import React from 'react'
import { useSelector } from 'react-redux'
import {
  AiOutlineProduct
} from "react-icons/ai";
import {
  FiShoppingCart,
  FiUsers
} from "react-icons/fi";
import { ImCancelCircle } from "react-icons/im";
import { RiMoneyRupeeCircleLine } from "react-icons/ri";
import { IoHourglassOutline } from "react-icons/io5";

const DashBoard = () => {

  const { data } = useSelector((state) => state.product);
  const { userLength } = useSelector((state) => state.user);
  const { oLength, orderData } = useSelector((state) => state.order);


  // Recent 6 Orders
  const recentOrder = [...orderData]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 6);

  const headerCard = [
    { name: "Products", icon: AiOutlineProduct, data: data?.length || 0 },
    { name: "Users", icon: FiUsers, data: userLength || 0 },
    { name: "Orders", icon: FiShoppingCart, data: oLength || 0 },
    { name: "Cancelled", icon: ImCancelCircle, data: orderData.filter(i => i.isCancelled).length },
    { name: "Pending", icon: IoHourglassOutline, data: orderData.filter(i => i.orderStatus === 'PENDING').length },
    {
      name: "Revenue",
      icon: RiMoneyRupeeCircleLine,
      data: orderData.reduce((acc, curr) => {
        if (curr.paymentStatus === 'PAID' && curr.orderStatus === 'CONFIRMED') {
          return acc + curr.totalAmount;
        }
        return acc;
      }, 0)
    }
  ];

  return (
    <div className="w-full min-h-screen bg-gray-50 p-6 space-y-8">

      {/* ================= STATS CARDS ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
        {headerCard.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm p-4 flex justify-between items-center hover:shadow-md transition"
            >
              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  {index === headerCard.length - 1 ? `₹${item.data}` : item.data}
                </h2>
                <p className="text-sm text-gray-500">{item.name}</p>
              </div>
              <Icon className="text-3xl text-pink-600" />
            </div>
          );
        })}
      </div>

      {/* ================= RECENT ORDERS ================= */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800">
            Recent Orders
          </h2>
          <button className="text-sm text-pink-600 hover:underline">
            View All
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500 border-b">
                <th className="py-2">#</th>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Payment</th>
                <th>Status</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {recentOrder.length === 0 ? (
                <tr>
                  <td colSpan="8" className="text-center py-6 text-gray-400">
                    No Recent Orders
                  </td>
                </tr>
              ) : (
                recentOrder.map((order, index) => (
                  <tr
                    key={order._id}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    <td className="py-3">{index + 1}</td>

                    <td className="font-medium">{order.orderId}</td>

                    <td>
                      <p className="font-medium">{order.userId?.name}</p>
                      <p className="text-xs text-gray-500">{order.userId?.email}</p>
                    </td>

                    <td>
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold
                        ${order.paymentStatus === 'PAID'
                          ? 'bg-green-100 text-green-600'
                          : 'bg-orange-100 text-orange-600'
                        }`}>
                        {order.paymentMethod}
                      </span>
                    </td>

                    <td>
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold
                        ${order.orderStatus === 'CONFIRMED'
                          ? 'bg-green-100 text-green-600'
                          : order.orderStatus === 'PENDING'
                          ? 'bg-orange-100 text-orange-600'
                          : 'bg-red-100 text-red-600'
                        }`}>
                        {order.orderStatus}
                      </span>
                    </td>

                    <td className="font-semibold">
                      ₹{order.totalAmount}
                    </td>

                    <td className="text-gray-500">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>

                    <td>
                      <button className="text-pink-600 hover:underline text-sm">
                        View
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default DashBoard;
