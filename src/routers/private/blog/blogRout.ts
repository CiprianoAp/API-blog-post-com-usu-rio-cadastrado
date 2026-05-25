import express from 'express';
import blogContro from '../../../controller/blog/blogContro';
import { authMiddleware } from '../../../middleware/authMiddleware';

const routerBlogPrivate = express.Router();

routerBlogPrivate.post("/criar-post", authMiddleware, blogContro.createPost);
routerBlogPrivate.get("/listar-post", authMiddleware, blogContro.listPost);


export default routerBlogPrivate;