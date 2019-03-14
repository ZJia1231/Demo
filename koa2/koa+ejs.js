const Koa = require('koa');
const views = require('koa-views');
const ejs = require('ejs');
const router = require('koa-router')();
const app = new Koa();
app.use(views('./view', { extension: 'ejs' }));
router.get('/', async (ctx) => {
    await ctx.render('index',{
        title:'hello ejs!'
    })
})
app.use(router.routes())
app.listen(3000);
