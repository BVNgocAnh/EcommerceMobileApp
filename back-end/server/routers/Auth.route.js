import express from "express";
import { Register, Login, Logout } from "../controllers/Auth.controller.js";
const router = express.Router();

router.post("/register", Register);
router.post("/login", Login);
router.post("/logout", Login);
export default router;
