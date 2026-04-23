import { Router } from 'express';
import { body } from 'express-validator';
import {
  createFeedback,
  getAllFeedback,
  getApprovedFeedback,
  updateFeedbackStatus,
} from '../controllers/feedbackController.js';
import upload from '../config/multer.js';
import { protect } from '../middleware/authMiddleware.js';
import validate from '../middleware/validateMiddleware.js';

const router = Router();

router.get('/', getApprovedFeedback);
router.get('/admin', protect, getAllFeedback);

router.post(
  '/',
  upload.single('image'),
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
    body('message').isLength({ min: 10 }).withMessage('Message must be at least 10 characters'),
  ],
  validate,
  createFeedback
);

router.patch(
  '/:id/status',
  protect,
  [body('status').isIn(['approved', 'rejected']).withMessage('Invalid status')],
  validate,
  updateFeedbackStatus
);

export default router;
