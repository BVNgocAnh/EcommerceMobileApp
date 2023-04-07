import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    nameProduct: { type: String, required: true },
    desc: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    weight: { type: String, require: true },
    category: { type: Array, required: true },
    inStock: { type: Boolean },
    // rating: { type: Number, default: "0" },
    quantity: { type: Number, default: 1 },
  },
  { timestamps: true }
);

export const Product = mongoose.model("Product", ProductSchema);
