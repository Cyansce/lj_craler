const Koa = require('koa');
const router = require('./router')
const http = require('./http')
const cors = require('koa2-cors')

const app = new Koa();

app.use(async (ctx, next) => {
  ctx.$http = http
  console.log(ctx.request.path)
  await next()
})

app.use(cors())
app.use(router.routes())
   .use(router.allowedMethods());


app.listen(3000)

console.log('server running on the port 3000...')