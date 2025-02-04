import { User } from "../models/user.model.js";
import bcrypt from 'bcryptjs';
// import jwt from 'jsonwebtoken';
import { genrateToken } from "../utils/genrateToken.js";
import { deleteMediaFromCloudinary, uploadMedia } from "../utils/cloudinary.js";
// import genrateToken from '../utils/genrateToken.js'

export const Register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({
                message: "all field are required.",
                success: false
            });
        }

        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                message: "email id is already used",
                success: false
            })

        }
        const hashPassword = await bcrypt.hash(password, 10)
        await User.create({
            name,
            email,
            password: hashPassword,
        })
        return res.status(201).json({
            message: "account created successfully",
            success: true
        })



    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "there is a problem",
            success: false
        })


    }


}

export const Login = async (req, res) => {

    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                message: "required email and password ",
                success: false
            })


        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "incorrect email or password"
            })

        }

        const issPasswordMatch = await bcrypt.compare(password, user.password)
        if (!issPasswordMatch) {
            return res.status(400).json({
                success: false,
                message: "incorrect email or password"
            })

        }
        genrateToken(res, user, `Welcome Back ${user.name}`);

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "there is a problem",
            success: false
        })


    }
}

export const logout = async (_, res) => {
    try {
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            message: "Logged out successfully",
            success: true
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "there is a problem",
            success: false
        })


    }
};

export const getUserProfile = async (req, res) => {
    try {
        const userId = req.id;
        // console.log(userId);
        
        const user = await User.findById(userId).select("-password").populate("enrolledCourses");
        if(!user){
            return res.status(404).json({
                message:"Profile not found",
                success:false
            })
        }
        return res.status(200).json({
            success:true,
            user
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Failed to load user"
        })
    }
};

export const updateProfile = async (req,res) => {
    try {
        const userId = req.id;
        const {name} = req.body;
        const profilePhoto = req.file;

        const user = await User.findById(userId);
        if(!user){
            return res.status(404).json({
                message:"User not found",
                success:false
            }) 
        }
        // extract public id of the old image from the url is it exists;
        if(user.photoUrl){
            const publicId = user.photoUrl.split("/").pop().split(".")[0]; // extract public id
            deleteMediaFromCloudinary(publicId);
        }

        // upload new photo
        const cloudResponse = await uploadMedia(profilePhoto.path);
        const photoUrl = cloudResponse.secure_url;

        const updatedData = {name, photoUrl};
        const updatedUser = await User.findByIdAndUpdate(userId, updatedData, {new:true}).select("-password");

        return res.status(200).json({
            success:true,
            user:updatedUser,
            message:"Profile updated successfully."
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Failed to update profile"
        })
    }
}