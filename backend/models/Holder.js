import pool from '../config/db.js';

export class Holder {
  static async create({ usuario_id, tipo, nombre, pais_residencia, nif, porcentaje_participacion }) {
    const result = await pool.query(
      'INSERT INTO titulares (usuario_id, tipo, nombre, pais_residencia, nif, porcentaje_participacion) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [usuario_id, tipo, nombre, pais_residencia, nif, porcentaje_participacion]
    );
    return result.rows[0];
  }
  static async findById(id) {
    const result = await pool.query('SELECT * FROM titulares WHERE id = $1', [id]);
    return result.rows[0];
  }
  static async findAllByUser(usuario_id) {
    const result = await pool.query('SELECT * FROM titulares WHERE usuario_id = $1', [usuario_id]);
    return result.rows;
  }
}
