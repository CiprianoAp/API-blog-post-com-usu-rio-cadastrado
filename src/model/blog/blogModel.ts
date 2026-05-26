import mongoose from "mongoose";

const schemaBlog = new mongoose.Schema({
    title:{
        type: String, 
    },
    author:{
        type: String,
    },
    body:{
        type: String
    } ,
    user:  {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
},{timestamps: true})

export const blogModel = mongoose.model('Blog', schemaBlog);

