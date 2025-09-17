import pool from '../config/db.js';
import bcrypt from 'bcrypt';

export class User {
  static async create({ email, password, nombre, idioma = 'ES', moneda = 'EUR', rol_id = 1 }) {
    const password_hash = await bcrypt.hash(password, 10);
    const result = await pool.query(
      'INSERT INTO usuarios (email, password_hash, nombre, idioma, moneda, rol_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [email, password_hash, nombre, idioma, moneda, rol_id]
    );
    return result.rows[0];
  }
  static async findByEmail(email) {
    const result = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);
    return result.rows[0];
  }
}
