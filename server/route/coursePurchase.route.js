import express from "express"
import { coursePurchased, getAllPurchasedCourse, getCourseDetailWithPurchaseStatus } from "../controllers/coursePurchased.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
const router = express.Router()

router.route("/coursePurchase").post(isAuthenticated,coursePurchased);
router.route("/course/:courseId/detail-with-status").get(isAuthenticated,getCourseDetailWithPurchaseStatus);
router.route("/").get(isAuthenticated,getAllPurchasedCourse);

export default router