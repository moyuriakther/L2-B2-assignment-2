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
  if (!(await UserModel.isUserExist(userId))) {
    const error = new Error('User not found');
    (error as any).code = 404;
    (error as any).description = 'User not found!';
    throw error;
  }
  return result;
  //   const result = await UserModel.aggregate([{ $match: { userId: userId } }]);
};

const updateUserIntoDB = async (userId: string, updatedData: IUser) => {
  const result = await UserModel.updateOne({ userId }, updatedData);
  if (!(await UserModel.isUserExist(userId))) {
    const error = new Error('User not found');
    (error as any).code = 404;
    (error as any).description = 'User not found!';
    throw error;
  }
  return result;
};

const deleteUserFromDB = async (userId: string) => {
  if (!(await UserModel.isUserExist(userId))) {
    const error = new Error('User not found');
    (error as any).code = 404;
    (error as any).description = 'User not found!';
    throw error;
  }
  const result = await UserModel.deleteOne({ userId });
  return result;
};

export const UserServices = {
  createUserInfoDB,
  getAllUserFromDB,
  getSingleUserFromDB,
  updateUserIntoDB,
  deleteUserFromDB,
};
