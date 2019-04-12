"use strict";

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _app = _interopRequireDefault(require("../app.js"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var expect = _chai["default"].expect;

_chai["default"].use(_chaiHttp["default"]);

var thesecret_code = 'BANKA_JWT_SECRET_CODE';
var payLoad = {
  id: 1,
  firstName: 'Ndahimana',
  lastName: 'Dominique',
  email: 'dom58@gmail.com'
};

var token = _jsonwebtoken["default"].sign(payLoad, "".concat(thesecret_code));

before('sign up hook', function () {
  it.only('should signup', function (done) {
    _chai["default"].request(_app["default"]).post('/api/v1/auth/signup').send({
      firstName: 'Ndahimana',
      lastName: 'Dominique',
      email: 'dom58@gmail.com',
      phoneNumber: '0788863488',
      status: 'Cashier',
      isAdmin: 'false',
      password: 'domdom'
    }).end(function (err, res) {
      expect(res.body.status).to.equal(200);
      expect(res.body).to.have.property('status');
      expect(res.body).to.have.property('message');
      expect(res.body).to.have.property('data');
      expect(res.body).to.be.an('object');
    });

    done();
  });
});
describe('createAccount', function () {
  it('User allowed to create account', function (done) {
    _chai["default"].request(_app["default"]).post('/api/v1/accounts').set('Authorization', token).send({
      type: "savings"
    }).end(function (err, res) {
      expect(res.body.status).to.equal(200);
      expect(res.body).to.have.property('status');
      expect(res.body).to.have.property('message');
      expect(res.body).to.have.property('data');
      expect(res.body).to.be.an('object');
    });

    done();
  });
  it('should throw error if header token was not match', function (done) {
    _chai["default"].request(_app["default"]).post('/api/v1/accounts').set('Authorization', 'jdjjsdk').send({
      type: "savings"
    }).end(function (err, res) {
      expect(res.body.status).to.equal(401);
    });

    done();
  });
  it('should throw error when no token', function (done) {
    _chai["default"].request(_app["default"]).post('/api/v1/accounts').set('Authorization', "").send({
      type: "savings"
    }).end(function (err, res) {
      expect(res.body.status).to.equal(403);
    });

    done();
  });
  it('all accounts', function (done) {
    _chai["default"].request(_app["default"]).get('/api/v1/accounts').set('Authorization', token).end(function (err, res) {
      // console.log(res.body);
      expect(res.body.status).to.equal(200);
      expect(res.body).to.have.property('status');
      expect(res.body).to.have.property('data');
      expect(res.body).to.be.an('object');
    });

    done();
  });
  it('Account Updated', function (done) {
    _chai["default"].request(_app["default"]).get('/api/v1/accounts').set('Authorization', token).end(function (err, res) {
      _chai["default"].request(_app["default"]).patch("/api/v1/accounts/".concat(res.body.data[0].accountNumber)).set('Authorization', token).send({
        status: "draft"
      }).end(function (err, res) {
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