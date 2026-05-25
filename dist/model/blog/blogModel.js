"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const schemaBlog = new mongoose_1.default.Schema({
    title: {
        type: String,
    },
    author: {
        type: String,
    },
    body: {
        type: String
    },
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, { timestamps: true });
exports.blogModel = mongoose_1.default.model('Blog', schemaBlog);
//# sourceMappingURL=blogModel.js.map