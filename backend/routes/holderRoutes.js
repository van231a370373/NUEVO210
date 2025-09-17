import express from 'express';
import { Holder } from '../models/Holder.js';
import { authenticateToken } from '../middlewares/auth.js';
import { requireFields } from '../middlewares/validate.js';
import { t } from '../services/i18n.js';

const router = express.Router();

router.post(
  '/',
  authenticateToken,
  requireFields(['tipo', 'nombre', 'pais_residencia', 'nif', 'porcentaje_participacion']),
  async (req, res) => {
    try {
      const holder = await Holder.create({ ...req.body, usuario_id: req.user.id });
      res.status(201).json({ message: t('user_created', req.lang), holder });
    } catch (err) {
      res.status(400).json({ error: t('error_required', req.lang, { field: err.message }) });
    }
  }
);

router.get('/', authenticateToken, async (req, res) => {
  try {
    const holders = await Holder.findAllByUser(req.user.id);
    res.json(holders);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
