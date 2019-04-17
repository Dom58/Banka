import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../app.js'
import jwt from 'jsonwebtoken';

import dotenv from 'dotenv'

dotenv.config();

const { expect } = chai;
chai.use(chaiHttp);


const userDetails = {
  email: 'dominique58@gmail.com',
  password: 'domdom',
}

const token = jwt.sign(userDetails, `${process.env.SECRET_KEY}`);

before('signup', () => {
  it('User are allowed to sign up', () => {
      chai.request(server)
        .post('/api/v1/auth/signup')
        .send({
          firstName: 'Ndahimana',
          lastName: 'Dominique',
          email: 'dom558@gmail.com',
          type: 'cashier',
          isAdmin: 'false',
          password: 'domdom',
        })
        .end((err, res) => {
          // console.log(res.body);
          expect(res.body.status).to.equal(200);
        });
        
    });
});

// describe('makeCreditTransaction', () => {
//     it('Cashier should make a credit transaction', () => {
//       chai.request(server)
//         .get('/api/v1/accounts')
//         .set('Authorization', token)
//         .end((err,res) =>{
//           console.log(res.body)
//           chai.request(server)
//           .post('/api/v1/transactions/20000/credit')
//         .send({
//           amount: '3000',
//           cashier: '10'
//         })
//         })
//       }
        
//         // .end((err, res) => {
//         //   console.log(res.body);
//         //   expect(res.body.status).to.equal(200);
//         // });
        
//     });


