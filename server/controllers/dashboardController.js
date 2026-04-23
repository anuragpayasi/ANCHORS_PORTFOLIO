import asyncHandler from 'express-async-handler';
import Event from '../models/Event.js';
import Feedback from '../models/Feedback.js';
import GalleryItem from '../models/GalleryItem.js';
import Inquiry from '../models/Inquiry.js';

export const getDashboardStats = asyncHandler(async (_req, res) => {
  const [events, galleryItems, inquiries, pendingFeedback, approvedFeedback] = await Promise.all([
    Event.countDocuments(),
    GalleryItem.countDocuments(),
    Inquiry.countDocuments(),
    Feedback.countDocuments({ status: 'pending' }),
    Feedback.countDocuments({ status: 'approved' }),
  ]);

  res.status(200).json({
    success: true,
    stats: {
      events,
      galleryItems,
      inquiries,
      pendingFeedback,
      approvedFeedback,
    },
  });
});
