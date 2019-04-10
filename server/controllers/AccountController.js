import jwt from 'jsonwebtoken';
import validate from '../helpers/accountHelper';
import dbs from '../models/db';
import authMiddleware from '../middleware/authMiddleware';

const accountController = {

    allAccounts(req, res) {
        if (!dbs.accounts.length) return res.status(404).json({ status: 404, message: 'No account created!' });
        return res.status(200).json({ status: 200, data: dbs.accounts });
    },

    createAccount(req, res) {
        function randomInt() {
            return Math.floor(Math.random() * (9999999999 - 1000000000) + 1000000000);
          }
          var balance = 0;
        //   const randomNmber = Math.floor(Math.random() * 10;

        const { error } = validate.validateAccount(req.body);
        if (error) return res.status(400).json({ status: 400, error: error.details[0].message });
        
        else{
            const account = {
            id:dbs.accounts.length +1,
            accountNumber:parseInt(randomInt()),
            createdOn:new Date(),
            user_id:1,
            type:req.body.type, 
            status:"active", 
            balance:parseFloat(balance)
        };
        dbs.accounts.push(account);
        res.status(200).send(account);
        }
    },

    


}

export default accountController;