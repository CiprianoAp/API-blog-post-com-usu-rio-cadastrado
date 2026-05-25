"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const blogContro_1 = __importDefault(require("../../../controller/blog/blogContro"));
const authMiddleware_1 = require("../../../middleware/authMiddleware");
const routerBlogPrivate = express_1.default.Router();
routerBlogPrivate.post("/criar-post", authMiddleware_1.authMiddleware, blogContro_1.default.createPost);
routerBlogPrivate.get("/listar-post", authMiddleware_1.authMiddleware, blogContro_1.default.listPost);
exports.default = routerBlogPrivate;
//# sourceMappingURL=blogRout.js.map