import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../app.js'


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
          phoneNumber: '0788863488',
          status: 'Cashier',
          isAdmin: 'false',
          password: 'domdom',
        })
        .end((err, res) => {
          expect(res.body.status).to.equal(200);
          // expect(res.body).to.have.property('status');
          // expect(res.body).to.have.property('message');
          // expect(res.body).to.have.property('data');
          // expect(res.body).to.be.an('object');
        });
        
    });
    

    it('If email already taken', () => {
        chai.request(server)
          .post('/api/v1/auth/signup')
          .set('Content-type', 'application/json')
          .set('Accept', 'application/json')
          .send({
            firstName: 'andrew',
            lastName: 'jackson',
            email: 'dom58@gmail.com',
            password: 'asdfgh',
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
            phoneNumber: '',
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
                email: 'domdom58@gmail.com',
                password: 'qwert',
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
                email: 'dom58@gmail.com',
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
                email: 'dom58@gmail.com',
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
      