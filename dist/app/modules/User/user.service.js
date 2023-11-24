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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserServices = void 0;
const user_model_1 = require("./user.model");
//create new user
const createUserInfoDB = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.UserModel.create(userData);
    return result;
});
//get all users from database
const getAllUserFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.UserModel.find({});
    return result;
});
//get single user from database
const getSingleUserFromDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.UserModel.findOne({ userId });
    //using static method check user existence
    if (!(yield user_model_1.UserModel.isUserExist(userId))) {
        const error = new Error('User not found');
        error.code = 404;
        error.description = 'User not found!';
        throw error;
    }
    return result;
});
//update user into database
const updateUserIntoDB = (userId, updatedData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.UserModel.updateOne({ userId }, updatedData);
    //using static method check user existence
    if (!(yield user_model_1.UserModel.isUserExist(userId))) {
        const error = new Error('User not found');
        error.code = 404;
        error.description = 'User not found!';
        throw error;
    }
    return result;
});
//delete user from database
const deleteUserFromDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    //using static method check user existence
    if (!(yield user_model_1.UserModel.isUserExist(userId))) {
        const error = new Error('User not found');
        error.code = 404;
        error.description = 'User not found!';
        throw error;
    }
    const result = yield user_model_1.UserModel.deleteOne({ userId });
    return result;
});
//add new product in order
const addNewProductInOrder = (userId, order) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.UserModel.findOneAndUpdate({ userId: userId }, { $push: { orders: order } }, { new: true });
    //using static method check user existence
    if (!(yield user_model_1.UserModel.isUserExist(userId))) {
        const error = new Error('User not found');
        error.code = 404;
        error.description = 'User not found!';
        throw error;
    }
    return result;
});
//Retrieve all orders for specific user
const retrieveAllOrders = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.UserModel.findOne({ userId });
    if (!(yield user_model_1.UserModel.isUserExist(userId))) {
        const error = new Error('User not found');
        error.code = 404;
        error.description = 'User not found!';
        throw error;
    }
    return result;
});
//Get total price of orders
const totalPriceOfOrder = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const user = yield user_model_1.UserModel.findOne({ userId });
    //using static method check user existence
    if (!(yield user_model_1.UserModel.isUserExist(userId))) {
        const error = new Error('User not found');
        error.code = 404;
        error.description = 'User not found!';
        throw error;
    }
    const totalPrice = (_a = user === null || user === void 0 ? void 0 : user.orders) === null || _a === void 0 ? void 0 : _a.reduce((total, order) => {
        return total + order.price * order.quantity;
    }, 0);
    return totalPrice;
});
exports.UserServices = {
    createUserInfoDB,
    getAllUserFromDB,
    getSingleUserFromDB,
    updateUserIntoDB,
    deleteUserFromDB,
    addNewProductInOrder,
    retrieveAllOrders,
    totalPriceOfOrder,
};
