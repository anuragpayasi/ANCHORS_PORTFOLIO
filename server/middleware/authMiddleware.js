import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import Admin from '../models/Admin.js';

export const protect = asyncHandler(async (req, _res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    const error = new Error('Not authorized');
    error.statusCode = 401;
    throw error;
  }

  const token = authHeader.split(' ')[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const admin = await Admin.findById(decoded.id).select('-password');

  if (!admin) {
    const error = new Error('Admin not found');
    error.statusCode = 401;
    throw error;
  }

  req.admin = admin;
  next();
});
