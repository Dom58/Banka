"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _userController = _interopRequireDefault(require("../controllers/userController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var path = require('path');

var route = _express["default"].Router();

route.post('/api/v1/auth/signup', _userController["default"].signUp);
route.post('/api/v1/auth/signin', _userController["default"].signIn);
var _default = route;
exports["default"] = _default;