const Koa = require('koa');
const render = require('koa-art-template');
const Router = require('koa-router');
const router = new Router();

const app = new Koa();

render(app, {
    root: __dirname + '/view',
    extname: '.html',
})

router.get('/cookies1', async (ctx) => {
    ctx.cookies.set('username', 'ZJ', {
        maxAge: 600000,
        // path:'/cookies2', // 可以访问此cookies的路径
        // domain:'/', // 默认当前域名
        httpOnly: true //为true时只有服务器端可以访问此cookies，默认为true 
    })
    let data = new Buffer('男').toString('base64')
    ctx.cookies.set('sex', data, {
        maxAge: 6000000
    })
    ctx.render('cookies1', {
        name: 'ZJ'
    })
})
router.get('/cookies2', async (ctx) => {
    let username = ctx.cookies.get('username');
    let sex = ctx.cookies.get('sex');
    sex = new Buffer(sex,'base64').toString();
    ctx.render('cookies2', {
        name: 'ZJ',
        username: username,
        sex: sex
    })
})

app.use(router.routes()).use(router.allowedMethods());
app.listen(3000)