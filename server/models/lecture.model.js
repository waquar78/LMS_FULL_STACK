import mongoose from "mongoose";

const lectureSchema = new mongoose.Schema({
    lectureTitle:{
        type:String,
        require:true
    },
    videoUrl:{
        type:String,
        select:true
    },
    publicId:{type:String},
    isPreviewFree: { type: Boolean },

},{timestamps:true});

export const Lecture = mongoose.model("Lecture", lectureSchema)  