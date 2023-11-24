import { IOrder, IUser } from './user.interface';
import { UserModel } from './user.model';

//create new user
const createUserInfoDB = async (userData: IUser) => {
  const result = await UserModel.create(userData);
  return result;
};

//get all users from database
const getAllUserFromDB = async () => {
  const result = await UserModel.find({});
  return result;
};

//get single user from database
const getSingleUserFromDB = async (userId: string) => {
  const result = await UserModel.findOne({ userId });
  //using static method check user existence
  if (!(await UserModel.isUserExist(userId))) {
    const error = new Error('User not found');
    (error as any).code = 404;
    (error as any).description = 'User not found!';
    throw error;
  }
  return result;
  //   const result = await UserModel.aggregate([{ $match: { userId: userId } }]);
};

//update user into database
const updateUserIntoDB = async (userId: string, updatedData: IUser) => {
  const result = await UserModel.updateOne({ userId }, updatedData);
  //using static method check user existence
  if (!(await UserModel.isUserExist(userId))) {
    const error = new Error('User not found');
    (error as any).code = 404;
    (error as any).description = 'User not found!';
    throw error;
  }
  return result;
};

//delete user from database
const deleteUserFromDB = async (userId: string) => {
  //using static method check user existence
  if (!(await UserModel.isUserExist(userId))) {
    const error = new Error('User not found');
    (error as any).code = 404;
    (error as any).description = 'User not found!';
    throw error;
  }
  const result = await UserModel.deleteOne({ userId });
  return result;
};

//add new product in order
const addNewProductInOrder = async (userId: string, order: IOrder) => {
  const result = await UserModel.findOneAndUpdate(
    { userId: userId },
    { $push: { orders: order } },
    { new: true },
  );

  //using static method check user existence
  if (!(await UserModel.isUserExist(userId))) {
    const error = new Error('User not found');
    (error as any).code = 404;
    (error as any).description = 'User not found!';
    throw error;
  }

  return result;
};

//Retrieve all orders for specific user
const retrieveAllOrders = async (userId: string) => {
  const result = await UserModel.findOne({ userId });
  if (!(await UserModel.isUserExist(userId))) {
    const error = new Error('User not found');
    (error as any).code = 404;
    (error as any).description = 'User not found!';
    throw error;
  }
  return result;
};

export const UserServices = {
  createUserInfoDB,
  getAllUserFromDB,
  getSingleUserFromDB,
  updateUserIntoDB,
  deleteUserFromDB,
  addNewProductInOrder,
  retrieveAllOrders,
};
