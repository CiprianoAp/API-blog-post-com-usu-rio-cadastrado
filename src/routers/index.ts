import express from 'express'
import routerBlogPrivate from '../routers/private/blog/blogRout'
import routerUser from '../routers/public/user/userRout';
import routUserPrivate from '../routers/private/user/userRout'

const todasRotas = express();
todasRotas.use('/', routerBlogPrivate)
todasRotas.use('/', routUserPrivate)
todasRotas.use('/', routerUser)


export default todasRotas;
