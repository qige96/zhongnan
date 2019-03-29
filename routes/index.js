const Router = require('koa-router');

const loginRouter = require('./login')
const userRouter = require('./user')
const doctorLoginRouter = require('./docLogin')


const router = new Router();
const indexRouter = new Router();
indexRouter.get('/', async (ctx, next)=>{
  ctx.body = { msg: 'hello' }
})


router.use(indexRouter.routes(), indexRouter.allowedMethods());
router.use(loginRouter.routes(), loginRouter.allowedMethods());
router.use(doctorLoginRouter.routes(), doctorLoginRouter.allowedMethods());
router.use(userRouter.routes(), userRouter.allowedMethods());



module.exports = router