const Koa = require('koa');
const Router = require('koa-router')
const mongoose = require('mongoose')
const bodyparser = require('koa-bodyparser')
const jwt = require('koa-jwt')
const { ApolloServer, gql } = require('apollo-server-koa');

const errorHandler = require('./middlewares/error-handler')
const { mongoURI, secret } = require('./config')
const { typeDefs, resolvers } = require('./models/schema')

mongoose.connect(mongoURI, {useMongoClient: true});
mongoose.Promise = global.Promise

const app = new Koa();



const server = new ApolloServer({ typeDefs, resolvers });
server.applyMiddleware({ app,  });

const loginRouter = require('./routes/login')
const userRouter = require('./routes/user')

const router = new Router();
router.use(loginRouter.routes(), loginRouter.allowedMethods());
router.use(userRouter.routes(), userRouter.allowedMethods());

app
  .use(errorHandler)
  .use(jwt({ secret }).
    unless({
    path: [/\/register/, 
          /\/login/,],
  }))
  .use(bodyparser())
  .use(router.routes())
  .use(router.allowedMethods())

app.listen(3000)
