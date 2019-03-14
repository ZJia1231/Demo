const Koa = require('koa');
const serve = require('koa-static');

const app = new Koa();

app.use(serve(__dirname));
app.use(async (ctx) => {
    console.log(__dirname);
     
    if (ctx.url == '/hello') {
        ctx.body = 'hello koa-static';
    }

})
app.listen(3000);