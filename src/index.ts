import express from 'express';
import dotenv from 'dotenv';
import Conex from './api/api';
import todasRotas from './routers/index';

//import routerBlogPrivate from './routers/private/blog/blogRout'
//import routerUser from './routers/public/user/userRout';
//import routUserPrivate from './routers/private/user/userRout'
dotenv.config();
const app = express();
app.use(express.json());
Conex.conn();

app.use('/', todasRotas)
//app.use('/', routUserPrivate)
//app.use('/', routerUser)


app.listen(process.env.PORT_SERVER, () => console.log(`Server OKAY, PORT_SRV = ${process.env.PORT_SERVER}`));

