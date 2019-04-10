import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import validate from '../helpers/helper';
import dbs from '../models/db';


const userController = {
    signUp(req, res) {
        // user inputs validation
        const { error } = validate.validateUser(req.body);
        if (error) return res.status(400).json({ status: 400, error: error.details[0].message });
    
        // an email existing
        let checkUserEmail = dbs.users.find(username => username.email === req.body.email);
        if (checkUserEmail) return res.status(400).json({ status: 400, error: 'This email is already taken, please refill an other one' });

        const user = {
            id:dbs.users.length +1,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            status:req.body.status, 
            isAdmin:req.body.isAdmin, 
            password: bcrypt.hashSync(req.body.password,10)
        };
        
        //token assigning and data pushing
        const thesecret_code = 'BANKA_JWT_SECRET_CODE';
        const token = jwt.sign(user, `${thesecret_code}`, { expiresIn: '24h' });
        dbs.users.push(user);

        return res.header('Authorization', token).status(200).json({
          status: 200,
          message: 'You are successfully registed, Please be free to use Banka',
          data: {
            token,
            data: user,
          },
        });
      },
}

export default userController;