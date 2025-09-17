import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { detectLang } from '../middlewares/lang.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(detectLang);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date() });
});

// TODO: importar rutas de módulos
import userRoutes from '../routes/userRoutes.js';
app.use('/api/usuarios', userRoutes);

import authRoutes from '../routes/authRoutes.js';
app.use('/api/auth', authRoutes);

import holderRoutes from '../routes/holderRoutes.js';
import propertyRoutes from '../routes/propertyRoutes.js';
import declarationRoutes from '../routes/declarationRoutes.js';
app.use('/api/titulares', holderRoutes);
app.use('/api/inmuebles', propertyRoutes);
app.use('/api/declaraciones210', declarationRoutes);

import transmissionRoutes from '../routes/transmissionRoutes.js';
import incomeRoutes from '../routes/incomeRoutes.js';
import deductionRoutes from '../routes/deductionRoutes.js';
app.use('/api/transmisiones', transmissionRoutes);
app.use('/api/rentas', incomeRoutes);
app.use('/api/deducciones', deductionRoutes);

import reportRoutes from '../routes/reportRoutes.js';
app.use('/api/report', reportRoutes);

import calculoRoutes from '../routes/calculoRoutes.js';
app.use('/api/calculo', calculoRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`PodatkiwHiszpanii backend escuchando en puerto ${PORT}`);
});
