import pool from '../config/db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export async function register(req, res) {
  const { email, password, nombre, idioma = 'ES', moneda = 'EUR', rol_id = 1 } = req.body;
  try {
    const password_hash = await bcrypt.hash(password, 10);
    const result = await pool.query(
      'INSERT INTO usuarios (email, password_hash, nombre, idioma, moneda, rol_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [email, password_hash, nombre, idioma, moneda, rol_id]
    );
    const user = result.rows[0];
    const token = jwt.sign({ id: user.id, email: user.email, rol: rol_id }, process.env.JWT_SECRET, { expiresIn: '12h' });
    res.status(201).json({ user, token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function login(req, res) {
  const { email, password } = req.body;
  try {
    const result = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);
    const user = result.rows[0];
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });
    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) return res.status(401).json({ error: 'Credenciales inválidas' });
    const token = jwt.sign({ id: user.id, email: user.email, rol: user.rol_id }, process.env.JWT_SECRET, { expiresIn: '12h' });
    res.json({ user, token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}
