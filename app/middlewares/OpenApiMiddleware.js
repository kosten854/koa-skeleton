const Ajv = require('ajv');
const logger = require('../logger');

module.exports = route => async (ctx, next) => {
  ctx.querystring = ctx.querystring.replace(/\[\]=/g, '=');
  ctx.QUERY = {};
  ctx.PARAMS = {};
  ctx.BODY = {};

  if (Array.isArray(route.parameters)) {
    const schema = {
      type: 'object',
      properties: {
        path: {
          type: 'object',
          required: [],
          properties: {}
        },
        query: {
          type: 'object',
          required: [],
          properties: {}
        }
      }
    };

    route.parameters.forEach(parameter => {
      switch (parameter.in) {
        case 'path':
          schema.properties.path.properties[parameter.name] = parameter.schema;
          if (parameter.required) {
            schema.properties.path.required.push(parameter.name);
          }
          break;
        case 'query':
          schema.properties.query.properties[parameter.name] = parameter.schema;
          if (parameter.required) {
            schema.properties.query.required.push(parameter.name);
          }
          break;
      }
    });

    const data = {};
    data.path = ctx.params || {};
    data.query = Object.assign({}, ctx.query);

    const ajv = new Ajv({
      useDefaults: true,
      allErrors: true,
      coerceTypes: 'array'
    });

    // validation query params
    if (!ajv.validate(schema, data)) {
      logger.error(ajv.errors, 'ajv ctx');
      ctx.status = 400;
      ctx.body = {
        errors: ajv.errors
      };
      return;
    }

    ctx.QUERY = data.query;
    ctx.PARAMS = data.path;
  }

  if (typeof route.requestBody !== 'undefined') {
    const schema = route.requestBody.content['application/json'].schema;

    const ajv = new Ajv({
      useDefaults: false,
      allErrors: true,
      coerceTypes: false
    });

    // validation request body
    if (!ajv.validate(schema, ctx.request.body)) {
      logger.error(ajv.errors, 'ajv ctx.request.body ');
      ctx.status = 400;
      ctx.body = {
        errors: ajv.errors
      };
      return;
    }

    ctx.BODY = ctx.request.body;
  }

  await next();

  /* eslint-disable max-depth */
  // validation response
  if (typeof route.responses !== 'undefined') {
    if (typeof route.responses[ctx.status] !== 'undefined') {
      if (typeof route.responses[ctx.status].content !== 'undefined') {
        if (typeof route.responses[ctx.status].content['application/json'] !== 'undefined') {
          if (
            typeof route.responses[ctx.status].content['application/json'].schema !== 'undefined'
          ) {
            const schema = route.responses[ctx.status].content['application/json'].schema;
            const ajv = new Ajv({
              useDefaults: false,
              allErrors: true,
              coerceTypes: false
            });
            if (!ajv.validate(schema, ctx.body)) {
              logger.error(ajv.errors, 'ajv ctx.body', JSON.stringify(ctx, true, ' '));
              ctx.status = 400;
              ctx.body = {
                errors: ajv.errors
              };
              return;
            }
          }
        }
      }
    }
  }
};
