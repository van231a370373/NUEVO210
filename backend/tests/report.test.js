import request from 'supertest';
import app from '../src/server.js';

describe('Reporting', () => {
  it('debe rechazar acceso sin autenticación', async () => {
    const res = await request(app)
      .get('/api/report/declaraciones');
    expect(res.statusCode).toBe(401);
  });
});
