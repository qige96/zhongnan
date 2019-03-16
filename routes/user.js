const Router = require('koa-router');
const mongoose = require('mongoose')

const User = require('../models/user-model')

const userRouter = new Router();

userRouter.get('/user', async (ctx, next)=>{
  const users = await User.find()
  ctx.body = { users }
})

module.exports = userRouter