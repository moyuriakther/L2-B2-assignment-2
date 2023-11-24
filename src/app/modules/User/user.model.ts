import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
import {
  IOrder,
  IUser,
  IUserAddress,
  IUserFullName,
  IUserModel,
} from './user.interface';
import config from '../../config';

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
    required: [true, 'Product Name is required'],
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

const userSchema = new Schema<IUser, IUserModel>({
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
    required: [true, 'password is Required'],
  },
  fullName: {
    type: fullNameSchema,
    required: true,
  },
  age: { type: Number },
  email: {
    type: String,
    required: [true, 'Can not accept Duplicate or Invalid email'],
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  hobbies: {
    type: [String],
  },
  address: {
    type: addressSchema,
  },
  orders: {
    type: [orderSchema],
    default: [],
  },
});

//pre save middleware
userSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  // hashing password and save into database
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_round),
  );
  next();
});

//post middleware before got response
userSchema.post('save', async function (doc, next) {
  doc.password = '';
  next();
});

//creating a custom static method
userSchema.statics.isUserExist = async function (userId: string) {
  const existingUser = await UserModel.findOne({ userId });
  return existingUser;
};

//user model create
export const UserModel = model<IUser, IUserModel>('User', userSchema);
