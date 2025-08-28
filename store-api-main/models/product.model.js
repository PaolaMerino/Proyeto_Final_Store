import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    price: {
      type: Number,
    },
    description: {
      type: String,
    },
    category: {
      type: [String],
    },
    imgSrc: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const Product = mongoose.model("Product", productSchema);
