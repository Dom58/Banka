"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _helper = _interopRequireDefault(require("../helpers/helper"));

var _db = _interopRequireDefault(require("../models/db"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var thesecret_code = 'BANKA_JWT_SECRET_CODE';
var userController = {
  signUp: function signUp(req, res) {
    // user inputs validation
    var _validate$validateUse = _helper["default"].validateUser(req.body),
        error = _validate$validateUse.error;

    if (error) return res.status(400).json({
      status: 400,
      error: error.details[0].message
    }); // an email existing

    var checkUserEmail = _db["default"].users.find(function (username) {
      return username.email === req.body.email;
    });

    if (checkUserEmail) return res.status(400).json({
      status: 400,
      error: 'This email is already taken, please refill an other one'
    });
    var user = {
      id: _db["default"].users.length + 1,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      status: req.body.status,
      isAdmin: req.body.isAdmin,
      password: _bcrypt["default"].hashSync(req.body.password, 10)
    };

    var token = _jsonwebtoken["default"].sign(user, "".concat(thesecret_code), {
      expiresIn: '24h'
    });

    _db["default"].users.push(user);

    return res.header('Authorization', token).status(200).json({
      status: 200,
      message: 'You are successfully registed, Please be free to use Banka',
      data: {
        token: token,
        data: user
      }
    });
  },
  signIn: function signIn(req, res) {
    var _validate$validateLog = _helper["default"].validateLogin(req.body),
        error = _validate$validateLog.error;

    if (error) return res.status(400).json({
      status: 400,
      error: error.details[0].message
    }); // Check email

    var user = _db["default"].users.find(function (username) {
      return username.email === req.body.email;
    });

    if (!user) return res.status(400).json({
      status: 400,
      error: 'Invalid email'
    }); // password match

    var comparePassword = _bcrypt["default"].compareSync(req.body.password, user.password);

    if (!comparePassword) return res.status(400).json({
      status: 400,
      error: 'Incorrect password'
    });
    var userDetails = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email
    }; // Generate new token

    var token = _jsonwebtoken["default"].sign(userDetails, "".concat(thesecret_code), {
      expiresIn: '24h'
    });

    return res.header('Authorization', token).status(200).json({
      status: 200,
      message: 'You are logging in, Enjoy Banka services',
      data: {
        token: token,
        data: userDetails
      }
    });
  }
};
var _default = userController;
exports["default"] = _default;