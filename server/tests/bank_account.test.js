import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../app.js'
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'

dotenv.config();

const { expect } = chai;
chai.use(chaiHttp);

const payLoad = {
  id:1,
  firstName: 'Ndahimana',
  lastName: 'Dominique',
  email: 'dom58@gmail.com',
  isAdmin:"true",
}

const token = jwt.sign(payLoad, `${process.env.SECRET_KEY}`, { expiresIn: '24h' });

before('sign up hook', () => {
  it.only('Banka users should signup', (done) => {
    chai.request(server)
    .post('/api/v1/auth/signup')
    .send({
      firstName: 'Ndahimana',
      lastName: 'Dominique',
      email: 'dom58@gmail.com',
      type: 'Cashier',
      isAdmin: 'false',
      password: 'domdom',
    })
    .end((err, res) => {
      expect(res.body.status).to.equal(200);
      expect(res.body).to.have.property('status');
      expect(res.body).to.have.property('message');
      expect(res.body).to.have.property('data');
      expect(res.body).to.be.an('object');
    });
    done();
  })
});

describe('createAccount', () => {
    it('User allowed to create account', (done) => {
      chai.request(server)
        .post('/api/v1/accounts')
        .set('Authorization', token)
        .send({
            type: "savings",
        })
        .end((err, res) => {
          expect(res.body.status).to.equal(200);
          expect(res.body).to.have.property('status');
          expect(res.body).to.have.property('message');
          expect(res.body).to.have.property('data');
          expect(res.body).to.be.an('object');
        });
        done();
    });
    
    it('should throw error if header token was not match', (done) => {
      chai.request(server)
        .post('/api/v1/accounts')
        .set('Authorization', 'jdjjsdk')
        .send({
            type: "savings",
        })
        .end((err, res) => {
          expect(res.body.status).to.equal(401);
        });
        done();
    });
    it('should throw error when no token', (done) => {
      chai.request(server)
        .post('/api/v1/accounts')
        .set('Authorization', "")
        .send({
            type: "savings",
        })
        .end((err, res) => {
          expect(res.body.status).to.equal(403);
        });
        done();
    });
    it('all accounts', (done) => {
            chai.request(server)
              .get('/api/v1/accounts')
              .set('Authorization', token)
              .end((err, res) => {
                // console.log(res.body);
                expect(res.body.status).to.equal(200);
                expect(res.body).to.have.property('status');
                expect(res.body).to.have.property('data');
                expect(res.body).to.be.an('object');
              });
              done();
          });
});


// Test for updating account
describe('Update bank account', () => {
  const payLoad = {
          id:1,
          firstName: 'Ndahimana',
          lastName: 'Dominique',
          email: 'dom58@gmail.com',
          isAdmin:"true",
          }
  const token = jwt.sign(payLoad, `${process.env.SECRET_KEY}`, { expiresIn: '24h' });
        
      it('Not authorized to view all account numbers', () => {
        chai.request(server)
          .get('/api/v1/accounts')
          .set('Authorization', !token)

          .end((err, res) => {
            expect(res.body.status).to.equal(401);
          });
          
      });

      it('Account Number not found', () => {
        chai.request(server)
          .patch('/api/v1/accounts/22222')
          .set('Authorization', token)
          .send({
            type: 'draft',
          })
          .end((err, res) => {
            expect(res.body.status).to.equal(404);
          });
          
      });

    it('Bank account status must be activate or draft', () => {
      chai.request(server)
        .get('/api/v1/accounts/')
        .set('Authorization', token)
        .end((err, res) => {
          chai.request(server)
            .patch(`/api/v1/accounts/${res.body.data[0].accountNumber}`)
            .set('Authorization', token)
            .send({
              status: 'invalid',
            })
            .end((err, res) => {
              expect(res.body).to.have.property('status');
            });
        });
    });

    it('Account number not found!', () => {
      chai.request(server)
        .get('/api/v1/accounts/')
        .set('Authorization', token)
        .end((err, res) => {
          chai.request(server)
            .delete(`/api/v1/accounts/${res.body.data[0].accountNumber}`)
            .set('Authorization', token)
            .end((err, res) => {
              expect(res.body).to.have.property('status');
            });
        });
    });

    it('You are not Authorized to delete this an account!', () => {
      chai.request(server)
        .get('/api/v1/accounts/')
        .set('Authorization', !token)
        .end((err, res) => {
          chai.request(server)
            .delete(`/api/v1/accounts/2222`)
            .set('Authorization', token)
            .end((err, res) => {
              expect(res.status).to.be.equal(401);
            });
        });
    });
});


      


      