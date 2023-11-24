import express from 'express';
import { UserControllers } from './user.controller';

const router = express.Router();

// all user routers are here
router.post('/users', UserControllers.createUser);
router.get('/users', UserControllers.getAllUsers);
router.get('/users/:userId', UserControllers.getSingleUser);
router.delete('/users/:userId', UserControllers.deleteMatchedUser);
router.put('/users/:userId', UserControllers.updateUserInformation);
router.put('/users/:userId/orders', UserControllers.addNewOrder);
router.get('/users/:userId/orders', UserControllers.getAllOrders);
router.get(
  '/users/:userId/orders/total-price',
  UserControllers.getTotalPriceOfOrder,
);

export const UserRoutes = router;
