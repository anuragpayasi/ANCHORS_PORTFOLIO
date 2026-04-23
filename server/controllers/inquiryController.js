import asyncHandler from 'express-async-handler';
import Inquiry from '../models/Inquiry.js';
import { sendInquiryEmail } from '../config/mailer.js';

export const createInquiry = asyncHandler(async (req, res) => {
  const inquiry = await Inquiry.create(req.body);

  try {
    await sendInquiryEmail(inquiry);
    inquiry.emailSent = true;
    await inquiry.save();
  } catch (error) {
    error.statusCode = 500;
    throw error;
  }

  res.status(201).json({ success: true, inquiry });
});

export const getInquiries = asyncHandler(async (_req, res) => {
  const inquiries = await Inquiry.find().sort({ createdAt: -1 });
  res.status(200).json({ success: true, inquiries });
});
