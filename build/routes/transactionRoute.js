"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _TransactionController = _interopRequireDefault(require("../controllers/TransactionController"));

var _authMiddleware = _interopRequireDefault(require("../middleware/authMiddleware"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var path = require('path');

var route = _express["default"].Router(); //Banka Transaction APIs


route.get('/api/v1/transactions', _authMiddleware["default"], _TransactionController["default"].allTransactions);
route.post('/api/v1/transactions/:accountNumber/credit', _authMiddleware["default"], _TransactionController["default"].makeCreditTransaction);
route.post('/api/v1/transactions/:accountNumber/debit', _authMiddleware["default"], _TransactionController["default"].makeDebitTransaction);
var _default = route;
exports["default"] = _default;