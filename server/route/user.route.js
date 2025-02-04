import express from "express";
import { getUserProfile, Login, logout, Register, updateProfile } from "../controllers/user.controller.js";  
import isAuthenticated from "../middlewares/isAuthenticated.js";
import upload from "../utils/multer.js";


const router = express.Router();

router.route("/register").post(Register);
router.route("/login").post(Login);
router.route("/logout").get(logout);
router.route("/profile").get(isAuthenticated, getUserProfile);
router.route("/profile/update").put(isAuthenticated, upload.single("profilePhoto"), updateProfile);
export default router;