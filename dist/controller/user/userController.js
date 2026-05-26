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
const userMolPhoto_1 = require("../../model/user/userMolPhoto");
const fs_1 = __importDefault(require("fs"));
const zod_1 = require("zod");
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
                return res.status(400).json({ messagem: `usuário existente com este email ${email}` });
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
            //Inicio zod
            const createEventeLogin = zod_1.z.object({
                email: zod_1.z.string({ error: "email é obrigatório" })
                    .min(10, "email: deve conter nomino 10 caracteres")
                    .email("formato do email invalido")
                    .max(255, "email: deve conter no máximo 255 caracteres"),
                senha: zod_1.z.string({ error: "senha obrigatória" })
                    .regex(/[A-Z]/, "Deve conter uma letra maiúscula")
                    .regex(/[a-z]/, "Deve conter uma letra minúscula")
                    .regex(/[0-9]/, "Deve conter um número")
                    .regex(/[^A-Za-z0-9]/, "Deve conter um caractere especial")
                    .min(8, "senha: deve conter no mino 8 caracteres")
                    .max(40, "senha deve conter no minimo 40 caracteres")
            });
            //Pegar dados do body e implementar a verificação
            const data = createEventeLogin.safeParse(req.body);
            //Verificar  e retornar erro caso tiver no zod
            if (!data.success) {
                return res.status(400).json({
                    message: data.error.issues[0].message
                });
            }
            //Fim zod
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
        //Listar todos os usuários
        this.listarUsuario = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const usuarios = yield userMolPhoto_1.imageModel.find().populate('user', 'nome caminho nome email');
                return res.status(200).json({ mensagem: "Todos os usuario", alluser: usuarios });
            }
            catch (error) {
                return res.status(400).json({ erro: "Erro ao listar ", tipo_erro: error });
            }
        });
        //Carregar imagem do usuário 
        this.ulploadImagemUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.user.id;
                const file = req.file;
                if (!file) {
                    return res.status(400).json({
                        message: "Imagem não enviada"
                    });
                }
                // 🔥 1. VERIFICAR SE JÁ EXISTE FOTO
                const existingPhoto = yield userMolPhoto_1.imageModel.findOne({
                    user: userId
                });
                if (existingPhoto) {
                    return res.status(400).json({
                        message: "Já existe uma foto de perfil. Apague ou atualize a existente antes de adicionar outra."
                    });
                }
                // 🔥 2. SALVAR NOVA FOTO
                const image = yield userMolPhoto_1.imageModel.create({
                    nome: file.filename,
                    caminho: file.path,
                    user: userId
                });
                return res.status(201).json({
                    message: "Foto de perfil carregada com sucesso",
                    image
                });
            }
            catch (error) {
                return res.status(500).json({
                    message: "Erro no upload",
                    error
                });
            }
        });
        //Atualizar a photo de perfil
        this.updateImagemUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.user.id;
                const file = req.file;
                if (!file) {
                    return res.status(400).json({
                        message: "Imagem não enviada"
                    });
                }
                //BUSCAR FOTO EXISTENTE
                const existingPhoto = yield userMolPhoto_1.imageModel.findOne({ user: userId });
                if (!existingPhoto) {
                    return res.status(404).json({
                        message: "Nenhuma foto encontrada para atualizar"
                    });
                }
                //APAGAR FICHEIRO ANTIGO
                const fs = require("fs");
                if (fs.existsSync(existingPhoto.caminho)) {
                    fs.unlinkSync(existingPhoto.caminho);
                }
                //3. UPDATE NO BANCO
                const updated = yield userMolPhoto_1.imageModel.findOneAndUpdate({ user: userId }, {
                    nome: file.filename,
                    caminho: file.path
                }, { new: true });
                return res.status(200).json({
                    message: "Imagem atualizada com sucesso",
                    image: updated
                });
            }
            catch (error) {
                return res.status(500).json({
                    message: "Erro ao atualizar imagem",
                    error
                });
            }
        });
        // Eliminar a foto de perfil
        this.deletePhotoPerfil = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.user.id;
                //BUSCAR IMAGEM DO USER
                const image = yield userMolPhoto_1.imageModel.findOne({ user: userId });
                if (!image) {
                    return res.status(404).json({
                        message: "Nenhuma imagem encontrada"
                    });
                }
                //APAGAR FICHEIRO DO DIRETÓRIO
                if (fs_1.default.existsSync(image.caminho)) {
                    fs_1.default.unlinkSync(image.caminho);
                }
                //APAGAR DA BASE DE DADOS
                yield userMolPhoto_1.imageModel.deleteOne({ user: userId });
                return res.status(200).json({
                    message: "Imagem de perfil eliminada com sucesso"
                });
            }
            catch (error) {
                return res.status(500).json({
                    message: "Erro ao eliminar imagem",
                    error
                });
            }
        });
    }
}
exports.default = new User;
//# sourceMappingURL=userController.js.map