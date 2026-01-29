import mongoose from "mongoose";

const CartSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    size: {
      type: Number,   // UK size
      required: true
    },
    color: {
      type: String,
      required: true,
      trim: true,
      lowercase: true
    },
    price: {
      type: Number,   // 👈 FINAL discounted price (snapshot)
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      min: 1
    }
  },
  {
    timestamps: true
  }
);

// 🔥 Duplicate item avoid
CartSchema.index(
  { userId: 1, productId: 1, size: 1, color: 1 },
  { unique: true }
);

const CartModel =
  mongoose.models.Cart || mongoose.model("Cart", CartSchema, "carts");

export default CartModel;