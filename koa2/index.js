const Koa = require('koa')
const Router = require('koa-router');
const cors = require('koa2-cors');
const router = new Router();
const app = new Koa()

router
    .get('/', async (ctx) => {
        // ctx.set({'Access-Control-Allow-Origin':'*'}) //设置响应头
        ctx.body = {
            a: 'a',
            b: 'b'
        }
    })
    .get('/news', async (ctx) => {
        ctx.body = '这是一个news页面'
    })
    .get('/user/:name', async (ctx) => { 
        ctx.body = ctx.params.name;
    })

app
    .use(cors()) //允许跨域
    .use(router.routes())  // 启动路由
    .use(router.allowedMethods()) //设置这个会根据ctx.status设置response的响应头

app.listen(3000)
console.log('[demo] start-quick is starting at port 3000')