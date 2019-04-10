import express from 'express';
import userController from '../controllers/userController';
const path = require('path');
const route = express.Router();

route.post('/api/v1/auth/signup', userController.signUp);
route.post('/api/v1/auth/signin', userController.signIn);

export default route;
