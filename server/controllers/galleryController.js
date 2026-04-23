import asyncHandler from 'express-async-handler';
import GalleryItem from '../models/GalleryItem.js';

export const getGalleryItems = asyncHandler(async (_req, res) => {
  const items = await GalleryItem.find().sort({ createdAt: -1 });
  res.status(200).json({ success: true, items });
});

export const createGalleryItem = asyncHandler(async (req, res) => {
  const type = req.body.type || (req.file ? 'image' : 'youtube');

  const galleryItem = await GalleryItem.create({
    title: req.body.title,
    category: req.body.category,
    type,
    image: req.file ? `/uploads/${req.file.filename}` : '',
    youtubeUrl: req.body.youtubeUrl || '',
  });

  res.status(201).json({ success: true, item: galleryItem });
});

export const deleteGalleryItem = asyncHandler(async (req, res) => {
  const item = await GalleryItem.findById(req.params.id);

  if (!item) {
    const error = new Error('Gallery item not found');
    error.statusCode = 404;
    throw error;
  }

  await item.deleteOne();
  res.status(200).json({ success: true, message: 'Gallery item deleted' });
});
