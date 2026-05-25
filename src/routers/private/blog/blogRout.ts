import express from 'express';
import blogContro from '../../../controller/blog/blogContro';
import { authMiddleware } from '../../../middleware/authMiddleware';

const routerBlog = express.Router();

routerBlog.post("/criar-post", authMiddleware, blogContro.createPost);
routerBlog.get("/listar-post", authMiddleware, blogContro.listPost);


export default routerBlog;