"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const fullNameValidationSchema = zod_1.z.object({
    firstName: zod_1.z.string().min(1).max(15).trim(),
    lastName: zod_1.z.string().min(1).max(15).trim(),
});
const addressValidationSchema = zod_1.z.object({
    street: zod_1.z.string().min(1),
    city: zod_1.z.string().min(1),
    country: zod_1.z.string().min(1),
});
const orderValidationSchema = zod_1.z.object({
    productName: zod_1.z.string(),
    price: zod_1.z.number(),
    quantity: zod_1.z.number(),
});
const userValidationSchema = zod_1.z.object({
    userId: zod_1.z.string().min(1),
    username: zod_1.z.string().min(1),
    password: zod_1.z.string().min(1),
    fullName: fullNameValidationSchema,
    age: zod_1.z.number(),
    email: zod_1.z.string().email(),
    isActive: zod_1.z.boolean().default(true),
    hobbies: zod_1.z.array(zod_1.z.string()),
    address: addressValidationSchema,
    orders: zod_1.z.array(orderValidationSchema).optional().default([]),
});
exports.default = userValidationSchema;
