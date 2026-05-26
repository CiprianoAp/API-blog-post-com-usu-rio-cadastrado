"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const api_1 = __importDefault(require("./api/api"));
const index_1 = __importDefault(require("./routers/index"));
//import routerBlogPrivate from './routers/private/blog/blogRout'
//import routerUser from './routers/public/user/userRout';
//import routUserPrivate from './routers/private/user/userRout'
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
api_1.default.conn();
app.use('/', index_1.default);
//app.use('/', routUserPrivate)
//app.use('/', routerUser)
app.listen(process.env.PORT_SERVER, () => console.log(`Server OKAY, PORT_SRV = ${process.env.PORT_SERVER}`));
//# sourceMappingURL=index.js.map