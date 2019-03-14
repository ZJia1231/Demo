let router = require('koa-router')();

router.get('/', (ctx) => {
    ctx.body = '後台管理首頁';
})

router.get('/user', (ctx) => {
    ctx.body = '用戶管理';
})
router.get('/focus', (ctx) => {
    ctx.body = '輪播圖管理';
})
router.get('/news', (ctx) => {
    ctx.body = '新聞管理';
})

module.exports = router.routes();