import jwt from 'jsonwebtoken';
import dbs from '../models/db';
import validate from '../helpers/transactiontHelper';
import authMiddleware from '../middleware/authMiddleware';


const transactionController = {

    allTransactions(req, res) {
        if (dbs.transactions.length === 0 ) {
            res.status(404).json({status:404, error: 'No BANKA transaction recorded yet !!'});
          }
          else{
             res.status(200).json({status:200, data:dbs.transactions});
          }           

    },

    makeCreditTransaction(req, res) {
        const { error } = validate.validatetransaction(req.body);
        if (error) return res.status(400).json({ status: 400, error: error.details[0].message });

        let foundAcc = dbs.accounts.find( found => found.accountNumber === parseInt(req.params.accountNumber));
        if(!foundAcc) return res.status(404).json({ status:404, error: `Bank account number ## ${req.params.accountNumber} ## not found !` });

        else{
            const transaction = {
                transactionId:dbs.transactions.length +1,
                createdOn:new Date(),
                transactionType:"credit", 
                accountNumber:req.params.accountNumber,
                cashier:req.body.cashier,
                amount:parseFloat(req.body.amount),
                accountBalance:foundAcc.balance + (parseFloat(req.body.amount)),
          };
          var index = 0;
          dbs.accounts.forEach((account) => {
            if (account.accountNumber == req.params.accountNumber) {
              dbs.accounts[index].balance = transaction.accountBalance;
            }
  
            index++;
          });
  
           dbs.transactions.push(transaction);
            res.status(200).json({success:200, data: transaction});
        }
    },

    makeDebitTransaction(req, res) {
        const { error } = validate.validatetransaction(req.body);
        if (error) return res.status(400).json({ status: 400, error: error.details[0].message });

        let foundAcc = dbs.accounts.find( found => found.accountNumber === parseInt(req.params.accountNumber));
        if(!foundAcc) return res.status(404).json({ status:404, error: `Bank account number ## ${req.params.accountNumber} ## not found !` });

        else if (foundAcc.balance < parseFloat(req.body.amount)) {
            res.status(400).json({error:400, message: `Insufficient amount ## ${foundAcc.balance} ##!? Please recharge your balance !!`});
          }

        else{
            const transaction = {
                transactionId:dbs.transactions.length +1,
                createdOn:new Date(),
                transactionType:"Debit", 
                accountNumber:req.params.accountNumber,
                cashier:req.body.cashier,
                amount:parseFloat(req.body.amount),
                accountBalance:foundAcc.balance - (parseFloat(req.body.amount)),
          };
          var index = 0;
          dbs.accounts.forEach((account) => {
            if (account.accountNumber == req.params.accountNumber) {
              dbs.accounts[index].balance = transaction.accountBalance;
            }
  
            index++;
          });
  
           dbs.transactions.push(transaction);
            res.status(200).json({success:200, data: transaction});
        }
    },

}
export default transactionController;