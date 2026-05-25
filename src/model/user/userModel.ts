import mongoose from "mongoose";

const shemaUser = new mongoose.Schema({
    nome: {
        type: String,
    },
    senha: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true
    },

}, {
    timestamps: true
})

export const userModel = mongoose.model("User", shemaUser);