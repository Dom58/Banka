import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../app.js'

const { expect } = chai;
chai.use(chaiHttp);

describe('Welcome Message', () => {
    it('All users and visitors should navigate banka welcome page', () =>{
        chai.request(server)
      .get('/')
      .end((err, res) => {
        expect(res.body.status).to.equal(200);
      });
      });
});