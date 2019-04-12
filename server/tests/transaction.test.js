import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../app.js'
import jwt from 'jsonwebtoken';

const { expect } = chai;
chai.use(chaiHttp);


const thesecret_code = 'BANKA_JWT_SECRET_CODE';
let should = chai.should();

const payLoad = {
  id:1,
  firstName: 'Ndahimana',
  lastName: 'Dominique',
  email: 'dndahimana58@gmail.com',
}

const token = jwt.sign(payLoad, `${thesecret_code}`);

describe('makeCreditTransaction', () => {
    
      //make a test to how a cashier can credit a client bank account

     
});