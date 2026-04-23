import { Router } from 'express';
import { body } from 'express-validator';
import { createInquiry, getInquiries } from '../controllers/inquiryController.js';
import { protect } from '../middleware/authMiddleware.js';
import validate from '../middleware/validateMiddleware.js';

const router = Router();

router.get('/admin', protect, getInquiries);

router.post(
  '/',
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('phone').notEmpty().withMessage('Phone is required'),
    body('eventType').notEmpty().withMessage('Event type is required'),
    body('budget').notEmpty().withMessage('Budget is required'),
    body('message').isLength({ min: 10 }).withMessage('Message must be at least 10 characters'),
  ],
  validate,
  createInquiry
);

export default router;
