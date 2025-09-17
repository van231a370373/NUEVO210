import pool from '../config/db.js';

export class Transmission {
  static async create({ declaracion_id, inmueble_id, titular_id, valor_adquisicion, valor_transmision, gastos, fecha_transmision }) {
    const result = await pool.query(
      'INSERT INTO transmisiones (declaracion_id, inmueble_id, titular_id, valor_adquisicion, valor_transmision, gastos, fecha_transmision) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [declaracion_id, inmueble_id, titular_id, valor_adquisicion, valor_transmision, gastos, fecha_transmision]
    );
    return result.rows[0];
  }
  static async findByDeclaration(declaracion_id) {
    const result = await pool.query('SELECT * FROM transmisiones WHERE declaracion_id = $1', [declaracion_id]);
    return result.rows;
  }
}
