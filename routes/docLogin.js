const Router = require('koa-router');
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jsonwebtoken = require('jsonwebtoken')

const Doctor = require('../models/doctor-model')
const { secret } = require('../config')


const doctorLoginRouter = new Router();

async function login(ctx) {
    let body;
    if (ctx.request.method == "GET")
      body = ctx.query
    else
      body = ctx.request.body
    
    try {
      const doctor = await Doctor.findOne({ doctorId: body.doctorId });      
      if (!doctor) {
        ctx.status = 401
        ctx.body = {
          status: 'fail',
          message: '账号错误',
        }
        return;
      }      
      // 匹配密码是否相等
      if (await bcrypt.compare(body.password, doctor.password)) {
        ctx.status = 200
        const token = jsonwebtoken.sign({
            data: { 
              doctor: doctor, 
              date: Date()
            },
            // 设置 token 过期时间
            exp: Math.floor(Date.now() / 1000) + (60 * 60), 
          }, 
          secret)
        ctx.cookies.set('jwt', token)
        ctx.session.jwt = token
        ctx.body = {
          status: 'succ',
          message: '登录成功',
          doctor: doctor,
          // 生成 token 返回给客户端
          token,
        }
      } else {
        ctx.status = 401
        ctx.body = {
          status: 'fail',
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
      if (!body.doctorId || !body.password) {
        ctx.status = 400;
        ctx.body = {
          error: `expected an object with doctorname, password but got: ${body}`,
        }
        return;
      }
      body.password = await bcrypt.hash(body.password, 5)
      let doctor = await Doctor.find({ doctorId: body.doctorId });
    console.log(doctor)   

      if (!doctor.length) {          

        const newDoctor = new Doctor(body);        
        doctor = await newDoctor.save();
        ctx.status = 200;                
        ctx.body = {
          status: 'succ',
          message: '注册成功',
          doctor: doctor,
        }

      } else {
        ctx.status = 406;
        ctx.body = {
          status:'fail',
          message: '用户账号已经存在',
        }
      }
    } catch (error) {
      ctx.throw(500)
    }
  }

async function logout(ctx, next){
  ctx.cookies.set('jwt', null)
  ctx.session = null;
  ctx.body = {
    status: 'succ',
    msg: 'logout success!'
  }
}


doctorLoginRouter
  .get('/doc-login', login)
  .post('/doc-login', login)
  .get('/doc-logout', logout)
  .post('/doc-register', register)


module.exports = doctorLoginRouter