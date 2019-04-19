"use strict";

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _app = _interopRequireDefault(require("../app.js"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_dotenv["default"].config();

var expect = _chai["default"].expect;

_chai["default"].use(_chaiHttp["default"]);

var userDetails = {
  email: 'dominique58@gmail.com',
  password: 'domdom'
};

var token = _jsonwebtoken["default"].sign(userDetails, "".concat(process.env.SECRET_KEY));

before('signup', function () {
  it('User are allowed to sign up', function () {
    _chai["default"].request(_app["default"]).post('/api/v1/auth/signup').send({
      firstName: 'Ndahimana',
      lastName: 'Dominique',
      email: 'dom558@gmail.com',
      type: 'cashier',
      isAdmin: 'false',
      password: 'domdom'
    }).end(function (err, res) {
      // console.log(res.body);
      expect(res.body.status).to.equal(200);
    });
  });
}); // describe('makeCreditTransaction', () => {
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