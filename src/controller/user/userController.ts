import { Express, Request, Response } from "express";
import { userModel } from "../../model/user/userModel";
//import { Jwt } from "jsonwebtoken";
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

}

export default new User;