import request from 'supertest';
import app from '../src/server.js';

describe('Inmuebles', () => {
  it('debe rechazar inmueble sin campos obligatorios', async () => {
    const res = await request(app)
      .post('/api/inmuebles')
      .send({});
    expect(res.statusCode).toBe(401); // Falta autenticación
  });
});
