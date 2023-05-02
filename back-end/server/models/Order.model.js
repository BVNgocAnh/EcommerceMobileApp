import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
    amount: { type: Number },
    address: { type: String },
    status: { type: String, default: "pending" },
    orderBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
    },
  },

  { timestamps: true }
);

export const Order = mongoose.model("Order", OrderSchema);

//   {
//     customerId: { type: String, required: true },
//     nameCus: { type: String, required: true },
//     products: [
//       {
//         productId: {
//           type: String,
//         },
//         quantity: {
//           type: Number,
//           default: 1,
//         },
//       },
//     ],
//     amount: { type: Number, required: true },
//     address: { type: Object, required: true },
//     status: { type: String, default: "pending" },
//   },
//   { timestamps: true }
// );
