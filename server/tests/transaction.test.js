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
    it('Amount are required', (done)=>{
        chai.request(server)
        .post(`/api/v1/transactions/5985733808/credit`)
        .set('Authorization', token)
          .send({
            transactionId: 1,
            acccountNumber:5985733808,
            cachier:2,
            amount:'',
          })
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.a('array');
            res.body.length.should.be.eql(0);
            done();
          });
          
    });

    it('Invalid bank account number', () => {
        chai.request(server)
        .post('/api/v1/transactions/59857338080/credit')
        .set('Authorization', token)
          .send({
            amount: 4000,
          })
          .end((err, res) => {
            expect(res.body.status).to.equal(404);
            expect(res.body).to.have.property('status');
            expect(res.body).to.have.property('error');
            expect(res.body).to.be.an('object');
            
          });
      });

      it('Cachier can credit client bank account balance', (done) =>{
        const accounts = [{
            id: 1,
            accountNumber: 5985733808,
            createdOn: "2019-04-12T00:20:26.746Z",
            user_id: 1,
            firstName: "Domdom",
            lastName: "Xavier",
            email: "dom58@gmail.com",
            type: "savings",
            status: "active",
            balance: 0
            }]
    done()
      //make a test to how a cashier can credit a client bank account
        });
     
});