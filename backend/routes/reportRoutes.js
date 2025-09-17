import express from 'express';
import pool from '../config/db.js';
import { authenticateToken } from '../middlewares/auth.js';

const router = express.Router();

// Resumen de declaraciones por usuario
router.get('/declaraciones', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT estado, COUNT(*) as total FROM declaraciones210 WHERE titular_id IN (SELECT id FROM titulares WHERE usuario_id = $1) GROUP BY estado',
      [req.user.id]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// KPIs: total rentas, transmisiones, deducciones por usuario
router.get('/kpi', authenticateToken, async (req, res) => {
  try {
    const [rentas, transmisiones, deducciones] = await Promise.all([
      pool.query('SELECT SUM(importe) as total_rentas FROM rentas WHERE titular_id IN (SELECT id FROM titulares WHERE usuario_id = $1)', [req.user.id]),
      pool.query('SELECT SUM(valor_transmision - valor_adquisicion - gastos) as total_ganancia FROM transmisiones WHERE titular_id IN (SELECT id FROM titulares WHERE usuario_id = $1)', [req.user.id]),
      pool.query('SELECT SUM(importe) as total_deducciones FROM deducciones WHERE declaracion_id IN (SELECT id FROM declaraciones210 WHERE titular_id IN (SELECT id FROM titulares WHERE usuario_id = $1))', [req.user.id])
    ]);
    res.json({
      total_rentas: rentas.rows[0].total_rentas || 0,
      total_ganancia: transmisiones.rows[0].total_ganancia || 0,
      total_deducciones: deducciones.rows[0].total_deducciones || 0
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
