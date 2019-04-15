import express from 'express';
import transactionController from '../controllers/TransactionController';
import authMiddleware from '../middleware/authMiddleware';

const path = require('path');
const route = express.Router();

//Banka Transaction APIs
route.get('/api/v1/transactions',authMiddleware, transactionController.allTransactions);
route.post('/api/v1/transactions/:accountNumber/credit',authMiddleware, transactionController. makeCreditTransaction);
route.post('/api/v1/transactions/:accountNumber/debit',authMiddleware, transactionController. makeDebitTransaction);

export default route;