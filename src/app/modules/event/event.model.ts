import { Schema, model } from 'mongoose';
import { TEvent } from './event.interface';

const eventSchema = new Schema<TEvent>(
  {
    title: {
      type: String,
      required: [true, 'Event title is required'],
      trim: true,
      maxlength: [100, 'Title cannot exceed 100 characters'],
    },
    date: {
      type: Date,
      required: [true, 'Event date is required'],
      index: true, // For better performance on date queries
    },
    time: {
      type: String,
      required: [true, 'please provide event time!'],
    },
    location: {
      type: String,
      required: [true, 'Location is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
      maxlength: [500, 'Description cannot exceed 500 characters'],
    },
    availability: {
      type: Boolean,
      default: true,
    },
    attendCount: {
      type: Number,
      default: 0,
      min: [0, 'Attendee count cannot be negative'],
    },
    creatorId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    attendees: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  { timestamps: true },
);
eventSchema.index({ title: 'text', description: 'text', location: 'text' });
eventSchema.index({ date: -1 });
export const Event = model<TEvent>('Event', eventSchema);
