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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userModel_1 = require("../../model/user/userModel");
//import { Jwt } from "jsonwebtoken";
const jwt_1 = require("../../auth/jwt");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
class User {
    constructor() {
        //Criar usuário
        this.createUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            //Pegar dados do body
            const { nome, senha, email } = req.body;
            //Verificar se o mai existe
            const exitEmail = yield userModel_1.userModel.findOne({ email });
            if (exitEmail) {
                return res.status(400).json({ messagem: `O email ${exitEmail} já existe` });
            }
            const passwordHash = yield bcryptjs_1.default.hash(senha, 10);
            try {
                const usuario = new userModel_1.userModel({
                    nome,
                    email,
                    senha: passwordHash
                });
                yield usuario.save();
                res.status(201).json({ messagem: "Usuario criado com sucesso", usuario: usuario });
            }
            catch (error) {
                res.status(401).json({ messagem: "Erro ao cadastrar usuario", error: error });
            }
        });
        //Fazer login
        this.loginUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { email, senha } = req.body;
            try {
                const dados = yield userModel_1.userModel.findOne({ email });
                if (!dados) {
                    return res.status(400).json({ mensagem: "Usuário enexistente!" });
                }
                const passwordHash = yield bcryptjs_1.default.compare(senha, dados.senha);
                if (!passwordHash) {
                    return res.status(400).json({ mensagem: "Usuário enexistente!" });
                }
                const token = (0, jwt_1.generateToken)(dados._id.toString());
                return res.status(200).json({
                    message: "Login realizado com sucesso",
                    token
                });
            }
            catch (error) {
                return res.status(500).json({
                    message: "Erro de login",
                    error
                });
            }
        });
    }
}
exports.default = new User;
//# sourceMappingURL=userController.js.map