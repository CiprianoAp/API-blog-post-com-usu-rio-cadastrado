"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const schemaBlog = new Schema({
    title: String,
    author: String,
    bod: String
});
exports.blogModel = mongoose_1.default.model('Blog', schemaBlog);
