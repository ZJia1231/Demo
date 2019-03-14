const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const router = require('koa-router')();
const cors = require('koa2-cors');
const app = new Koa();
app.use(cors());
app.use(bodyParser());
app.use(router.routes());

router.post('/addData', async (ctx, next) => {
    await next();
    console.log(ctx.body);
    
    ctx.body = ctx.request.body;
})
app.listen(3000)