import pool from '../config/db.js';

export class Deduction {
  static async create({ declaracion_id, tipo, importe, descripcion }) {
    const result = await pool.query(
      'INSERT INTO deducciones (declaracion_id, tipo, importe, descripcion) VALUES ($1, $2, $3, $4) RETURNING *',
      [declaracion_id, tipo, importe, descripcion]
    );
    return result.rows[0];
  }
  static async findByDeclaration(declaracion_id) {
    const result = await pool.query('SELECT * FROM deducciones WHERE declaracion_id = $1', [declaracion_id]);
    return result.rows;
  }
}
