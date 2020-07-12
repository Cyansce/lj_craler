const Router = require('koa-router')

const router = new Router()


const { home, house, region, chengjiao } = require('./LJ/index')

router.get('/', async (ctx, next) => {
  ctx.body = 'hello word'
})
router.get('/home', home)

// router.get('/house', house)
router.get('/region', region)
router.get('/chengjiao', chengjiao)

module.exports = router