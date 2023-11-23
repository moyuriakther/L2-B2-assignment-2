import { Request, Response } from 'express';
import { UserServices } from './user.service';

const createUser = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const result = await UserServices.createUserInfoDB(data);
    res.status(200).json({
      success: true,
      message: 'User Created Successfully',
      data: result,
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
    res.status(200).json({
      success: true,
      message: 'Users fetched successfully!',
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

const getSingleUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const result = await UserServices.getSingleUserFromDB(userId);
    res.status(200).json({
      success: true,
      message: 'User fetched successfully!',
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

export const UserControllers = {
  createUser,
  getAllUsers,
  getSingleUser,
};
