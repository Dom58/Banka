"use strict";

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _app = _interopRequireDefault(require("../app.js"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var expect = _chai["default"].expect;

_chai["default"].use(_chaiHttp["default"]);

var thesecret_code = 'BANKA_JWT_SECRET_CODE';

var should = _chai["default"].should();

var payLoad = {
  id: 1,
  firstName: 'Ndahimana',
  lastName: 'Dominique',
  email: 'dndahimana58@gmail.com'
};

var token = _jsonwebtoken["default"].sign(payLoad, "".concat(thesecret_code));

describe('makeCreditTransaction', function () {//make a test to how a cashier can credit a client bank account
});