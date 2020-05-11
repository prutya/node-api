const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const parameter = require('koa-parameter');
const Router = require('@koa/router');
const PgPool = require('pg-pool');

const Config = require('./config');
const middleware = require('./middleware');
const handlers = require('./handlers');
const repositories = require('./repositories');

const config = new Config(process.env);
const app = new Koa();
app.context.config = config;
app.context.db = new PgPool(config.db);
app.context.repositories = {
  account: new repositories.Account(app.context.db, config), // TODO: Lazy
};
const router = new Router();

app.use(middleware.logger);
app.use(middleware.timing);
app.use(bodyParser());
app.use(parameter(app));

router
  .post('/sessions', handlers.sessions.create)
  .post('/accounts', handlers.accounts.create)
  .get('/accounts/:id', handlers.accounts.show);

app.use(router.routes());

app.listen(config.port);
