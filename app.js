const Koa = require('koa');
const Router = require('koa-router')
const mongoose = require('mongoose')
const bodyparser = require('koa-bodyparser')
const jwt = require('koa-jwt')
const session = require('koa-session');
const cors = require('koa-cors')
const helmet = require('koa-helmet')
const { ApolloServer, gql } = require('apollo-server-koa');

const errorHandler = require('./middlewares/error-handler')
const router = require('./routes/index')
const { mongoURI, secret } = require('./config')
const { typeDefs, resolvers } = require('./middlewares/schema')

mongoose.connect(mongoURI, {useMongoClient: true});
mongoose.Promise = global.Promise

const app = new Koa();

app.keys = ['newest secret key', 'older secret key'];

const server = new ApolloServer({ typeDefs, resolvers });
server.applyMiddleware({ app, path: "/query" });


app.use(helmet())
  .use(cors())
  .use(errorHandler)
  .use(session({key:'jwt'}, app))
  .use(jwt({ secret, cookie: "jwt"}).
    unless({
    path: [
          /\/doc-logout/,
          /\/doc-register/, 
          /\/doc-login/,
          /\/logout/,
          /\/register/, 
          /\/login/,],
  }))
  .use(bodyparser())
  .use(router.routes())
  .use(router.allowedMethods())



app.listen(3000)
