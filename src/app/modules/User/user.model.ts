import { Schema, model } from 'mongoose';
import { IOrder, IUser, IUserAddress, IUserFullName } from './user.interface';

const fullNameSchema = new Schema<IUserFullName>({
  firstName: {
    type: String,
    required: [true, 'First Name is required'],
    maxlength: [15, 'First name can not be more then 15 words'],
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, 'Last Name is required'],
    maxlength: [15, 'Last name can not be more then 15 words'],
    trim: true,
  },
});

const addressSchema = new Schema<IUserAddress>({
  street: {
    type: String,
    required: [true, 'Street is required'],
  },
  city: {
    type: String,
    required: [true, 'City is required'],
  },
  country: {
    type: String,
    required: [true, 'Country is required'],
  },
});

const orderSchema = new Schema<IOrder>({
  productName: {
    type: String,
    required: [true, 'Product name is required'],
  },
  price: {
    type: Number,
    required: [true, 'Product Price is required'],
  },
  quantity: {
    type: Number,
    required: [true, 'Product Quantity is required'],
  },
});

const userSchema = new Schema<IUser>({
  userId: {
    type: String,
    unique: true,
    required: [true, 'Can not accept duplicate id'],
  },
  username: {
    type: String,
    unique: true,
    required: [true, 'Can not accept duplicate username'],
  },
  password: {
    type: String,
    required: [true, 'Email is Required'],
  },
  fullName: {
    type: fullNameSchema,
    required: true,
  },
  age: { type: Number },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  hobbies: {
    type: [String],
    required: true,
  },
  address: {
    type: addressSchema,
    required: true,
  },
  orders: {
    type: orderSchema,
  },
});

//user model create
export const UserModel = model<IUser>('User', userSchema);

//order model create
export const OrderModel = model<IOrder>('Order', orderSchema);
