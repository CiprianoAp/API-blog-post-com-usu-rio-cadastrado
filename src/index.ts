import express from 'express';
import dotenv from 'dotenv';
import Conex from './api/api';
import routerBlog from './routers/private/blog/blogRout'
import routerUser from './routers/private/user/userRout';

dotenv.config();
const app = express();
app.use(express.json());
Conex.conn();
app.use('/', routerBlog)
app.use('/', routerUser)


app.listen(process.env.PORT_SERVER, () => console.log(`Server OKAY, PORT_SRV = ${process.env.PORT_SERVER}`));

