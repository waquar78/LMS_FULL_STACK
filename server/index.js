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

const allowedOrigins = [
  "http://localhost:5173",
  "https://jade-khapse-e352b9.netlify.app"
];

app.use(cors({
  origin: function (origin, callback) {
    console.log("Request Origin →", origin);
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
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

 
