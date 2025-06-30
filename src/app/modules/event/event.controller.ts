import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { Request, Response } from 'express';
import { EventService } from './event.service';

const createEventIntoDB = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.user;
  const result = await EventService.createEventIntoDB(req.body, id);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Event created successfully!',
    data: result,
  });
});

const getAllEventIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await EventService.getAllEventIntoDB(req.query);
  const { meta, result: data } = result;

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Event retrieved successfully!',
    meta,
    data,
  });
});

const getSingleEventFromDB = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await EventService.getSingleEventFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Event retrieved successfully!',
    data: result,
  });
});
const updateEventFromDB = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await EventService.updateEventFromDB(req.user, id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Event Update successfully!',
    data: result,
  });
});

const delateEventFromDB = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await EventService.delateEventFromDB(req.user, id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Event delate successfully!',
    data: result,
  });
});
const bulkDelateFromDB = catchAsync(async (req, res) => {
  const result = await EventService.bulkDeleteFromDB(req.user, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Events delate successfully!',
    data: result,
  });
});

const attendEventById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.user;
  const { eventId } = req.body;
  const result = await EventService.attendEventById(id, eventId);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Event Booked successfully!',
    data: result,
  });
});
const getMyBookedEvents = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.user;
  const result = await EventService.getMyBookedEvents(id, req.query);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Booked Event Retrieved successfully!',
    meta: result.meta,
    data: result.data,
  });
});

export const EventController = {
  createEventIntoDB,
  getAllEventIntoDB,
  getSingleEventFromDB,
  updateEventFromDB,
  delateEventFromDB,
  bulkDelateFromDB,
  attendEventById,
  getMyBookedEvents,
};
