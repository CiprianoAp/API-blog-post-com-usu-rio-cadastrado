"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const blogContro_1 = __importDefault(require("../../../controller/blog/blogContro"));
const authMiddleware_1 = require("../../../middleware/authMiddleware");
const routerBlog = express_1.default.Router();
routerBlog.post("/criar-post", authMiddleware_1.authMiddleware, blogContro_1.default.createPost);
routerBlog.get("/listar-post", authMiddleware_1.authMiddleware, blogContro_1.default.listPost);
exports.default = routerBlog;
//# sourceMappingURL=blogRout.js.map