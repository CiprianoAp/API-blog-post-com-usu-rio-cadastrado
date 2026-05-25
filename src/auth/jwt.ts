import jwt from "jsonwebtoken";
import dotenv from 'dotenv';

dotenv.config();

const secret: any = process.env.SECRET_JWT;

export const generateToken = (id: string) => {
  return jwt.sign({ id }, secret, { expiresIn: "1d" });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, secret);
};