import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();

const secret: any = process.env.SECRET_JWT;

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {

    const authHeader = req.headers.authorization;

    if (!authHeader) {

        return res.status(401).json({ message: "Token não enviado" });
    }

    const token = authHeader.split(" ")[1];

    try {

        const decoded = jwt.verify(token, secret);
        (req as any).user = decoded;

        next();

    } catch {
        
        return res.status(401).json({ message: "Token inválido" });
    }
};