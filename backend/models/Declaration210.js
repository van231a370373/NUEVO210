import pool from '../config/db.js';

export class Declaration210 {
  static async create({ titular_id, inmueble_id, estado, fecha_presentacion, tipo_renta, base_imponible, cuota, moneda, idioma, pdf_path }) {
    const result = await pool.query(
      'INSERT INTO declaraciones210 (titular_id, inmueble_id, estado, fecha_presentacion, tipo_renta, base_imponible, cuota, moneda, idioma, pdf_path) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *',
      [titular_id, inmueble_id, estado, fecha_presentacion, tipo_renta, base_imponible, cuota, moneda, idioma, pdf_path]
    );
    return result.rows[0];
  }
  static async findById(id) {
    const result = await pool.query('SELECT * FROM declaraciones210 WHERE id = $1', [id]);
    return result.rows[0];
  }
  static async findAllByHolder(titular_id) {
    const result = await pool.query('SELECT * FROM declaraciones210 WHERE titular_id = $1', [titular_id]);
    return result.rows;
  }
}
