/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { JwtPayload } from 'jsonwebtoken';
import QueryBuilder from '../../builder/QueryBuilder';
import { User } from '../User/user.model';
import AppError from '../../utils/AppError';
import httpStatus from 'http-status';
import { TEvent } from './event.interface';
import { Event } from './event.model';
import { Types } from 'mongoose';

const createEventIntoDB = async (
  payload: TEvent,
  creatorId: Types.ObjectId,
) => {
  const dateStr =
    typeof payload.date === 'string'
      ? payload.date
      : payload.date.toISOString().split('T')[0];
  const [year, month, day] = dateStr.split('-').map(Number);

  // Parse the time part (HH:MM AM/PM)
  let [time, period] = payload.time.split(' ');
  let [hours, minutes] = time.split(':').map(Number);

  // Convert 12-hour format to 24-hour format
  if (period === 'PM' && hours < 12) hours += 12;
  if (period === 'AM' && hours === 12) hours = 0;

  // Create date in UTC to avoid timezone conversion
  const eventDate = new Date(
    Date.UTC(
      year,
      month - 1, // months are 0-indexed
      day,
      hours,
      minutes,
    ),
  );

  // Validate the date
  if (isNaN(eventDate.getTime())) {
    throw new Error('Invalid date/time combination');
  }
  payload.creatorId = creatorId;
  payload.date = eventDate;

  const result = await Event.create(payload);
  return result;
};

const getAllEventIntoDB = async (query: any) => {
  const eventQuery = new QueryBuilder(Event.find().populate('creatorId'), query)
    .search(['title', 'description'])
    .filter()
    .sort()
    .sortBy()
    .paginate()
    .fields();

  const result = await eventQuery.modelQuery;
  const meta = await eventQuery.countTotal();
  
  return {
    meta,
    data:result
  }
};

const getSingleEventFromDB = async (id: string) => {
  const result = await Event.findById(id);
  return result;
};

const updateEventFromDB = async (
  userData: JwtPayload,
  id: string,
  payload: Partial<TEvent>,
) => {
  const { id: tokenId, email } = userData;
  const user = await User.findOne({ _id: tokenId });
  if (!user?.email === email) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  const result = await Event.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

const delateEventFromDB = async (userData: JwtPayload, id: string) => {
  const { id: tokenId, email } = userData;
  const user = await User.findOne({ _id: tokenId });
  if (!user?.email === email) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  await Event.findByIdAndDelete(id);
  return null;
};

const bulkDeleteFromDB = async (userData: JwtPayload, itemIds: string[]) => {
  const { id: tokenId, email } = userData;
  const user = await User.findOne({ _id: tokenId });
  if (!user?.email === email) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  const result = await Event.deleteMany({ _id: { $in: itemIds } });
  return result.deletedCount;
};

const attendEventById = async (
  userId: Types.ObjectId,
  eventId: Types.ObjectId,
) => {
  const event = await Event.findById({ _id: eventId, availability: true });
  if (!event) {
    throw new AppError(httpStatus.NOT_FOUND, 'event not found');
  }
  if (event.attendees?.includes(userId)) {
    throw new AppError(
      httpStatus.CONFLICT,
      'You have already booked this event',
    );
  }
  const result = await Event.findByIdAndUpdate(
    { _id: event._id },
    {
      $addToSet: { attendees: userId },
      $inc: { attendCount: 1 },
    },
    {
      new: true,
      runValidators: true,
    },
  );
  return result;
};

const getMyBookedEvents = async (id: Types.ObjectId, query: any) => {
  const eventQuery = new QueryBuilder(Event.find({ creatorId: id }), query)
    .search(['title', 'description', 'location'])
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = await eventQuery.modelQuery;
  const meta = await eventQuery.countTotal();
  const data = result.map((doc: any) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
    const { attendees, ...rest } = doc.toObject({ versionKey: false });
    return rest;
  });

  return {
    meta,
    data,
  };
};

export const EventService = {
  createEventIntoDB,
  getAllEventIntoDB,
  getSingleEventFromDB,
  updateEventFromDB,
  delateEventFromDB,
  bulkDeleteFromDB,
  attendEventById,
  getMyBookedEvents,
};
