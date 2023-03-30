import mongoose from "mongoose";

const CustomerSchema = new mongoose.Schema(
  {
    nameCus: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    sex: {
      type: String,
    },
    phoneCus: {
      type: String,
      required: true,
    },
    addressCus: {
      type: String,
      required: true,
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
