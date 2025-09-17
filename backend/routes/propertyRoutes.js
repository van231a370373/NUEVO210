import express from 'express';
import { Property } from '../models/Property.js';
import { authenticateToken } from '../middlewares/auth.js';
import { requireFields } from '../middlewares/validate.js';

const router = express.Router();

router.post(
  '/',
  authenticateToken,
  requireFields([
    'titular_id',
    'direccion',
    'valor_catastral',
    'uso',
    'fecha_adquisicion',
  ]),
  async (req, res) => {
    try {
      const property = await Property.create(req.body);
      res.status(201).json(property);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
);

router.get('/:titular_id', authenticateToken, async (req, res) => {
  try {
    const properties = await Property.findAllByHolder(req.params.titular_id);
    res.json(properties);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
