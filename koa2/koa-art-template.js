const Koa = require('koa');
const render = require('koa-art-template');
const Router = require('koa-router');
const router = new Router();

const app = new Koa();

render(app, {
    root: __dirname + '/view',
    extname:'.html',
})

router.get('/', async (ctx) => {
    ctx.render('index', {
        name: 'ZJ'
    })
})

app.use(router.routes()).use(router.allowedMethods());
app.listen(3000)