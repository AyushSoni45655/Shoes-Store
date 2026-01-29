




import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { getOrders, clearOrderMsg } from "../redux-store/slices/orderSlice";
import { cancelOrder } from "../redux-store/slices/orderSlice";
import { verifyOrders } from "../redux-store/slices/orderSlice";
const Orders = () => {
  const {user} = useSelector((state)=>state.user);
  const dispatch = useDispatch();
  const { error, successMsg, loading, orderData } = useSelector(
    (state) => state.order
  );

  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearOrderMsg());
    }
    if (successMsg) {
      toast.success(successMsg);
      dispatch(clearOrderMsg());
    }
  }, [error, successMsg, dispatch]);

  const handlePayNow = (order) => {
      if (!window.Razorpay) {
    alert("Razorpay SDK not loaded");
    return;
  }
    // 👉 Razorpay checkout open logic yaha aayega
    console.log("Pay Now for order:", order.orderId);
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID, // backend se aaya
      amount: (order?.totalAmount *100).toFixed(2),
      currency: 'INR',
      name: "StepZy Shoes Store",
      order_id: order?.paymentDetails?.razorpayOrderId,
       handler: async function (response) {
        console.log('my response',response);
        dispatch(verifyOrders({
           razorpayOrderId: response?.razorpay_order_id,
           razorpayPaymentId: response?.razorpay_payment_id,
           razorpaySignature: response?.razorpay_signature,
        }))   
    },
    prefill: {
        name: user?.name,
        email: user?.email,
        contact: user?.phone,
      },
      theme: { color: "#3399cc" },
  }
  const rzp = new window.Razorpay(options);
  rzp.on("payment.failed", function (response) {
  toast.error("Payment Failed");
  console.log(response.error);
});
  rzp.open()
}

const cancelOrderHandler = (order)=>{
  const success = window.confirm('Are you sure you want to delete this Order !!!');
  
  if(success){
  dispatch(cancelOrder({id:order._id}))
}
}



  // 🔹 Loading
  if (loading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <div className="animate-spin w-10 h-10 border-4 border-black border-t-transparent rounded-full"></div>
      </div>
    );
  }

  // 🔹 Empty
  if (!loading && orderData?.length === 0) {
    return (
      <div className="w-full min-h-screen flex flex-col items-center justify-center text-center">
        <h2 className="text-xl font-semibold text-gray-700">
          No Orders Found
        </h2>
        <p className="text-gray-500 mt-1">
          You haven’t placed any orders yet.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-10 py-6">
      <h1 className="text-2xl font-bold mb-6">My Orders</h1>

      <div className="space-y-6">
        {orderData.map((order) => (
          <div
            key={order._id}
            className="bg-white rounded-xl shadow-sm border p-4 sm:p-6"
          >
            {/* 🔹 Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <p className="text-sm text-gray-500">
                  Order ID:
                  <span className="ml-1 font-medium text-gray-800">
                    {order.orderId}
                  </span>
                </p>
                <p className="text-sm text-gray-500">
                  Placed on {new Date(order.createdAt).toDateString()}
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {/* Order Status */}
                <span
                  className={`px-3 py-1 text-xs rounded-full font-medium
                  ${
                    order.orderStatus === "DELIVERED"
                      ? "bg-green-100 text-green-700"
                      : order.orderStatus === "PENDING"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {order.orderStatus}
                </span>

                {/* Payment Method */}
                <span className="px-3 py-1 text-xs rounded-full bg-blue-100 text-blue-700 font-medium">
                  {order.paymentMethod}
                </span>

                {/* Payment Status */}
                <span
                  className={`px-3 py-1 text-xs rounded-full font-medium
                  ${
                    order.paymentStatus === "PAID"
                      ? "bg-green-100 text-green-700"
                      : order.paymentStatus === "FAILED"
                      ? "bg-red-100 text-red-600"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {order.paymentStatus}
                </span>
              </div>
            </div>

            {/* 🔹 Products */}
            <div className="mt-4 space-y-4">
              {order.products.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col sm:flex-row gap-4 border rounded-lg p-3"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full sm:w-24 h-28 sm:h-24 object-cover rounded-md"
                  />

                  <div className="flex-1">
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-sm text-gray-500">
                      Size: {item.size} | Qty: {item.quantity}
                    </p>
                  </div>

                  <p className="font-semibold text-right">
                    ₹{item.price}
                  </p>
                </div>
              ))}
            </div>

            {/* 🔹 Footer */}
            <div className="mt-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <p className="text-lg font-bold">
                Total: ₹{order.totalAmount.toFixed(2)}
              </p>

              <div className="flex gap-3 flex-wrap">
                <button className="px-4 py-2 text-sm border rounded-lg hover:bg-gray-100">
                  View Details
                </button>

                {/* ❌ COD → No Pay Now */}
                {order.paymentMethod === "RAZORPAY" && (
                  <>
                    {order.paymentStatus === "PAID" ? (
                      <button
                        disabled
                        className="px-4 py-2 text-sm bg-green-600 text-white rounded-lg cursor-not-allowed"
                      >
                        Paid
                      </button>
                    ) : (
                      <button
                        onClick={() => handlePayNow(order)}
                        className="px-4 py-2 text-sm bg-black text-white rounded-lg"
                      >
                        Pay Now
                      </button>
                    )}
                  </>
                )}

                {order.orderStatus === "PENDING" &&
                  !order.isCancelled && (
                    <button onClick={()=>cancelOrderHandler(order)} className="px-4 py-2 text-sm border border-red-500 text-red-600 rounded-lg hover:bg-red-50">
                      Cancel Order
                    </button>
                  )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
