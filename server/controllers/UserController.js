import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import validate from '../helpers/helper';
import dbs from '../models/db';
import dotenv from 'dotenv'

dotenv.config();

const userController = {
    signUp(req, res) {
        // user inputs validation
        const { error } = validate.validateUser(req.body);
        if (error) return res.status(400).json({ status: 400, error: error.details[0].message });
    
        // an email existing
        let checkUserEmail = dbs.users.find(username => username.email === req.body.email);
        if (checkUserEmail) return res.status(400).json({ status: 400, error: 'This email is already taken, please refill an other one' });

        if (req.body.isAdmin ==='true') {
            const user = {
                id:dbs.users.length +1,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                type:"", 
                isAdmin:req.body.isAdmin,
                password: bcrypt.hashSync(req.body.password,10)
            };
            const token = jwt.sign(user, `${process.env.SECRET_KEY}`, { expiresIn: '24h' });
            dbs.users.push(user);

        return res.header('Authorization', token).status(200).json({
          status: 200,
          message: 'You are successfully registed, Please be free to use Banka',
          data: {
            token,
            data: {
              id: user.id,
              firstName: user.firstName,
              lastName: user.lastName,
              email: user.email,
            },
          },
        });
        }

        else{
            const user = {
                id:dbs.users.length +1,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                type:"", 
                isAdmin:false,
                password: bcrypt.hashSync(req.body.password,10)
            };
            const token = jwt.sign(user, `${process.env.SECRET_KEY}`, { expiresIn: '24h' });
            dbs.users.push(user);

        return res.header('Authorization', token).status(200).json({
          status: 200,
          message: 'You are successfully registed, Please be free to use Banka',
          data: {
            token,
            data: {
              id: user.id,
              firstName: user.firstName,
              lastName: user.lastName,
              email: user.email,
            },
          },
        });

        } 
      },

    signIn(req, res) {
    const { error } = validate.validateLogin(req.body);
    if (error) return res.status(400).json({ status: 400, error: error.details[0].message });

    // Check email
    const user = dbs.users.find(username => username.email === req.body.email);
    if (!user) return res.status(400).json({ status: 400, error: 'Invalid email' });

    // password match
    const comparePassword = bcrypt.compareSync(req.body.password, user.password);
    if (!comparePassword) return res.status(400).json({ status: 400, error: 'Incorrect password' });

    const userDetails = {
        id:user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        type: user.type,
        isAdmin: user.isAdmin,
        email: user.email,
    };
    // Generate new token
    const token = jwt.sign(userDetails, `${process.env.SECRET_KEY}`, { expiresIn: '24h' });

    return res.header('Authorization', token).status(200).json({
      status: 200,
      message: 'You are logging in, Enjoy Banka services',
      data: {
        token,
        data: {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
          },
        },
      });
    },

    createStaff(req, res) {

      if(req.user.isAdmin ==='true'){
          const staff = dbs.users.find(username => username.id ===parseInt(req.params.id));
          if (!staff) return res.status(404).json({ status: 404, error: `The User with id ## ${req.params.id} ## not found!` });
           
           staff.type = "cashier";

            return res.status(200).json({ status: 200, message: 'Staff account is created!'});
          }

      else return res.status(401).json({status:401, message:'Ooops!! You are not allowed to make this request!'});
      }

}

export default userController;