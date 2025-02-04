import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config({
    path: '../.env'
});





const databaseConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("database is connected succesfully");



    } catch (error) {
        console.log(error);


    }


}
export default databaseConnection;