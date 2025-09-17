import express from 'express';
import { calcularGravamen, calcularImputacionRenta, calcularAlquiler, calcularTransmision } from '../services/calculoFiscal.js';
import { authenticateToken } from '../middlewares/auth.js';

const router = express.Router();

router.post('/gravamen', authenticateToken, (req, res) => {
  const { base, residenciaUE } = req.body;
  const cuota = calcularGravamen(base, residenciaUE);
  res.json({ cuota });
});

router.post('/imputacion', authenticateToken, (req, res) => {
  const { valorCatastral, diasTitularidad, coeficiente } = req.body;
  const resultado = calcularImputacionRenta(valorCatastral, diasTitularidad, coeficiente);
  res.json({ resultado });
});

router.post('/alquiler', authenticateToken, (req, res) => {
  const { ingresos, gastos, residenciaUE } = req.body;
  const resultado = calcularAlquiler(ingresos, gastos, residenciaUE);
  res.json({ resultado });
});

router.post('/transmision', authenticateToken, (req, res) => {
  const { valorAdq, valorTrans, gastos } = req.body;
  const resultado = calcularTransmision(valorAdq, valorTrans, gastos);
  res.json({ resultado });
});

export default router;
