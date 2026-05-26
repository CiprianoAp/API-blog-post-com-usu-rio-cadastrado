import { Request, Response } from "express";
import { userModel } from "../../model/user/userModel";
import { imageModel } from "../../model/user/userMolPhoto";
import fs from "fs";
import { z } from 'zod';
import { generateToken } from "../../auth/jwt";
import bcript from 'bcryptjs';

class User {
    //Criar usuário
    createUser = async (req: Request, res: Response) => {

        //Pegar dados do body
        const { nome, senha, email } = req.body

        //Verificar se o mai existe
        const exitEmail = await userModel.findOne({ email });

        if (exitEmail) {

            return res.status(400).json({ messagem: `usuário existente com este email ${email}` })

        }

        const passwordHash = await bcript.hash(senha, 10)

        try {
            const usuario = new userModel({
                nome,
                email,
                senha: passwordHash
            });

            await usuario.save()

            res.status(201).json({ messagem: "Usuario criado com sucesso", usuario: usuario })

        } catch (error) {

            res.status(401).json({ messagem: "Erro ao cadastrar usuario", error: error })

        }
    }
    //Fazer login
    loginUser = async (req: Request, res: Response) => {

        //Inicio zod
        const createEventeLogin = z.object({
            email: z.string({ error: "email é obrigatório" })
                .min(10, "email: deve conter nomino 10 caracteres")
                .email("formato do email invalido")
                .max(255, "email: deve conter no máximo 255 caracteres"),
            senha: z.string({ error: "senha obrigatória" })
                //.regex(/[A-Z]/, "Deve conter uma letra maiúscula")
                //.regex(/[a-z]/, "Deve conter uma letra minúscula")
                // .regex(/[0-9]/, "Deve conter um número")
                // .regex(/[^A-Za-z0-9]/, "Deve conter um caractere especial")
                .min(8, "senha: deve conter no mino 8 caracteres")
                .max(40, "senha deve conter no minimo 40 caracteres")
        })

        //Pegar dados do body e implementar a verificação
        const data = createEventeLogin.safeParse(req.body)

        //Verificar  e retornar erro caso tiver no zod
        if (!data.success) {
            return res.status(400).json({
                message: data.error.issues[0].message
            });
        }
        //Fim zod
        const { email, senha } = req.body;

        try {

            const dados: any = await userModel.findOne({ email });

            if (!dados) {
                return res.status(400).json({ mensagem: "Usuário enexistente!" });
            }

            const passwordHash = await bcript.compare(senha, dados.senha)

            if (!passwordHash) {

                return res.status(400).json({ mensagem: "Usuário enexistente!" });
            }

            const token = generateToken(dados._id.toString());

            return res.status(200).json({
                message: "Login realizado com sucesso",
                token
            });

        } catch (error) {
            return res.status(500).json({
                message: "Erro de login",
                error
            });
        }
    };
    //Listar todos os usuários
    listarUsuario = async (req: Request, res: Response) => {
        try {

            const usuarios = await imageModel.find().populate('user', 'nome caminho nome email');
            return res.status(200).json({ mensagem: "Todos os usuario", alluser: usuarios })

        } catch (error) {

            return res.status(400).json({ erro: "Erro ao listar ", tipo_erro: error })

        }
    }
    //Carregar imagem do usuário 
    ulploadImagemUser = async (req: Request, res: Response) => {
        try {

            const userId = (req as any).user.id;

            const file = req.file;

            if (!file) {
                return res.status(400).json({
                    message: "Imagem não enviada"
                });
            }

            // 🔥 1. VERIFICAR SE JÁ EXISTE FOTO
            const existingPhoto = await imageModel.findOne({
                user: userId
            });

            if (existingPhoto) {

                return res.status(400).json({
                    message: "Já existe uma foto de perfil. Apague ou atualize a existente antes de adicionar outra."
                });
            }

            // 🔥 2. SALVAR NOVA FOTO
            const image = await imageModel.create({

                nome: file.filename,
                caminho: file.path,
                user: userId

            });

            return res.status(201).json({
                message: "Foto de perfil carregada com sucesso",
                image
            });

        } catch (error) {

            return res.status(500).json({
                message: "Erro no upload",
                error
            });
        }

    };
    //Atualizar a photo de perfil
    updateImagemUser = async (req: Request, res: Response) => {
        try {
            const userId = (req as any).user.id;
            const file = req.file;

            if (!file) {
                return res.status(400).json({
                    message: "Imagem não enviada"
                });
            }

            //BUSCAR FOTO EXISTENTE
            const existingPhoto = await imageModel.findOne({ user: userId });

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
            const updated = await imageModel.findOneAndUpdate(
                { user: userId },
                {
                    nome: file.filename,
                    caminho: file.path
                },
                { new: true }
            );

            return res.status(200).json({
                message: "Imagem atualizada com sucesso",
                image: updated
            });

        } catch (error) {
            return res.status(500).json({
                message: "Erro ao atualizar imagem",
                error
            });
        }
    };
    // Eliminar a foto de perfil
    deletePhotoPerfil = async (req: Request, res: Response) => {
        try {
            const userId = (req as any).user.id;

            //BUSCAR IMAGEM DO USER
            const image = await imageModel.findOne({ user: userId });

            if (!image) {
                return res.status(404).json({
                    message: "Nenhuma imagem encontrada"
                });
            }

            //APAGAR FICHEIRO DO DIRETÓRIO
            if (fs.existsSync(image.caminho)) {
                fs.unlinkSync(image.caminho);
            }

            //APAGAR DA BASE DE DADOS
            await imageModel.deleteOne({ user: userId });

            return res.status(200).json({
                message: "Imagem de perfil eliminada com sucesso"
            });

        } catch (error) {
            return res.status(500).json({
                message: "Erro ao eliminar imagem",
                error
            });
        }
    }
    //Rota inicial
    inicia = async (req: Request, res: Response) => {

        return await res.status(200).json({ mensagem: "Bem vindo a API blog" });

    }
}

export default new User;