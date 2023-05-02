import mongoose from "mongoose";

const CustomerSchema = new mongoose.Schema(
  {
    nameCus: {
      type: String,
    },
    image: {
      type: String,
    },
    sex: {
      type: String,
    },
    phoneCus: {
      type: String,
    },
    addressCus: {
      type: String,
    },
    emailCus: {
      type: String,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const Customer = mongoose.model("Customer", CustomerSchema);
