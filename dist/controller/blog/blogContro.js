"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const blogModel_1 = require("../../model/blog/blogModel");
class Blog {
    constructor() {
        //Criar post
        this.createPost = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { title, author, body, userId } = req.body;
            console.log(req.body);
            try {
                const dados = new blogModel_1.blogModel({
                    title,
                    author,
                    body,
                    user: userId
                });
                yield dados.save();
                return res.status(201).json({ menagem: "Post criado com sucesso" });
            }
            catch (error) {
                return res.status(500).json({
                    erro: error,
                    mensagem: "Erro ao cadastrar",
                });
            }
        });
        //Listar os postes com seus atores
        this.listPost = (require, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const blog = yield blogModel_1.blogModel.find().populate("user", "title author body nome email");
                return res.status(200).json({ post: blog });
            }
            catch (error) {
                return res.status(400).json({ erro: "error ao listar " + error });
            }
        });
    }
}
exports.default = new Blog;
//# sourceMappingURL=blogContro.js.map