import { Model } from 'mongoose';

export type IUserFullName = {
  firstName: string;
  lastName: string;
};

export type IUserAddress = {
  street: string;
  city: string;
  country: string;
};

export type IOrder = {
  productName: string;
  price: number;
  quantity: number;
};

export type IUser = {
  userId: string;
  username: string;
  password: string;
  fullName: IUserFullName;
  age: number;
  email: string;
  isActive: boolean;
  hobbies: string[];
  address: IUserAddress;
  orders?: IOrder[];
};

//for creating static
export interface IUserModel extends Model<IUser> {
  isUserExist(id: string): Promise<IUser | null>;
}
