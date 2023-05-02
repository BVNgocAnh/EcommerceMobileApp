import express from "express";
import {
  verifyToken,
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
} from "../controllers/verifyToken.controller.js";
import { Cart } from "../models/Cart.model.js";
import { Order } from "../models/Order.model.js";
import { Customer } from "../models/Customer.model.js";
import { Product } from "../models/Product.model.js";
import asyncHandler from "express-async-handler";
import { isValidObjectId } from "mongoose";
const router = express.Router();
//Create Cart
router.post("/", verifyToken, async (req, res) => {
  const newCart = new Cart(req.body);
  try {
    const savedCart = await newCart.save();
    res.status(200).json(savedCart);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/user-cart", async (req, res) => {
  const cart = await Cart(req.body);
  const idCus = await Customer(req.params.id);
  isValidObjectId(idCus);
  try {
    let products = [];
    const customer = await Customer.findById(req.params.id);
    const alreadyExist = await Cart.findOne({ orderby: req.params.idCus });
    if (alreadyExist) {
      alreadyExist.remove();
    }

    for (let i = 0; i < cart; i++) {
      let object = {};
      object.product = cart[i].id;
      object.quantity = cart[i].quantity;
      let getPrice = await Product.findById(cart[i].customer)
        .select("price")
        .exec();
      object.price = getPrice.price;
      products.push(object);
    }
    // console.log(products);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

//Updata Cart
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const updatedCart = await Cart.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedCart);
  } catch (error) {
    res.status(500).json(error);
  }
});

//Delete Cart
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.status(200).json("Cart has been deleted!");
  } catch (error) {
    res.status(500).json(error);
  }
});

//Get User Cart
router.get(
  "/find/:customerId",
  verifyTokenAndAuthorization,
  async (req, res) => {
    try {
      const cart = await Cart.findOne({ customerId: req.params.customerId });
      res.status(200).json(cart);
    } catch (error) {
      res.status(500).json(error);
    }
  }
);

//Get All Cart
router.get("/", verifyTokenAndAdmin, async (req, res) => {
  try {
    const carts = await Cart.find();
    res.status(200).json(carts);
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
