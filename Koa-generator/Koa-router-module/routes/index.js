const Router = require('koa-router');
let router = new Router();
router.get('/', async (ctx) => {
    ctx.body = "这是前台首页";
})
router.get('/news', async (ctx) => {
    ctx.body = '这是前台新闻页面';
})
router.get('/user', async (ctx) => {
    ctx.body = '这是用户页面';
})
module.exports = router