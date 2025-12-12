import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { login, logout, signup } from "../controllers/user.controller.js";

const router = express.Router();

router.post("/register",signup);
router.post("/login",login);
router.post("/logout",logout);

export default router;
