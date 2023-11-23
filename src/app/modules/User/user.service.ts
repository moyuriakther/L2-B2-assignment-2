import { IUser } from './user.interface';
import { UserModel } from './user.model';

const createUserInfoDB = async (userData: IUser) => {
  const result = await UserModel.create(userData);
  return result;
};

const getAllUserFromDB = async () => {
  const result = await UserModel.find({});
  return result;
};

const getSingleUserFromDB = async (userId: string) => {
  const result = await UserModel.findOne({ userId });
  return result;
};

export const UserServices = {
  createUserInfoDB,
  getAllUserFromDB,
  getSingleUserFromDB,
};
