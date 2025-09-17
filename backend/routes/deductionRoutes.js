import express from 'express';
import { Deduction } from '../models/Deduction.js';
import { authenticateToken } from '../middlewares/auth.js';
import { requireFields } from '../middlewares/validate.js';

const router = express.Router();

router.post(
  '/',
  authenticateToken,
  requireFields(['declaracion_id', 'tipo', 'importe', 'descripcion']),
  async (req, res) => {
    try {
      const deduction = await Deduction.create(req.body);
      res.status(201).json(deduction);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
);

router.get('/:declaracion_id', authenticateToken, async (req, res) => {
  try {
    const deductions = await Deduction.findByDeclaration(req.params.declaracion_id);
    res.json(deductions);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
