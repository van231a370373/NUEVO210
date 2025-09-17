import express from 'express';
import { Declaration210 } from '../models/Declaration210.js';
import { authenticateToken } from '../middlewares/auth.js';
import { requireFields } from '../middlewares/validate.js';

const router = express.Router();

router.post('/', authenticateToken, requireFields(['titular_id', 'inmueble_id', 'estado', 'tipo_renta', 'base_imponible', 'cuota', 'moneda', 'idioma']), async (req, res) => {
  try {
    const declaration = await Declaration210.create(req.body);
    res.status(201).json(declaration);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/:titular_id', authenticateToken, async (req, res) => {
  try {
    const declarations = await Declaration210.findAllByHolder(req.params.titular_id);
    res.json(declarations);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
