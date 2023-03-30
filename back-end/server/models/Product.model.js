import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    nameProduct: { type: String, required: true },
    desc: { type: String, required: true },
    image: { type: String },
    price: { type: Number, required: true },
    rating: { type: Number, default: "0" },
    weight: { type: String, require: true },
    category: { type: Array, required: true },
    inStock: { type: Number },
    quantity: { type: Number },
  },
  { timestamps: true }
);

export const Product = mongoose.model("Product", ProductSchema);
