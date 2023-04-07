import mongoose from "mongoose";

const CartSchema = new mongoose.Schema(
  {
    customerID: { type: String, required: true },
    products: [
      {
        productID: {
          type: String,
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
  },
  { timestamps: true }
);

export const Cart = mongoose.model("Cart", CartSchema);
