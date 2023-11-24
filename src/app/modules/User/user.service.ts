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
const getSingleUserFromDB = async (userId: number) => {
  const result = await UserModel.findOne({ userId });
  //using static method check user existence
  if (!(await UserModel.isUserExist(userId))) {
    const error = new Error('User not found');
    (error as any).code = 404;
    (error as any).description = 'User not found!';
    throw error;
  }
  return result;
};

//update user into database
const updateUserIntoDB = async (userId: number, updatedData: IUser) => {
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
const deleteUserFromDB = async (userId: number) => {
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
const addNewProductInOrder = async (userId: number, order: IOrder) => {
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
const retrieveAllOrders = async (userId: number) => {
  const result = await UserModel.findOne({ userId });
  if (!(await UserModel.isUserExist(userId))) {
    const error = new Error('User not found');
    (error as any).code = 404;
    (error as any).description = 'User not found!';
    throw error;
  }
  return result;
};

//Get total price of orders
const totalPriceOfOrder = async (userId: number) => {
  const user = await UserModel.findOne({ userId });

  //using static method check user existence
  if (!(await UserModel.isUserExist(userId))) {
    const error = new Error('User not found');
    (error as any).code = 404;
    (error as any).description = 'User not found!';
    throw error;
  }

  const totalPrice = user?.orders?.reduce((total, order) => {
    return total + order.price * order.quantity;
  }, 0);
  return totalPrice;
};

export const UserServices = {
  createUserInfoDB,
  getAllUserFromDB,
  getSingleUserFromDB,
  updateUserIntoDB,
  deleteUserFromDB,
  addNewProductInOrder,
  retrieveAllOrders,
  totalPriceOfOrder,
};
