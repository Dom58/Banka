import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../app.js'
import jwt from 'jsonwebtoken';

const { expect } = chai;
chai.use(chaiHttp);


const thesecret_code = 'BANKA_JWT_SECRET_CODE';

const payLoad = {
  id:1,
  firstName: 'Ndahimana',
  lastName: 'Dominique',
  email: 'dom58@gmail.com',
}

const token = jwt.sign(payLoad, `${thesecret_code}`, { expiresIn: '24h' });

before('sign up hook', () => {
  it.only('Banka users should signup', (done) => {
    chai.request(server)
    .post('/api/v1/auth/signup')
    .send({
      firstName: 'Ndahimana',
      lastName: 'Dominique',
      email: 'dom58@gmail.com',
      phoneNumber: '0788863488',
      status: 'Cashier',
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
    it('Bank account not found', () => {
      chai.request(server)
        .patch('/api/v1/accounts/2019')
        .set('Authorization', token)
        .send({
          status: 'activate',
        })
        .end((err, res) => {
          expect(res).to.be.an('object');
          expect(res.status).to.deep.equal(404);
          expect(res.body.error).to.be.a('string');
          expect(res.body).to.have.property('error');
          expect(res.body).to.have.property('status');
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
              expect(res.body).to.be.an('object');
              expect(res.status).to.be.equal(400);
              expect(res.body.error).to.be.a('string');
              expect(res.body).to.have.property('error');
              expect(res.body).to.have.property('status');
            });
        });
    });
});


      


      