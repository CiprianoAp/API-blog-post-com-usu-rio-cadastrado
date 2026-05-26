import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({

  nome: {
    type: String,
    required: true
  },

  caminho: {
    type: String,
    required: true
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  }

}, { timestamps: true });

export const imageModel = mongoose.model("Image", imageSchema);