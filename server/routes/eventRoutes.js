import { Router } from 'express';
import { body } from 'express-validator';
import { createEvent, deleteEvent, getEvents, updateEvent } from '../controllers/eventController.js';
import { protect } from '../middleware/authMiddleware.js';
import validate from '../middleware/validateMiddleware.js';
import upload from '../config/multer.js';

const router = Router();

router.get('/', getEvents);

router.post(
  '/',
  protect,
  upload.single('image'),
  [
    body('name').notEmpty().withMessage('Event name is required'),
    body('date').isISO8601().withMessage('Valid event date is required'),
    body('location').notEmpty().withMessage('Location is required'),
    body('description').notEmpty().withMessage('Description is required'),
  ],
  validate,
  createEvent
);

router.put(
  '/:id',
  protect,
  upload.single('image'),
  [
    body('name').optional().notEmpty().withMessage('Event name cannot be empty'),
    body('date').optional().isISO8601().withMessage('Valid event date is required'),
    body('location').optional().notEmpty().withMessage('Location cannot be empty'),
    body('description').optional().notEmpty().withMessage('Description cannot be empty'),
  ],
  validate,
  updateEvent
);

router.delete('/:id', protect, deleteEvent);

export default router;
