import { Customer } from "../models/Customer.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export const Register = async (req, res) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const newCustomer = new Customer({
      // username: req.body.username,
      // emailCus: req.body.emailCus,
      ...req.body,
      password: hash,
      isAdmin: req.body.isAdmin,
    });
    const saveCustomer = await newCustomer.save();
    res.status(201).json(saveCustomer);
  } catch (error) {
    res.status(500).json(error);
  }
};

// console.log("Hello World");
// const customer = await Customer.findOne({ username: req.body.username });
// if (!customer) res.status(401).json("Username was wrong!");
// const hashedPassword = bcrypt.compareSync(
//   req.body.password,
//   customer.password
// );
// if (!hashedPassword) res.status(401).json("Wrong password!");

// const accessToken = jwt.sign(
//   {
//     id: customer._id,
//     isAdmin: customer.isAdmin,
//   },
//   process.env.JWT_SEC,
//   {
//     expiresIn: "365d",
//   }
// );

// const { password, ...others } = customer._doc;

// res.status(200).json({ ...others, accessToken });

export const Login = async (req, res) => {
  try {
    const customer = await Customer.findOne({
      username: req.body.username,
    });
    // console.log(customer);
    if (!customer) res.status(401).json("Username was wrong");
    const hashedPassword = bcrypt.compareSync(
      req.body.password,
      customer.password
    );

    if (!hashedPassword) res.status(401).json("Password was wrong");

    const token = jwt.sign(
      { id: customer._id, isAdmin: customer.isAdmin },
      process.env.JWT,
      { expiresIn: "365d" }
    );

    const { password, ...others } = customer._doc;

    res.status(200).json({ ...others, token });
  } catch (error) {
    res.status(500).json(error);
  }
};

// export const Login = async (req, res) => {
//   try {
//     const customer = await Customer.findOne({ username: req.body.username });
//     if (!customer) res.status(401).json("Username was wrong!");
//     const hashedPassword = bcrypt.compareSync(
//       req.body.password,
//       customer.password
//     );
//     if (!hashedPassword) res.status(401).json("Wrong password!");

//     const accessToken = jwt.sign(
//       {
//         id: customer._id,
//         isAdmin: customer.isAdmin,
//       },
//       process.env.JWT_SEC,
//       {
//         expiresIn: "365d",
//       }
//     );

//     const { password, ...others } = customer._doc;

//     res.status(200).json({ ...others, accessToken });
//   } catch (error) {
//     res.status(500).json(error);
//   }
// };

export const Logout = async (req, res) => {
  try {
    console.log("logout successfully");
  } catch (error) {
    res.status(500).send(`error from logout function ${error}`);
  }
};
