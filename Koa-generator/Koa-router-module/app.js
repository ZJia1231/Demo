const Koa = require('koa');
const Router = require('koa-router');
const router = new Router();

const admin = require('./routes/admin.js');

const app = new Koa();

router.get('/', (ctx) => {
    ctx.body = 'hello world';
})

router.use('/admin', admin);

app.use(router.routes()).use(router.allowedMethods());

app.listen(3000);