"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const blogRout_1 = __importDefault(require("../routers/private/blog/blogRout"));
const userRout_1 = __importDefault(require("../routers/public/user/userRout"));
const userRout_2 = __importDefault(require("../routers/private/user/userRout"));
const todasRotas = (0, express_1.default)();
todasRotas.use('/', blogRout_1.default);
todasRotas.use('/', userRout_2.default);
todasRotas.use('/', userRout_1.default);
exports.default = todasRotas;
//# sourceMappingURL=index.js.map