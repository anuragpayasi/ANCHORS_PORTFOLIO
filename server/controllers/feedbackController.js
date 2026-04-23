import asyncHandler from 'express-async-handler';
import Feedback from '../models/Feedback.js';

export const getApprovedFeedback = asyncHandler(async (_req, res) => {
  const feedback = await Feedback.find({ status: 'approved' }).sort({ createdAt: -1 });
  res.status(200).json({ success: true, feedback });
});

export const createFeedback = asyncHandler(async (req, res) => {
  const feedback = await Feedback.create({
    ...req.body,
    image: req.file ? `/uploads/${req.file.filename}` : '',
  });

  res.status(201).json({ success: true, feedback });
});

export const getAllFeedback = asyncHandler(async (_req, res) => {
  const feedback = await Feedback.find().sort({ createdAt: -1 });
  res.status(200).json({ success: true, feedback });
});

export const updateFeedbackStatus = asyncHandler(async (req, res) => {
  const feedback = await Feedback.findById(req.params.id);

  if (!feedback) {
    const error = new Error('Feedback not found');
    error.statusCode = 404;
    throw error;
  }

  feedback.status = req.body.status;
  await feedback.save();
  res.status(200).json({ success: true, feedback });
});
