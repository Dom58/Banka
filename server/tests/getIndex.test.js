import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../app.js'

const { expect } = chai;
chai.use(chaiHttp);

describe('User will navigate a homepage',() =>{
    it('index', (done) =>{
        chai.request(server)
        .get('/')
        .end((err, res) => {
            expect(res.body.status).to.equal(200);
          });
    })
});




