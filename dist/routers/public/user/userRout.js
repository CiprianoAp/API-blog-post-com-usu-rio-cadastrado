"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = __importDefault(require("../../../controller/user/userController"));
const routerUser = express_1.default.Router();
routerUser.post('/criar-usuario', userController_1.default.createUser);
routerUser.post('/login', userController_1.default.loginUser);
exports.default = routerUser;
//# sourceMappingURL=userRout.js.map