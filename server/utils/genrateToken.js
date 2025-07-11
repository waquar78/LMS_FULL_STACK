import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config({
    path: "../.env"
});

export const genrateToken = async (res, user, message) => {
    const token = jwt.sign({ userId:user._id }, process.env.SECRET_KEY, { expiresIn: "1d" });
    return res.status(200).cookie("token", token, { httpOnly: true,sameSite: "None",  secure: true, maxAge: 24 * 60 * 60 * 1000 })
        .json({
        success:true,
        message,
        user
    })
}
