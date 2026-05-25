"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const upload_1 = require("../../../middleware/upload");
const authMiddleware_1 = require("../../../middleware/authMiddleware");
const userController_1 = __importDefault(require("../../../controller/user/userController"));
const routUserPrivate = express_1.default.Router();
routUserPrivate.post('/upload-imagem', authMiddleware_1.authMiddleware, upload_1.upload.single("imagem"), userController_1.default.ulploadImagemUser);
exports.default = routUserPrivate;
//# sourceMappingURL=userRout.js.map