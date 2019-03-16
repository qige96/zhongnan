const Router = require('koa-router');
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jsonwebtoken = require('jsonwebtoken')

const User = require('../models/user-model')
const { secret } = require('../config')


const loginRouter = new Router();

async function login(ctx) {
    const { body } = ctx.request
    try {
      const user = await User.findOne({ userId: body.userId });
      if (!user) {
        ctx.status = 401
        ctx.body = {
          message: '账号错误',
        }
        return;
      }
      // 匹配密码是否相等
      if (await bcrypt.compare(body.password, user.password)) {
        ctx.status = 200
        ctx.body = {
          message: '登录成功',
          user: user.userInfo,
          // 生成 token 返回给客户端
          token: jsonwebtoken.sign({
            data: user,
            // 设置 token 过期时间
            exp: Math.floor(Date.now() / 1000) + (60 * 60), // 60 seconds * 60 minutes = 1 hour
          }, secret),
        }
      } else {
        ctx.status = 401
        ctx.body = {
          message: '密码错误',
        }
      }
    } catch (error) {
      ctx.throw(500)
    }
  }

async function register(ctx) {
    const { body } = ctx.request;    
    try {
      if (!body.userId || !body.password) {
        ctx.status = 400;
        ctx.body = {
          error: `expected an object with username, password but got: ${body}`,
        }
        return;
      }
      body.password = await bcrypt.hash(body.password, 5)
      let user = await User.find({ userId: body.userId });
      if (!user.length) {
        const newUser = new User(body);
        user = await newUser.save();
        ctx.status = 200;
        ctx.body = {
          message: '注册成功',
          user: user.userInfo,
        }
      } else {
        ctx.status = 406;
        ctx.body = {
          message: '用户账号已经存在',
        }
      }
    } catch (error) {
      ctx.throw(500)
    }
  }


loginRouter
  .get('/login', login)
  .post('/register', register)


module.exports = loginRouter