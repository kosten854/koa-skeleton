'use strict';

const { paths } = require('./spec');

const Router = require('koa-router');
const OpenApiMiddleware = require('./middlewares/OpenApiMiddleware');

const router = new Router();

// set routers from documentation
Object.keys(paths).forEach(path => {
  Object.keys(paths[path]).forEach(method => {
    const route = paths[path][method];
    const [controller, action] = route.operationId.split('.');
    const controllerClass = require(`./controllers/${controller}`);
    const middlewares = [];
    // json schema and query serializer
    middlewares.push(OpenApiMiddleware(route));

    middlewares.push(controllerClass[action]);
    // eslint-disable-next-line no-useless-escape
    const pathString = path.replace(/\{([^\{]+)\}/g, ':$1');
    router[method](pathString, ...middlewares);
  });
});

module.exports = router;
