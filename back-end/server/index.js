import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Customer from "./routers/Customer.route.js";
import Auth from "./routers/Auth.route.js";
import Product from "./routers/Product.route.js";
import Cart from "./routers/Cart.route.js";
import Order from "./routers/Order.route.js";
import testAPI from "./routers/testAPI.js";
import Stripe from "./routers/Stripe.js";

dotenv.config();

const app = express();
const URI = "mongodb://localhost:27017/NLCS";
const PORT = process.env.port || 3000;

app.use(express.json());

const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/server/customer", Customer);
// app.use("/server/auth", Auth);
app.use("/server/products", Product);
// app.use("/server/carts", Cart);
// app.use("/server/orders", Order);
// app.use("/server/testAPI", testAPI);
// app.use("/server/checkout", Stripe);
app.use("/", testAPI);

async function startServer() {
  mongoose
    .connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      console.log("Connected to DB");
      app.listen(PORT, () => {
        console.log(`Server running on ${PORT}`);
      });
    })
    .catch((err) => {
      console.log("err", err);
    });
}

startServer();
