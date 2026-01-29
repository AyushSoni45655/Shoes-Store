import Razorpay from "razorpay";
import crypto from "crypto";
import OrderModel from "../modal/order.modal.js";
import dotenv from 'dotenv';
import CartModel from "../modal/cart.modal.js";
dotenv.config();
// Razorpay instance
const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// ---------------- CREATE ORDER ----------------
const createOrder = async (req, res) => {

  try {
    
    console.log('My details',req.body);
    console.log('My userid',req.user);
    const userId = req.user?.id;
    const {
      orderId,
      products,
      orderFrom,
      paymentMethod,
      shippingAddress,
      totalAmount,
    } = req.body;

    if (!userId) return res.status(401).json({ success: false, msg: "Unauthorized" });
    if (!orderId || !orderFrom || !paymentMethod || isNaN(totalAmount))
      return res.status(400).json({ success: false, msg: "Invalid data" });
    if (!Array.isArray(products))
      return res.status(400).json({ success: false, msg: "Products must be array" });
    if (!shippingAddress || typeof shippingAddress !== "object")
      return res.status(400).json({ success: false, msg: "Invalid address" });

    // COD Order
    if (paymentMethod === "COD") {
      const order = await OrderModel.create({
        userId,
        orderId,
        products,
        orderFrom,
        paymentMethod,
        shippingAddress,
        totalAmount,
        paymentStatus: "PENDING",
        orderStatus: "PENDING",
      });

      return res.status(201).json({
        success: true,
        msg: "Order placed with COD",
        data: order,
      });
    }

    // Razorpay Order
    if (paymentMethod === "RAZORPAY") {
      const razorpayOrder = await razorpayInstance.orders.create({
        amount: totalAmount * 100, // paise
        currency: "INR",
        receipt: orderId,
      });

      const order = await OrderModel.create({
        userId,
        orderId,
        products,
        orderFrom,
        paymentMethod,
        shippingAddress,
        totalAmount,
        paymentStatus: "PENDING",
        orderStatus: "PENDING",
        paymentDetails: { razorpayOrderId: razorpayOrder.id },
      });
      await CartModel.deleteMany({userId})

      return res.status(200).json({
        success: true,
        msg: "Razorpay order created",
        data: {
          order,
          razorpayOrderId: razorpayOrder.id,
          key: process.env.RAZORPAY_KEY_ID,
          amount: razorpayOrder.amount,
          currency: razorpayOrder.currency,
        },
      });
    }

    return res.status(400).json({ success: false, msg: "Invalid payment method" });
  } catch (e) {
    return res.status(500).json({ success: false, msg: e.message });
  }
};

// ---------------- VERIFY RAZORPAY PAYMENT ----------------
const verifyRazorpayPayment = async (req, res) => {
  try {
    const { razorpayOrderId, razorpayPaymentId, razorpaySignature } = req.body;

    if (!razorpayOrderId || !razorpayPaymentId || !razorpaySignature)
      return res.status(400).json({ success: false, msg: "Missing payment data" });

    // Signature Verification
    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpayOrderId}|${razorpayPaymentId}`)
      .digest("hex");

    if (generatedSignature !== razorpaySignature)
      return res.status(400).json({ success: false, msg: "Invalid signature" });

    // Update order in DB
    const order = await OrderModel.findOneAndUpdate(
      { "paymentDetails.razorpayOrderId": razorpayOrderId },
      {
        $set: {
          "paymentDetails.razorpayPaymentId": razorpayPaymentId,
          "paymentDetails.razorpaySignature": razorpaySignature,
          paymentStatus: "PAID",
          orderStatus: "CONFIRMED",
        },
      },
      { new: true }
    );

    if (!order) return res.status(404).json({ success: false, msg: "Order not found" });

    return res.status(200).json({
      success: true,
      msg: "Payment verified successfully",
      data: order,
    });
  } catch (e) {
    return res.status(500).json({ success: false, msg: e.message });
  }
};

const getOrders = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({
        success: false,
        msg: "Login required"
      });
    }

    const userId = req.user.id;

    const orders = await OrderModel.find({ userId })
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      msg: orders.length ? "Orders found" : "No orders found",
      orders
    });

  } catch (e) {
    return res.status(500).json({
      success: false,
      msg: e.message
    });
  }
};

const getAdminOrders = async (req, res) => {
  try {
   console.log('admin payload',req.admin);
   

    const orders = await OrderModel.find().populate({
      path:"userId",
      select:'name email'
    })
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      msg: orders.length ? "Orders found" : "No orders found",
      orders,
      orderLength:orders.length
    });

  } catch (e) {
    return res.status(500).json({
      success: false,
      msg: e.message
    });
  }
};

const cancelOrder = async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) {
      return res.status(400).json({
        success: false,
        msg: 'Id is empty!!!'
      });
    }

    const order = await OrderModel.findById(id);

    if (!order) {
      return res.status(404).json({
        success: false,
        msg: 'Order not found'
      });
    }

    if (order.isCancelled) {
      return res.status(400).json({
        success: false,
        msg: 'Order is already cancelled'
      });
    }

    order.isCancelled = true;
    order.paymentStatus = 'PAID';
    order.orderStatus = 'CANCELLED'
    await order.save();

    return res.status(200).json({
      success: true,
      msg: 'Order is Cancelled',
      order 
    });

  } catch (e) {
    return res.status(500).json({
      success: false,
      msg: e.message
    });
  }
};


// soft delete order

const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        msg: "Order id is required",
      });
    }

    const order = await OrderModel.findById(id);

    if (!order) {
      return res.status(404).json({
        success: false,
        msg: "Order not found",
      });
    }

    if (order.isDeleted) {
      return res.status(400).json({
        success: false,
        msg: "Order already deleted",
      });
    }

    order.isDeleted = true;
    order.deletedBy = "admin";
    await order.save();

    return res.status(200).json({
      success: true,
      msg: "Order soft deleted successfully",
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: error.message,
    });
  }
};

const statusChager = async(req,res)=>{
  try{
     const {id,status} = req.body;
  if(!id || !status){
     return res.status(400).json({
      success: false,
      msg: 'Field are required',
    });
  }
  const order = await OrderModel.findById(id);
  if(!order){
     return res.status(400).json({
      success: false,
      msg: 'No Order Found',
    });
  }

    if (order.isDeleted) {
      return res.status(400).json({
        success: false,
        msg: "Deleted order cannot be updated",
      });
    }

    // ❌ Delivered / Cancelled lock
    if (
      order.orderStatus === "DELIVERED" ||
      order.orderStatus === "CANCELLED"
    ) {
      return res.status(400).json({
        success: false,
        msg: `Order already ${order.orderStatus}`,
      });
    }

    // ✅ Allowed status flow
    const allowedStatusFlow = {
      PENDING: ["CONFIRMED", "CANCELLED"],
      CONFIRMED: ["SHIPPED", "CANCELLED"],
      SHIPPED: ["DELIVERED"],
    };

    const currentStatus = order.orderStatus;

    if (!allowedStatusFlow[currentStatus]?.includes(status)) {
      return res.status(400).json({
        success: false,
        msg: `Invalid status change from ${currentStatus} to ${status}`,
      });
    }

    order.orderStatus = status;
    await order.save();

    return res.status(200).json({
      success: true,
      msg: "Order status updated successfully",
      orderStatus: order.orderStatus,
    });
  }catch(e){
     return res.status(500).json({
      success: false,
      msg: e.message,
    });
  }
 
}


export { createOrder, verifyRazorpayPayment,getOrders,getAdminOrders,cancelOrder,deleteOrder,statusChager};
