"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const shemaUser = new mongoose_1.default.Schema({
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
});
exports.userModel = mongoose_1.default.model("User", shemaUser);
//# sourceMappingURL=userModel.js.map