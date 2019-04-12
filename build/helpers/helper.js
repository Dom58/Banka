"use strict";

var _joi = _interopRequireDefault(require("joi"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

exports.validateUser = function (user) {
  var schema = {
    firstName: _joi["default"].string().min(2).max(40).required(),
    lastName: _joi["default"].string().min(2).max(40).required(),
    email: _joi["default"].string().email().required(),
    phoneNumber: _joi["default"].string().required(),
    status: _joi["default"].string().required(),
    isAdmin: _joi["default"]["boolean"]().required(),
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