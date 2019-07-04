'use strict';

const supertest = require('supertest');
// const os = require('os');
// const pkg = require('../../package.json');
const app = require('../../app');

const server = app.listen();

afterAll(async () => {
  await app.terminate();
});

describe('Misc', () => {
  const request = supertest(server);

  // describe('GET /', () => {
  //   it('<200> should always return with the API server information', async () => {
  //     const res = await request
  //       .get('/')
  //       .expect('Content-Type', /text\/html/)
  //       .expect(200);
  //   });
  // });

  describe('GET /spec', () => {
    it('<200> should always return API specification in swagger format', async () => {
      const res = await request
        .get('/spec')
        .expect('Content-Type', /json/)
        .expect(200);

      const spec = res.body;
      expect(spec).toHaveProperty('openapi', '3.0.0');
      expect(spec).toHaveProperty('info');
      expect(spec).toHaveProperty('paths');
      expect(spec).toHaveProperty('tags');
    });
  });

  describe('GET /status', () => {
    it('<200> should return `healthy` status if all components are healthy', async () => {
      const res = await request
        .get('/status')
        .expect('Content-Type', /json/)
        .expect(200);

      const { status } = res.body;
      expect(status).toBe('pass');
    });
  });
});
