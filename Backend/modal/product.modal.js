import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    images: {
      type: [String], // image URLs
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    oprice: {
      type: Number,
      required:true
    },

    discount: {
      type: Number,
      default: 0,
      required:true
    },

    isFeature: {
      type: Boolean,
      default: false,
    },

    bestSellar: {
      type: Boolean,
      default: false,
    },

    isNewArrival: {
      type: Boolean,
      default: false,
    },

    isTrending: {
      type: Boolean,
      default: false,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    brand: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    subCategory: {
      type: String,
      required:true
    },

    sizes: {
      type: [Number], // ["7","8","9"]
      default: [],
    },

    colors: {
      type: [String], // ["black","white"]
      default: [],
    },

    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },

    totalReviews: {
      type: Number,
      default: 0,
    },

    stock: {
      type: Number,
      required: true,
    },

    inStock: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const ProductModel =
  mongoose.models.Product ||
  mongoose.model("Product", ProductSchema, "products");

export default ProductModel;
