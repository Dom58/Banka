import express from 'express';
import userController from '../controllers/UserController';
import authMiddleware from '../middleware/authMiddleware';

const route = express.Router();

route.patch('/api/v1/staff/:id',authMiddleware, userController.createStaff);

export default route;