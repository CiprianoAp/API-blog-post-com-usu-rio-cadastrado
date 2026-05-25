"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const storage = multer_1.default.diskStorage({
    destination(req, file, callback) {
        callback(null, "src/uploads");
    },
    filename(req, file, callback) {
        const extensao = path_1.default.extname(file.originalname);
        const nomeArquivo = Date.now() + extensao;
        callback(null, nomeArquivo);
    }
});
// VALIDAR APENAS IMAGEM
const fileFilter = (req, file, callback) => {
    const tiposPermitidos = [
        "image/png",
        "image/jpg",
        "image/jpeg",
        "image/webp"
    ];
    if (tiposPermitidos.includes(file.mimetype)) {
        callback(null, true);
    }
    else {
        callback(new Error("Apenas imagens são permitidas"));
    }
};
exports.upload = (0, multer_1.default)({
    storage,
    fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB
    }
});
//# sourceMappingURL=upload.js.map