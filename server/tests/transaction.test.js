import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../app.js'
import jwt from 'jsonwebtoken';

const { expect } = chai;
chai.use(chaiHttp);


const thesecret_code = 'BANKA_JWT_SECRET_CODE';


const userDetails = {
  email: 'dominique58@gmail.com',
  password: 'domdom',
}

const token = jwt.sign(userDetails, `${thesecret_code}`);

before('signIn', () => {
  const user = {
    email: 'dom58@gmail.com',
    password: 'domdom',
  };
  chai.request(server)
    .post('/api/v1/auth/signin')
    .send(user)
    .end((err, res) => {
      // console.log(res.body);
      expect(res.body).to.have.property('status');
    });
});
