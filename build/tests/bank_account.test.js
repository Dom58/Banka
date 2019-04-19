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

var payLoad = {
  id: 1,
  firstName: 'Ndahimana',
  lastName: 'Dominique',
  email: 'dom58@gmail.com',
  isAdmin: "true"
};

var token = _jsonwebtoken["default"].sign(payLoad, "".concat(process.env.SECRET_KEY), {
  expiresIn: '24h'
});

before('sign up hook', function () {
  it.only('Banka users should signup', function (done) {
    _chai["default"].request(_app["default"]).post('/api/v1/auth/signup').send({
      firstName: 'Ndahimana',
      lastName: 'Dominique',
      email: 'dom58@gmail.com',
      type: 'Cashier',
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
}); // Test for updating account

describe('Update bank account', function () {
  var payLoad = {
    id: 1,
    firstName: 'Ndahimana',
    lastName: 'Dominique',
    email: 'dom58@gmail.com',
    isAdmin: "true"
  };

  var token = _jsonwebtoken["default"].sign(payLoad, "".concat(process.env.SECRET_KEY), {
    expiresIn: '24h'
  });

  it('Not authorized to view all account numbers', function () {
    _chai["default"].request(_app["default"]).get('/api/v1/accounts').set('Authorization', !token).end(function (err, res) {
      expect(res.body.status).to.equal(401);
    });
  });
  it('Account Number not found', function () {
    _chai["default"].request(_app["default"]).patch('/api/v1/accounts/22222').set('Authorization', token).send({
      type: 'draft'
    }).end(function (err, res) {
      expect(res.body.status).to.equal(404);
    });
  });
  it('Bank account status must be activate or draft', function () {
    _chai["default"].request(_app["default"]).get('/api/v1/accounts/').set('Authorization', token).end(function (err, res) {
      _chai["default"].request(_app["default"]).patch("/api/v1/accounts/".concat(res.body.data[0].accountNumber)).set('Authorization', token).send({
        status: 'invalid'
      }).end(function (err, res) {
        expect(res.body).to.have.property('status');
      });
    });
  });
  it('Account number not found!', function () {
    _chai["default"].request(_app["default"]).get('/api/v1/accounts/').set('Authorization', token).end(function (err, res) {
      _chai["default"].request(_app["default"])["delete"]("/api/v1/accounts/".concat(res.body.data[0].accountNumber)).set('Authorization', token).end(function (err, res) {
        expect(res.body).to.have.property('status');
      });
    });
  });
  it('You are not Authorized to delete this an account!', function () {
    _chai["default"].request(_app["default"]).get('/api/v1/accounts/').set('Authorization', !token).end(function (err, res) {
      _chai["default"].request(_app["default"])["delete"]("/api/v1/accounts/2222").set('Authorization', token).end(function (err, res) {
        expect(res.status).to.be.equal(401);
      });
    });
  });
});