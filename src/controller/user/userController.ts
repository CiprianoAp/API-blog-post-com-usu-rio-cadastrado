import { Express, Request, Response } from "express";
import { userModel } from "../../model/user/userModel";
import { imageModel } from "../../model/user/userMolPhoto";
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

            return res.status(400).json({ messagem: `O email ${exitEmail} já existe` })

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

}

export default new User;