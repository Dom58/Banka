import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../app.js'

import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'

dotenv.config();


const { expect } = chai;
chai.use(chaiHttp);

describe('signup', () => {
    it('User are allowed to sign up', () => {
      chai.request(server)
        .post('/api/v1/auth/signup')
        .send({
          firstName: 'Ndahimana',
          lastName: 'Dominique',
          email: 'dominique58@gmail.com',
          type: 'cashier',
          isAdmin: 'false',
          password: 'domdom',
        })
        .end((err, res) => {
          expect(res.body.status).to.equal(200);
        });
        
    });

    it('Auto Signup as a user', () => {
      chai.request(server)
        .post('/api/v1/auth/signup')
        .send({
          firstName: 'Ndahimana',
          lastName: 'Dominique',
          email: 'xavier58@gmail.com',
          type: 'client',
          isAdmin: 'true',
          password: 'domdom',
        })
        .end((err, res) => {
          expect(res.body.status).to.equal(200);
        });
        
    });

    it('Admin Account', () => {
      chai.request(server)
        .post('/api/v1/auth/signup')
        .send({
          firstName: 'Ndahimana',
          lastName: 'Dominique',
          email: 'xavier5858@gmail.com',
          isAdmin:'false',
          type: '----',
          password: 'domdom',
        })
        .end((err, res) => {
          expect(res.body.status).to.equal(200);
        });
        
    });
    

    it('Email already registed', () => {
        chai.request(server)
          .post('/api/v1/auth/signup')
          .set('Content-type', 'application/json')
          .set('Accept', 'application/json')
          .send({
            firstName: 'Ndahimana',
            lastName: 'Dominique',
            email: 'dominique58@gmail.com',
            password: 'domdom',
          })
          .end((err, res) => {
            expect(res.body.status).to.equal(400);
            expect(res.body).to.have.property('status');
            expect(res.body).to.have.property('error');
            expect(res.body).to.be.an('object');
          });
          
      });

      it('The sign up field are required', () => {
        chai.request(server)
          .post('/api/v1/auth/signup')
          .send({
            firstName: '',
            lastName: '',
            email: '',
            status: '',
            isAdmin: '',
            password: '',
          })
          .end((err, res) => {
            expect(res.body.status).to.equal(400);
            expect(res.body).to.have.property('status');
            expect(res.body).to.have.property('error');
            expect(res.body).to.be.an('object');
          });
          
      });
    });


    describe('signIn', () => {
        it('All Sign in field are required', () => {
            chai.request(server)
              .post('/api/v1/auth/signin')
              .send({
                email: '',
                password: '',
              })
              .end((err, res) => {
                expect(res.body.status).to.equal(400);
                expect(res.body).to.have.property('status');
                expect(res.body).to.have.property('error');
                expect(res.body).to.be.an('object');
                
              });
          });

          it('Invalid email', () => {
            chai.request(server)
              .post('/api/v1/auth/signin')
              .send({
                email: 'domxxxhs58@gmail.com',
                password: 'domdom',
              })
              .end((err, res) => {
                expect(res.body.status).to.equal(400);
                expect(res.body).to.have.property('status');
                expect(res.body).to.have.property('error');
                expect(res.body).to.be.an('object');
                
              });
          });

          it('Incorrect Password', () => {
            chai.request(server)
              .post('/api/v1/auth/signin')
              .send({
                email: 'dominique58@gmail.com',
                password: 'asdfgh',
              })
              .end((err, res) => {
                expect(res.body.status).to.equal(400);
                expect(res.body).to.have.property('status');
                expect(res.body).to.have.property('error');
                expect(res.body).to.be.an('object');
                
              });
          });

          it('Password length must be equal to six', () => {
            chai.request(server)
              .post('/api/v1/auth/signin')
              .send({
                email: 'dominique58@gmail.com',
                password: 'asdf',
              })
              .end((err, res) => {
                expect(res.body.status).to.equal(400);
                expect(res.body).to.have.property('status');
                expect(res.body).to.have.property('error');
                expect(res.body).to.be.an('object');
                
              });
          });

          it('User Logging in', () => {
            const userDetails = {
              email: 'dominique58@gmail.com',
              password: 'domdom',
            };
            chai.request(server)
              .post('/api/v1/auth/signin')
              .send(userDetails)
              .end((err, res) => {
                // console.log(res.body);
                expect(res.body.status).to.equal(200);
                expect(res.body).to.have.property('status');
                expect(res.body).to.have.property('message');
                expect(res.body).to.have.property('data');
                expect(res.body).to.be.an('object');
              });
              
          });

    });

    describe('Create Staff', () => {

      const payLoad = {
          id:1,
          firstName: 'Ndahimana',
          lastName: 'Dominique',
          email: 'dom58@gmail.com',
          isAdmin:"true",
          }
  const token = jwt.sign(payLoad, `${process.env.SECRET_KEY}`, { expiresIn: '24h' });
        
      it('Admin can create a staff', () => {
        chai.request(server)
          .patch('/api/v1/staff/5')
          .set('Authorization', token)
          .send({
            type: 'cashier',
          })
          .end((err, res) => {
            expect(res.body.status).to.equal(200);
          });
          
      });

      it('Unauthorized', () => {
        chai.request(server)
          .patch('/api/v1/staff/5')
          .set('Authorization', !token)
          .send({
            type: 'cashier',
          })
          .end((err, res) => {
            expect(res.body).to.have.property('status');
            expect(res.body).to.have.property('error');
          });
          
      });

    });
      