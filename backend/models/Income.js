import pool from '../config/db.js';

export class Income {
  static async create({ declaracion_id, inmueble_id, titular_id, tipo_renta, importe, origen, periodo }) {
    const result = await pool.query(
      'INSERT INTO rentas (declaracion_id, inmueble_id, titular_id, tipo_renta, importe, origen, periodo) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [declaracion_id, inmueble_id, titular_id, tipo_renta, importe, origen, periodo]
    );
    return result.rows[0];
  }
  static async findByDeclaration(declaracion_id) {
    const result = await pool.query('SELECT * FROM rentas WHERE declaracion_id = $1', [declaracion_id]);
    return result.rows;
  }
}
