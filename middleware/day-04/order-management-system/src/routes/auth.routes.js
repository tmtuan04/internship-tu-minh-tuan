import express from 'express';
import { signup, signin } from '../controllers/auth.controller.js';
import { validateSignup } from '../middleware/validate.middleware.js';     

const router = express.Router();

router.post('/login', signin);

router.post('/register', validateSignup, signup);

export default router;