import express from 'express';
import { Income } from '../models/Income.js';
import { authenticateToken } from '../middlewares/auth.js';
import { requireFields } from '../middlewares/validate.js';

const router = express.Router();

router.post(
  '/',
  authenticateToken,
  requireFields([
    'declaracion_id',
    'inmueble_id',
    'titular_id',
    'tipo_renta',
    'importe',
    'origen',
    'periodo',
  ]),
  async (req, res) => {
    try {
      const income = await Income.create(req.body);
      res.status(201).json(income);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
);

router.get('/:declaracion_id', authenticateToken, async (req, res) => {
  try {
    const incomes = await Income.findByDeclaration(req.params.declaracion_id);
    res.json(incomes);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
