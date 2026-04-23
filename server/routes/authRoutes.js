import { Router } from 'express';
import { body } from 'express-validator';
import { getMe, loginAdmin } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';
import validate from '../middleware/validateMiddleware.js';

const router = Router();

router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters'),
  ],
  validate,
  loginAdmin
);

router.get('/me', protect, getMe);

export default router;
