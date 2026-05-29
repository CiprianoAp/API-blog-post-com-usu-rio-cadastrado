import { Request, Response } from 'express';
import { blogModel } from '../../model/blog/blogModel';

class Blog {
    //Criar post
    createPost = async (req: Request, res: Response) => {

        const { title, author, body, userId } = req.body

        const validate = blogModel.findById(userId);

        if (!validate) {

            res.status(429).json({ mensagem: "Id usuário não encontrado" })
        } else {
            try {

                const dados = new blogModel({
                    title,
                    author,
                    body,
                    user: userId
                });

                await dados.save();

                return res.status(201).json({ menagem: "Post criado com sucesso" })


            } catch (error) {

                return res.status(500).json({
                    mensagem: "Erro ao cadastrar",
                });
            }
        }





    }

    //Listar os postes com seus atores
    listPost = async (require: Request, res: Response) => {
        try {

            const blog = await blogModel.find().populate("user", "title author body nome email");

            return res.status(200).json({ post: blog })

        } catch (error) {

            return res.status(400).json({ erro: "error ao listar ", tipo_erro: error })
        }
    }
}

export default new Blog;


