import express from 'express';
import userController from '../../../controller/user/userController';

const routerUser = express.Router();
routerUser.get('/', userController.inicia);
routerUser.post('/criar-usuario', userController.createUser);
routerUser.post('/login', userController.loginUser)

export default routerUser;