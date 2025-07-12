import express from "express";
import dotenv from "dotenv";
// import cookieParser from "cookie-parser";
import cors from "cors";
import databaseConnection from "./db/database.js";
import cookieParser from 'cookie-parser'
import mediaRoute from './route/media.route.js'
import userRoute from './route/user.route.js'
import courseRoute from './route/course.route.js'
import purchaseRoute from './route/coursePurchase.route.js'
import courseProgressRoute from './route/courseProgress.route.js'


dotenv.config();

console.log("Allowed Origin ", process.env.FRONTEND_URI);
// call database connection here
databaseConnection();
const app = express();

const PORT = process.env.PORT || 3000;

// default middleware
app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin: process.env.FRONTEND_URI.trim(),
    credentials:true
}));

 
// apis
app.use("/api/v1/media", mediaRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/course", courseRoute);
app.use("/api/v1/purchase", purchaseRoute);
app.use("/api/v1/progress", courseProgressRoute)

 
 
app.listen(PORT, () => {
    console.log(`Server listen at port ${PORT}`);
})

 
