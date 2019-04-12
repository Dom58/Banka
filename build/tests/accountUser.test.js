"use strict";

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _app = _interopRequireDefault(require("../app.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var expect = _chai["default"].expect;

_chai["default"].use(_chaiHttp["default"]);

describe('signup', function () {
  it('User are allowed to sign up', function () {
    _chai["default"].request(_app["default"]).post('/api/v1/auth/signup').send({
      firstName: 'Ndahimana',
      lastName: 'Dominique',
      email: 'dominique58@gmail.com',
      phoneNumber: '0788863488',
      status: 'Cashier',
      isAdmin: 'false',
      password: 'domdom'
    }).end(function (err, res) {
      expect(res.body.status).to.equal(200); // expect(res.body).to.have.property('status');
      // expect(res.body).to.have.property('message');
      // expect(res.body).to.have.property('data');
      // expect(res.body).to.be.an('object');
    });
  });
  it('If email already taken', function () {
    _chai["default"].request(_app["default"]).post('/api/v1/auth/signup').set('Content-type', 'application/json').set('Accept', 'application/json').send({
      firstName: 'andrew',
      lastName: 'jackson',
      email: 'dom58@gmail.com',
      password: 'asdfgh'
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
      phoneNumber: '',
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
      email: 'domdom58@gmail.com',
      password: 'qwert'
    }).end(function (err, res) {
      expect(res.body.status).to.equal(400);
      expect(res.body).to.have.property('status');
      expect(res.body).to.have.property('error');
      expect(res.body).to.be.an('object');
    });
  });
  it('Incorrect Password', function () {
    _chai["default"].request(_app["default"]).post('/api/v1/auth/signin').send({
      email: 'dom58@gmail.com',
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
      email: 'dom58@gmail.com',
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