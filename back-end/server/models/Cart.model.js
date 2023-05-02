import mongoose from "mongoose";

const CartSchema = new mongoose.Schema(
  {
    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        quantity: Number,
        price: Number,
      },
    ],
    cartTotal: Number,
    // totalAfterDiscount: Number,
    orderby: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
    },
  },
  {
    timestamps: true,
  }
);

export const Cart = mongoose.model("Cart", CartSchema);

// {
//   customerID: { type: String, required: true },
//   products: [
//     {
//       productID: {
//         type: String,
//       },
//       quantity: {
//         type: Number,
//         default: 1,
//       },
//     },
//   ],
// },
// { timestamps: true }
