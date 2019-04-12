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

const token = jwt.sign(payLoad, `${thesecret_code}`);

before('sign up hook', () => {
  it.only('should signup', (done) => {
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
      it('Account Updated', (done) => {
            chai.request(server)
              .get('/api/v1/accounts')
              .set('Authorization', token)
              .end((err, res) => {
              chai.request(server)
              .patch(`/api/v1/accounts/${res.body.data[0].accountNumber}`)
              .set('Authorization', token)
              .send({
                  status:"draft",
              })
              .end((err, res) => {
                expect(res.body.status).to.equal(200);
                expect(res.body).to.have.property('status');
                expect(res.body).to.have.property('message');
                expect(res.body).to.have.property('data');
                expect(res.body).to.have.property('object');
              });

            });
            done();
          });
});


      


      