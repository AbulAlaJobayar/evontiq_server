import { Types } from "mongoose";

export type TEvent = {
  title:string;
  name: string;
  date:string|Date; // Using Date or string to allow flexibility in input format
  time:string;
  location: string;
  description: string;
  attendCount:number;
  availability: boolean;
  creatorId?:Types.ObjectId;
  attendees?: Types.ObjectId[];  
};
