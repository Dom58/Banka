import jwt from 'jsonwebtoken';
import validate from '../helpers/accountHelper';
import dbs from '../models/db';

const thesecret_code = 'BANKA_JWT_SECRET_CODE';

const accountController = {
    
    allAccounts(req, res) {
        if (!dbs.accounts.length) return res.status(404).json({ status: 404, message: 'No account created!' });
        return res.status(200).json({ status: 200, data: dbs.accounts });
    },

    createAccount(req, res) {
        // const token = jwt.sign(req.user, `${thesecret_code}`);

        function randomInt() {
            return Math.floor(Math.random() * (9999999999 - 1000000000) + 1000000000);
          }
        //   const randomNmber = Math.floor(Math.random() * 10;
        const balance = 0;
        const { error } = validate.validateAccount(req.body);
        if (error) return res.status(400).json({ status: 400, error: error.details[0].message });

        else{
            
            const account = {
            id:dbs.accounts.length +1,
            accountNumber:parseInt(randomInt()),
            firstName: req.user.firstName,
            lastName: req.user.lastName,
            email: req.user.email,
            type:req.body.type, 
            status:"active", 
            createdOn:new Date(),
            balance:parseFloat(balance)
        };
        dbs.accounts.push(account);
        res.status(200).json({ status: 200, message: `Bank account created with this ## ${account.accountNumber} ## account number, Enjoy our services` , data: account });
        }
    },
    // activate or draft a user bank account
    activateAccount(req, res){
        const account = dbs.accounts.find(findAccount => findAccount.accountNumber === parseInt(req.params.accountNumber));
         if (!account) return res.status(404).json({status:404, error:`This account number ## ${req.params.accountNumber} ## was not found !`});         
        
         account.status = req.body.status;
            return res.status(200).json({ status: 200, message: 'Account Updated', data: account });
        },
        
    //delete an account
    deleteAccount(req, res){
        const account = dbs.accounts.find(findAccount => findAccount.accountNumber === parseInt(req.params.accountNumber));
         if (!account) return res.status(404).json({status:404, error:`This account number ## ${req.params.accountNumber} ## was not found !`});
    
         //find index of account
        const index = dbs.accounts.indexOf(account);
        //remove account
        dbs.accounts.splice(index, 1);
        res.status(200).json({ status:200, message: "Account successfully deleted" });
        },
}

export default accountController;