import express from 'express';
import accountController from '../controllers/AccountController';
import authMiddleware from '../middleware/authMiddleware';

const path = require('path');
const route = express.Router();


//Banka Account APIs
route.get('/api/v1/accounts', accountController.allAccounts);
route.post('/api/v1/accounts', accountController.createAccount);
route.delete('/api/v1/accounts/:accountNumber', accountController.deleteAccount);

// route.patch('/api/v1/accounts/:accountNumber', accountController.activateAccount);

export default route;