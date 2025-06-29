/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { JwtPayload } from 'jsonwebtoken';
import { TUser } from './user.interface';
import { User } from './user.model';

// createUserIntoDB
const createUserIntoDB = async (payload: TUser) => {
  const result = await User.create(payload);
  // send response withOut password and role
  const { password, ...userData } = result.toObject();
  return userData;
};

// get single user
const getUserById = async (id: string) => {
  const result = await User.findById({ _id: id });
  return result;
};

// update User
const updateUserFromDB = async (id: JwtPayload, data: Partial<TUser>) => {
  const result = await User.findByIdAndUpdate(id, data, { new: true });
  return result;
};

// User Profile
const getMyProfileIntoDB = async (user: JwtPayload) => {
const result= await User.findById({_id:user.id})

return result
};

export const UserService = {
  createUserIntoDB,
  getUserById,
  updateUserFromDB,
  getMyProfileIntoDB
};
