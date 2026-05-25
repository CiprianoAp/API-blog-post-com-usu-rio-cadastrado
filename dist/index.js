"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const api_1 = __importDefault(require("./api/api"));
const blogRout_1 = __importDefault(require("./routers/private/blog/blogRout"));
const userRout_1 = __importDefault(require("./routers/public/user/userRout"));
const userRout_2 = __importDefault(require("./routers/private/user/userRout"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
api_1.default.conn();
app.use('/', blogRout_1.default);
app.use('/', userRout_2.default);
app.use('/', userRout_1.default);
app.listen(process.env.PORT_SERVER, () => console.log(`Server OKAY, PORT_SRV = ${process.env.PORT_SERVER}`));
//# sourceMappingURL=index.js.map