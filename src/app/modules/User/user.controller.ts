import { Request, Response } from 'express';
import { UserServices } from './user.service';
import userValidationSchema from './user.validation';

const createUser = async (req: Request, res: Response) => {
  try {
    const data = req.body;

    const zodValidatedData = userValidationSchema.parse(data);
    const result = await UserServices.createUserInfoDB(zodValidatedData);

    res.status(200).json({
      success: true,
      message: 'User Created Successfully',
      data: {
        userId: result?.userId,
        username: result?.username,
        fullName: result?.fullName,
        age: result?.age,
        email: result?.email,
        isActive: result?.isActive,
        hobbies: result?.hobbies,
        address: result?.address,
      },
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong',
      error: err,
    });
  }
};

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await UserServices.getAllUserFromDB();
    const formattedData = result?.map((user) => ({
      username: user?.username || '',
      fullName: {
        firstName: user?.fullName?.firstName || '',
        lastName: user?.fullName?.lastName || '',
      },
      age: user?.age || 0,
      email: user?.email || '',
      address: {
        street: user?.address?.street || '',
        city: user?.address?.city || '',
        country: user?.address?.country || '',
      },
    }));
    res.status(200).json({
      success: true,
      message: 'Users fetched successfully!',
      data: formattedData,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something wrong',
      error: err,
    });
  }
};

const getSingleUser = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId);
    const result = await UserServices.getSingleUserFromDB(userId);
    res.status(200).json({
      success: true,
      message: 'User fetched successfully!',
      data: {
        userId: result?.userId,
        username: result?.username,
        fullName: result?.fullName,
        age: result?.age,
        email: result?.email,
        isActive: result?.isActive,
        hobbies: result?.hobbies,
        address: result?.address,
      },
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something wrong',
      error: err,
    });
  }
};

const updateUserInformation = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId);
    const updatedData = req.body;
    const result = await UserServices.updateUserIntoDB(userId, updatedData);
    res.status(200).json({
      success: true,
      message: 'User updated successfully!',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something wrong',
      error: err,
    });
  }
};

const deleteMatchedUser = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId);
    await UserServices.deleteUserFromDB(userId);
    res.status(200).json({
      success: true,
      message: 'User deleted successfully!',
      data: null,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something wrong',
      error: err,
    });
  }
};

const addNewOrder = async (req: Request, res: Response) => {
  try {
    const order = req.body;
    const userId = Number(req.params.userId);
    await UserServices.addNewProductInOrder(userId, order);
    res.status(200).json({
      success: true,
      message: 'Order created successfully!',
      data: null,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong',
      error: err,
    });
  }
};

const getAllOrders = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId);
    const result = await UserServices.retrieveAllOrders(userId);
    res.status(200).json({
      success: true,
      message: 'Orders fetched successfully!',
      data: { orders: result?.orders },
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong',
      error: err,
    });
  }
};

const getTotalPriceOfOrder = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId);
    const result = await UserServices.totalPriceOfOrder(userId);
    res.status(200).json({
      success: true,
      message: 'Total price calculated successfully!',
      data: { totalPrice: result },
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong',
      error: err,
    });
  }
};

export const UserControllers = {
  createUser,
  getAllUsers,
  getSingleUser,
  updateUserInformation,
  deleteMatchedUser,
  addNewOrder,
  getAllOrders,
  getTotalPriceOfOrder,
};
