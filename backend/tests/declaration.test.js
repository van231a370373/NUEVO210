import request from 'supertest';
import app from '../src/server.js';

describe('Declaraciones 210', () => {
  it('debe rechazar declaración sin autenticación', async () => {
    const res = await request(app)
      .post('/api/declaraciones210')
      .send({});
    expect(res.statusCode).toBe(401);
  });
});
