"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _helper = _interopRequireDefault(require("../helpers/helper"));

var _db = _interopRequireDefault(require("../models/db"));

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_dotenv["default"].config();

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

    if (req.body.isAdmin === 'true') {
      var user = {
        id: _db["default"].users.length + 1,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        type: "",
        isAdmin: req.body.isAdmin,
        password: _bcrypt["default"].hashSync(req.body.password, 10)
      };

      var token = _jsonwebtoken["default"].sign(user, "".concat(process.env.SECRET_KEY), {
        expiresIn: '24h'
      });

      _db["default"].users.push(user);

      return res.header('Authorization', token).status(200).json({
        status: 200,
        message: 'You are successfully registed, Please be free to use Banka',
        data: {
          token: token,
          data: {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email
          }
        }
      });
    } else {
      var _user = {
        id: _db["default"].users.length + 1,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        type: "",
        isAdmin: false,
        password: _bcrypt["default"].hashSync(req.body.password, 10)
      };

      var _token = _jsonwebtoken["default"].sign(_user, "".concat(process.env.SECRET_KEY), {
        expiresIn: '24h'
      });

      _db["default"].users.push(_user);

      return res.header('Authorization', _token).status(200).json({
        status: 200,
        message: 'You are successfully registed, Please be free to use Banka',
        data: {
          token: _token,
          data: {
            id: _user.id,
            firstName: _user.firstName,
            lastName: _user.lastName,
            email: _user.email
          }
        }
      });
    }
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
      type: user.type,
      isAdmin: user.isAdmin,
      email: user.email
    }; // Generate new token

    var token = _jsonwebtoken["default"].sign(userDetails, "".concat(process.env.SECRET_KEY), {
      expiresIn: '24h'
    });

    return res.header('Authorization', token).status(200).json({
      status: 200,
      message: 'You are logging in, Enjoy Banka services',
      data: {
        token: token,
        data: {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email
        }
      }
    });
  },
  createStaff: function createStaff(req, res) {
    if (req.user.isAdmin === 'true') {
      var staff = _db["default"].users.find(function (username) {
        return username.id === parseInt(req.params.id);
      });

      if (!staff) return res.status(404).json({
        status: 404,
        error: "The User with id ## ".concat(req.params.id, " ## not found!")
      });
      staff.type = "cashier";
      return res.status(200).json({
        status: 200,
        message: 'Staff account is created!'
      });
    } else return res.status(401).json({
      status: 401,
      error: 'Ooops!! You are not allowed to make this request!'
    });
  }
};
var _default = userController;
exports["default"] = _default;