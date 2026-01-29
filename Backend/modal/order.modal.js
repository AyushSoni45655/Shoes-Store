import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    orderId: { type: String, unique: true },

    products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        title: String,
        image: String,
        size: Number,
        color: String,
        quantity: Number,
        price: Number,
      },
    ],

    orderFrom: {
      type: String,
      enum: ["Cart", "Buy Now"],
      required: true,
    },

    paymentMethod: {
      type: String,
      enum: ["COD", "RAZORPAY"],
      default: "COD",
    },

    paymentStatus: {
      type: String,
      enum: ["PENDING", "PAID", "FAILED"],
      default: "PENDING",
    },

    orderStatus: {
      type: String,
      enum: [
        "PENDING",
        "CONFIRMED",
        "SHIPPED",
        "DELIVERED",
        "CANCELLED",
        "RETURNED",
      ],
      default: "PENDING",
    },

   shippingAddress: {
    firstName: { type: String, required: true },
    lastName: { type: String },
    email: { type: String, lowercase: true, trim: true, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    country: { type: String, required: true },
    state: { type: String, required: true },
    pincode: { type: String, required: true },
},


    paymentDetails: {
      razorpayOrderId: String,
      razorpayPaymentId: String,
      razorpaySignature: String,
    },

    isCancelled: { type: Boolean, default: false },
    cancelledAt: Date,

    isReturned: { type: Boolean, default: false },
    returnedAt: Date,

    isDeleted: { type: Boolean, default: false },
    deletedBy: {
      type: String,
      enum: ["admin", "super_admin"],
      default: null,
    },

    totalAmount: {
      type: Number,
      required: true,
      min:0
    },
  },
  { timestamps: true }
);

OrderSchema.index({ userId: 1 });
OrderSchema.index({ orderStatus: 1 });
OrderSchema.index({ createdAt: -1 });

const OrderModel =
  mongoose.models.Order || mongoose.model("Order", OrderSchema, "orders");

export default OrderModel;
