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
exports.UserControllers = void 0;
const user_service_1 = require("./user.service");
const user_validation_1 = __importDefault(require("./user.validation"));
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const zodValidatedData = user_validation_1.default.parse(data);
        const result = yield user_service_1.UserServices.createUserInfoDB(zodValidatedData);
        res.status(200).json({
            success: true,
            message: 'User Created Successfully',
            data: {
                userId: result === null || result === void 0 ? void 0 : result.userId,
                username: result === null || result === void 0 ? void 0 : result.username,
                fullName: result === null || result === void 0 ? void 0 : result.fullName,
                age: result === null || result === void 0 ? void 0 : result.age,
                email: result === null || result === void 0 ? void 0 : result.email,
                isActive: result === null || result === void 0 ? void 0 : result.isActive,
                hobbies: result === null || result === void 0 ? void 0 : result.hobbies,
                address: result === null || result === void 0 ? void 0 : result.address,
            },
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message || 'Something went wrong',
            error: err,
        });
    }
});
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield user_service_1.UserServices.getAllUserFromDB();
        const formattedData = result === null || result === void 0 ? void 0 : result.map((user) => {
            var _a, _b, _c, _d, _e;
            return ({
                username: (user === null || user === void 0 ? void 0 : user.username) || '',
                fullName: {
                    firstName: ((_a = user === null || user === void 0 ? void 0 : user.fullName) === null || _a === void 0 ? void 0 : _a.firstName) || '',
                    lastName: ((_b = user === null || user === void 0 ? void 0 : user.fullName) === null || _b === void 0 ? void 0 : _b.lastName) || '',
                },
                age: (user === null || user === void 0 ? void 0 : user.age) || 0,
                email: (user === null || user === void 0 ? void 0 : user.email) || '',
                address: {
                    street: ((_c = user === null || user === void 0 ? void 0 : user.address) === null || _c === void 0 ? void 0 : _c.street) || '',
                    city: ((_d = user === null || user === void 0 ? void 0 : user.address) === null || _d === void 0 ? void 0 : _d.city) || '',
                    country: ((_e = user === null || user === void 0 ? void 0 : user.address) === null || _e === void 0 ? void 0 : _e.country) || '',
                },
            });
        });
        res.status(200).json({
            success: true,
            message: 'Users fetched successfully!',
            data: formattedData,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message || 'Something wrong',
            error: err,
        });
    }
});
const getSingleUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = Number(req.params.userId);
        const result = yield user_service_1.UserServices.getSingleUserFromDB(userId);
        res.status(200).json({
            success: true,
            message: 'User fetched successfully!',
            data: {
                userId: result === null || result === void 0 ? void 0 : result.userId,
                username: result === null || result === void 0 ? void 0 : result.username,
                fullName: result === null || result === void 0 ? void 0 : result.fullName,
                age: result === null || result === void 0 ? void 0 : result.age,
                email: result === null || result === void 0 ? void 0 : result.email,
                isActive: result === null || result === void 0 ? void 0 : result.isActive,
                hobbies: result === null || result === void 0 ? void 0 : result.hobbies,
                address: result === null || result === void 0 ? void 0 : result.address,
            },
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message || 'Something wrong',
            error: err,
        });
    }
});
const updateUserInformation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = Number(req.params.userId);
        const updatedData = req.body;
        const result = yield user_service_1.UserServices.updateUserIntoDB(userId, updatedData);
        res.status(200).json({
            success: true,
            message: 'User updated successfully!',
            data: result,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message || 'Something wrong',
            error: err,
        });
    }
});
const deleteMatchedUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = Number(req.params.userId);
        yield user_service_1.UserServices.deleteUserFromDB(userId);
        res.status(200).json({
            success: true,
            message: 'User deleted successfully!',
            data: null,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message || 'Something wrong',
            error: err,
        });
    }
});
const addNewOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order = req.body;
        const userId = Number(req.params.userId);
        yield user_service_1.UserServices.addNewProductInOrder(userId, order);
        res.status(200).json({
            success: true,
            message: 'Order created successfully!',
            data: null,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message || 'Something went wrong',
            error: err,
        });
    }
});
const getAllOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = Number(req.params.userId);
        const result = yield user_service_1.UserServices.retrieveAllOrders(userId);
        res.status(200).json({
            success: true,
            message: 'Orders fetched successfully!',
            data: { orders: result === null || result === void 0 ? void 0 : result.orders },
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message || 'Something went wrong',
            error: err,
        });
    }
});
const getTotalPriceOfOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = Number(req.params.userId);
        const result = yield user_service_1.UserServices.totalPriceOfOrder(userId);
        res.status(200).json({
            success: true,
            message: 'Total price calculated successfully!',
            data: { totalPrice: result },
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message || 'Something went wrong',
            error: err,
        });
    }
});
exports.UserControllers = {
    createUser,
    getAllUsers,
    getSingleUser,
    updateUserInformation,
    deleteMatchedUser,
    addNewOrder,
    getAllOrders,
    getTotalPriceOfOrder,
};
