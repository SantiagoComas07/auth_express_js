import authController from '../controllers/auth.controller';
import express from 'express';

const router = express.Router();

// This is my route of register
router.post('/register',authController.register);

//This is my route of login
router.post('/login', authController.login);


export default router;