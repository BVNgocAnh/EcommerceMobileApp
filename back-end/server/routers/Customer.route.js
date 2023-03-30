import express from "express";
import {
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
} from "../controllers/verifyToken.controller.js";
import { Customer } from "../models/Customer.model.js";
const router = express.Router();

router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
  if (req.body.password) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    req.body.password = hash;
  }

  try {
    const updatedCustomer = await Customer.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedCustomer);
  } catch (error) {
    res.status(500).json(error);
  }
});

//DELETE
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    await Customer.findByIdAndDelete(req.params.id);
    res.status(200).json("Customer has been deleted!");
  } catch (error) {
    res.status(500).json(error);
  }
});

//GET CUSTOMER
router.get("/find/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    const { password, ...others } = customer._doc;
    res.status(200).json(others);
  } catch (error) {
    res.status(500).json(error);
  }
});

//GET ALL CUSTOMER
router.get("/", async (req, res) => {
  const query = req.query.new;
  try {
    const customers = query
      ? await Customer.find().sort({ _id: -1 }).limit(5)
      : await Customer.find();
    res.status(200).json(customers);
  } catch (error) {
    res.status(500).json(error);
  }
});

//GET CUSTOMER STATS (Quantity customer on a month)

router.get("/stats", verifyTokenAndAdmin, async (req, res) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
  try {
    const data = await Customer.aggregate([
      { $match: { createdAt: { $gte: lastYear } } },
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
