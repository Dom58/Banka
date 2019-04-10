import express from 'express';
import userController from '../controllers/userController';
import authMiddleware from '../middleware/authMiddleware';

const path = require('path');
const route = express.Router();

route.post('/api/v1/auth/signup',authMiddleware, userController.signUp);
route.post('/api/v1/auth/signin', userController.signIn);

export default route;
