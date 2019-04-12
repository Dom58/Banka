import express from 'express';
import accountController from '../controllers/AccountController';
import authMiddleware from '../middleware/authMiddleware';

const path = require('path');
const route = express.Router();



//Banka Account APIs
route.get('/api/v1/accounts',authMiddleware, accountController.allAccounts);
route.post('/api/v1/accounts',authMiddleware, accountController.createAccount);
route.delete('/api/v1/accounts/:accountNumber',authMiddleware, accountController.deleteAccount);
route.patch('/api/v1/accounts/:accountNumber',authMiddleware, accountController.activateAccount);

export default route;