import request from 'supertest';
import app from '../src/server.js';

describe('Usuarios', () => {
  it('debe crear un usuario', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({ email: 'test@example.com', password: '123456', nombre: 'Test', rol_id: 1 });
    expect(res.statusCode).toBe(201);
    expect(res.body.user.email).toBe('test@example.com');
    expect(res.body.token).toBeDefined();
  });
});
