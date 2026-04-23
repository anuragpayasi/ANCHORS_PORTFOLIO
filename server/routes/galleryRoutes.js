import { Router } from 'express';
import { body } from 'express-validator';
import { createGalleryItem, deleteGalleryItem, getGalleryItems } from '../controllers/galleryController.js';
import upload from '../config/multer.js';
import { protect } from '../middleware/authMiddleware.js';
import validate from '../middleware/validateMiddleware.js';

const router = Router();

router.get('/', getGalleryItems);

router.post(
  '/',
  protect,
  upload.single('image'),
  [
    body('title').notEmpty().withMessage('Title is required'),
    body('category').notEmpty().withMessage('Category is required'),
    body('type').optional().isIn(['image', 'youtube']).withMessage('Type must be image or youtube'),
    body('youtubeUrl').optional().isURL().withMessage('YouTube URL must be valid'),
  ],
  validate,
  createGalleryItem
);

router.delete('/:id', protect, deleteGalleryItem);

export default router;
