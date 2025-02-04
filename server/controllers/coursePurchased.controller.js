import { Course } from "../models/course.model.js";
import { CoursePurchase } from "../models/coursePurchase.model.js";
import {User} from '../models/user.model.js'



export const coursePurchased = async (req, res) => {
    try {

        const userId = req.id
        const { amount, courseId, status } = req.body
  
        
        if (!userId || !amount || !courseId || !status) {
            return res.status(400).json({
                message: "course is not purcheased successfully.",
                success: false
            });

        }
        const purchase = new CoursePurchase({ userId, amount, courseId, status });
        await purchase.save();
        const user = await User.findById(userId)
         user.enrolledCourses.push(courseId)
        await user.save()
        const course = await Course.findById(courseId)
        course.enrolledStudent.push(userId)
        await course.save()

        return res.status(201).json({
            message: "course is purchased successfully",
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
export const getCourseDetailWithPurchaseStatus = async (req, res) => {
    try {
      const { courseId } = req.params;
      const userId = req.id;
  
      const course = await Course.findById(courseId)
        .populate({ path: "creator" })
        .populate({ path: "lectures" });
  
      const purchased = await CoursePurchase.findOne({ userId, courseId });
     
  
      if (!course) {
        return res.status(404).json({ message: "course not found!" });
      }
  
      return res.status(200).json({
        course,
        purchased: !!purchased, // true if purchased, false otherwise
      });
    } catch (error) {
      console.log(error);
    }
  };

  export const getAllPurchasedCourse = async (_, res) => {
    try {
      const purchasedCourse = await CoursePurchase.find({
        status: "completed",
      }).populate("courseId");
      if (!purchasedCourse) {
        return res.status(404).json({
          purchasedCourse: [],
        });
      }
      return res.status(200).json({
        purchasedCourse,
      });
    } catch (error) {
      console.log(error);
    }
  };
  