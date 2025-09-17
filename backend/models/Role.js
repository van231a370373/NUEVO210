import pool from '../config/db.js';

export class Role {
  static async findById(id) {
    const result = await pool.query('SELECT * FROM roles WHERE id = $1', [id]);
    return result.rows[0];
  }
  static async findAll() {
    const result = await pool.query('SELECT * FROM roles');
    return result.rows;
  }
}
