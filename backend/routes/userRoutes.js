import express from 'express';
import { User } from '../models/User.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
