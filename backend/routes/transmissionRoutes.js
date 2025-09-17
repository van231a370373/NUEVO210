import express from 'express';
import { Transmission } from '../models/Transmission.js';
import { authenticateToken } from '../middlewares/auth.js';
import { requireFields } from '../middlewares/validate.js';

const router = express.Router();

router.post('/', authenticateToken, requireFields(['declaracion_id', 'inmueble_id', 'titular_id', 'valor_adquisicion', 'valor_transmision', 'gastos', 'fecha_transmision']), async (req, res) => {
  try {
    const transmission = await Transmission.create(req.body);
    res.status(201).json(transmission);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/:declaracion_id', authenticateToken, async (req, res) => {
  try {
    const transmissions = await Transmission.findByDeclaration(req.params.declaracion_id);
    res.json(transmissions);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
