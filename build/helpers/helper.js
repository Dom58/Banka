"use strict";

var _joi = _interopRequireDefault(require("joi"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

exports.validateUser = function (user) {
  var schema = {
    firstName: _joi["default"].string().min(2).max(40).required(),
    lastName: _joi["default"].string().min(2).max(40).required(),
    email: _joi["default"].string().email({
      minDomainAtoms: 2
    }).required(),
    // status: joi.string(),
    type: _joi["default"].string(),
    isAdmin: _joi["default"]["boolean"](),
    password: _joi["default"].string().min(6).required()
  };
  return _joi["default"].validate(user, schema);
};

exports.validateLogin = function (user) {
  var login = {
    email: _joi["default"].string().email().required(),
    password: _joi["default"].string().min(6).required()
  };
  return _joi["default"].validate(user, login);
};