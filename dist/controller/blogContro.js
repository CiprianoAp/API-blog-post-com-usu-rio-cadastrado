"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const blogModel_1 = require("../model/blogModel");
class Blog {
    constructor() {
        this.create = async (req, res) => {
            const reqBody = req.body;
            const blog = new blogModel_1.blogModel({
                title: reqBody.title
            });
            await blog.save();
        };
    }
}
