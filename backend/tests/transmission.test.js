import request from 'supertest';
import app from '../src/server.js';

describe('Transmisiones', () => {
  it('debe rechazar transmisión sin campos obligatorios', async () => {
    const res = await request(app)
      .post('/api/transmisiones')
      .send({});
    expect(res.statusCode).toBe(401);
  });
});
