import express from 'express';
import { upload } from "../../../middleware/upload";
import { authMiddleware } from "../../../middleware/authMiddleware";
import userController from '../../../controller/user/userController';


const routUserPrivate = express.Router();

routUserPrivate.post('/upload-imagem', authMiddleware, upload.single("imagem"),userController.ulploadImagemUser);


export default routUserPrivate;


