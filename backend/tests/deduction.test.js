import request from 'supertest';
import app from '../src/server.js';

describe('Deducciones', () => {
  it('debe rechazar deducción sin autenticación', async () => {
    const res = await request(app)
      .post('/api/deducciones')
      .send({});
    expect(res.statusCode).toBe(401);
  });
});
