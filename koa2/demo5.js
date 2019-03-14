const Koa = require('koa');
const app = new Koa();
const router = require('koa-router')();
const bodyParser = require('koa-bodyparser');

router.get('/', async (ctx,next) => {
    ctx.body = '<h1>koa</h1>'
})

router.get('/hello/:name/:sex', async (ctx, next) => {
    ctx.response.body = ctx.params;
})

app.use(router.routes());

app.listen(3000);
console.log('success');