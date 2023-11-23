import express from 'express';
import { UserControllers } from './user.controller';

const router = express.Router();

// all user routers are here
router.post('/users', UserControllers.createUser);
router.get('/users', UserControllers.getAllUsers);
router.get('/users/:userId', UserControllers.getSingleUser);
router.delete('/users/:userId', UserControllers.deleteMatchedUser);
router.put('/users/:userId', UserControllers.updateUserInformation);

export const UserRoutes = router;
