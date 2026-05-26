import express from 'express';
import dotenv from 'dotenv';
import Conex from './api/api';
import todasRotas from './routers/index';

dotenv.config();
const app = express();
app.use(express.json());
Conex.conn();
app.use('/', todasRotas)

app.listen(process.env.PORT_SERVER, () => console.log(`Server OKAY, PORT_SRV = ${process.env.PORT_SERVER}`));

