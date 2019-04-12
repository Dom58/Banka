"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _AccountController = _interopRequireDefault(require("../controllers/AccountController"));

var _authMiddleware = _interopRequireDefault(require("../middleware/authMiddleware"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var path = require('path');

var route = _express["default"].Router(); //Banka Account APIs


route.get('/api/v1/accounts', _authMiddleware["default"], _AccountController["default"].allAccounts);
route.post('/api/v1/accounts', _authMiddleware["default"], _AccountController["default"].createAccount);
route["delete"]('/api/v1/accounts/:accountNumber', _authMiddleware["default"], _AccountController["default"].deleteAccount);
route.patch('/api/v1/accounts/:accountNumber', _authMiddleware["default"], _AccountController["default"].activateAccount);
var _default = route;
exports["default"] = _default;