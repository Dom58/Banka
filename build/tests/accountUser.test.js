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

describe('signup', function () {
  it('User are allowed to sign up', function () {
    _chai["default"].request(_app["default"]).post('/api/v1/auth/signup').send({
      firstName: 'Ndahimana',
      lastName: 'Dominique',
      email: 'dominique58@gmail.com',
      type: 'cashier',
      isAdmin: 'false',
      password: 'domdom'
    }).end(function (err, res) {
      expect(res.body.status).to.equal(200);
    });
  });
  it('Auto Signup as a user', function () {
    _chai["default"].request(_app["default"]).post('/api/v1/auth/signup').send({
      firstName: 'Ndahimana',
      lastName: 'Dominique',
      email: 'xavier58@gmail.com',
      type: 'client',
      isAdmin: 'true',
      password: 'domdom'
    }).end(function (err, res) {
      expect(res.body.status).to.equal(200);
    });
  });
  it('Admin Account', function () {
    _chai["default"].request(_app["default"]).post('/api/v1/auth/signup').send({
      firstName: 'Ndahimana',
      lastName: 'Dominique',
      email: 'xavier5858@gmail.com',
      isAdmin: 'false',
      type: '----',
      password: 'domdom'
    }).end(function (err, res) {
      expect(res.body.status).to.equal(200);
    });
  });
  it('Email already registed', function () {
    _chai["default"].request(_app["default"]).post('/api/v1/auth/signup').set('Content-type', 'application/json').set('Accept', 'application/json').send({
      firstName: 'Ndahimana',
      lastName: 'Dominique',
      email: 'dominique58@gmail.com',
      password: 'domdom'
    }).end(function (err, res) {
      expect(res.body.status).to.equal(400);
      expect(res.body).to.have.property('status');
      expect(res.body).to.have.property('error');
      expect(res.body).to.be.an('object');
    });
  });
  it('The sign up field are required', function () {
    _chai["default"].request(_app["default"]).post('/api/v1/auth/signup').send({
      firstName: '',
      lastName: '',
      email: '',
      status: '',
      isAdmin: '',
      password: ''
    }).end(function (err, res) {
      expect(res.body.status).to.equal(400);
      expect(res.body).to.have.property('status');
      expect(res.body).to.have.property('error');
      expect(res.body).to.be.an('object');
    });
  });
});
describe('signIn', function () {
  it('All Sign in field are required', function () {
    _chai["default"].request(_app["default"]).post('/api/v1/auth/signin').send({
      email: '',
      password: ''
    }).end(function (err, res) {
      expect(res.body.status).to.equal(400);
      expect(res.body).to.have.property('status');
      expect(res.body).to.have.property('error');
      expect(res.body).to.be.an('object');
    });
  });
  it('Invalid email', function () {
    _chai["default"].request(_app["default"]).post('/api/v1/auth/signin').send({
      email: 'domxxxhs58@gmail.com',
      password: 'domdom'
    }).end(function (err, res) {
      expect(res.body.status).to.equal(400);
      expect(res.body).to.have.property('status');
      expect(res.body).to.have.property('error');
      expect(res.body).to.be.an('object');
    });
  });
  it('Incorrect Password', function () {
    _chai["default"].request(_app["default"]).post('/api/v1/auth/signin').send({
      email: 'dominique58@gmail.com',
      password: 'asdfgh'
    }).end(function (err, res) {
      expect(res.body.status).to.equal(400);
      expect(res.body).to.have.property('status');
      expect(res.body).to.have.property('error');
      expect(res.body).to.be.an('object');
    });
  });
  it('Password length must be equal to six', function () {
    _chai["default"].request(_app["default"]).post('/api/v1/auth/signin').send({
      email: 'dominique58@gmail.com',
      password: 'asdf'
    }).end(function (err, res) {
      expect(res.body.status).to.equal(400);
      expect(res.body).to.have.property('status');
      expect(res.body).to.have.property('error');
      expect(res.body).to.be.an('object');
    });
  });
  it('User Logging in', function () {
    var userDetails = {
      email: 'dominique58@gmail.com',
      password: 'domdom'
    };

    _chai["default"].request(_app["default"]).post('/api/v1/auth/signin').send(userDetails).end(function (err, res) {
      // console.log(res.body);
      expect(res.body.status).to.equal(200);
      expect(res.body).to.have.property('status');
      expect(res.body).to.have.property('message');
      expect(res.body).to.have.property('data');
      expect(res.body).to.be.an('object');
    });
  });
});
describe('Create Staff', function () {
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

  it('Admin can create a staff', function () {
    _chai["default"].request(_app["default"]).patch('/api/v1/staff/5').set('Authorization', token).send({
      type: 'cashier'
    }).end(function (err, res) {
      expect(res.body.status).to.equal(200);
    });
  });
  it('Unauthorized', function () {
    _chai["default"].request(_app["default"]).patch('/api/v1/staff/5').set('Authorization', !token).send({
      type: 'cashier'
    }).end(function (err, res) {
      expect(res.body).to.have.property('status');
      expect(res.body).to.have.property('error');
    });
  });
});