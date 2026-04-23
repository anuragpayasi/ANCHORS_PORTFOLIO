import asyncHandler from 'express-async-handler';
import Event from '../models/Event.js';

export const getEvents = asyncHandler(async (_req, res) => {
  const events = await Event.find().sort({ date: 1 });
  res.status(200).json({ success: true, events });
});

export const createEvent = asyncHandler(async (req, res) => {
  console.log("filedetails",req.file)
  const event = await Event.create({
    ...req.body,
    image: req.file ? `/uploads/${req.file.filename}` : '',
  });

  res.status(201).json({ success: true, event });
});

export const updateEvent = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id);

  if (!event) {
    const error = new Error('Event not found');
    error.statusCode = 404;
    throw error;
  }

  Object.assign(event, req.body);
  if (req.file) {
    event.image = `/uploads/${req.file.filename}`;
  }

  await event.save();
  res.status(200).json({ success: true, event });
});

export const deleteEvent = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id);

  if (!event) {
    const error = new Error('Event not found');
    error.statusCode = 404;
    throw error;
  }

  await event.deleteOne();
  res.status(200).json({ success: true, message: 'Event deleted' });
});
