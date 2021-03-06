const Koa = require('koa');
const Router = require('koa-router');
const session = require('koa-session');
const router = new Router();

const app = new Koa();

//配置session中间件
app.keys = ['some secret hurr'];

const CONFIG = {
    key: 'koa:sess', /** (string) cookie key (default is koa:sess) */
    /** (number || 'session') maxAge in ms (default is 1 days) */
    /** 'session' will result in a cookie that expires when session/browser is closed */
    /** Warning: If a session cookie is stolen, this cookie will never expire */
    maxAge: 5000,
    overwrite: true, /** (boolean) can overwrite or not (default true) */
    httpOnly: true, /** (boolean) httpOnly or not (default true) */
    signed: true, /** (boolean) signed or not (default true) */
    rolling: false, /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */
    renew: false, /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)*/
};

app.use(session(CONFIG, app));

router.get('/login', async (ctx) => {
    ctx.session.username = '帅哥';
    ctx.body = '登陆成功！'
})
router.get('/data',async (ctx)=> {
    ctx.body = ctx.session.username;
    console.log(ctx.session.username);
    
})


app.use(router.routes())
   .use(router.allowedMethods())
   .listen(3000)