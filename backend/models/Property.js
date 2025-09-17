import pool from '../config/db.js';

export class Property {
  static async create({ titular_id, direccion, valor_catastral, uso, fecha_adquisicion }) {
    const result = await pool.query(
      'INSERT INTO inmuebles (titular_id, direccion, valor_catastral, uso, fecha_adquisicion) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [titular_id, direccion, valor_catastral, uso, fecha_adquisicion]
    );
    return result.rows[0];
  }
  static async findById(id) {
    const result = await pool.query('SELECT * FROM inmuebles WHERE id = $1', [id]);
    return result.rows[0];
  }
  static async findAllByHolder(titular_id) {
    const result = await pool.query('SELECT * FROM inmuebles WHERE titular_id = $1', [titular_id]);
    return result.rows;
  }
}
