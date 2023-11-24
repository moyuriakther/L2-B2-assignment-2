"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = __importDefault(require("../../config"));
const fullNameSchema = new mongoose_1.Schema({
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
const addressSchema = new mongoose_1.Schema({
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
const orderSchema = new mongoose_1.Schema({
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
const userSchema = new mongoose_1.Schema({
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
userSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const user = this;
        // hashing password and save into database
        user.password = yield bcrypt_1.default.hash(user.password, Number(config_1.default.bcrypt_salt_round));
        next();
    });
});
//post middleware before got response
userSchema.post('save', function (doc, next) {
    return __awaiter(this, void 0, void 0, function* () {
        doc.password = '';
        next();
    });
});
//creating a custom static method
userSchema.statics.isUserExist = function (userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const existingUser = yield exports.UserModel.findOne({ userId });
        return existingUser;
    });
};
//user model create
exports.UserModel = (0, mongoose_1.model)('User', userSchema);
