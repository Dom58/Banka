"use strict";

var _joi = _interopRequireDefault(require("joi"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

exports.validatetransaction = function (transaction) {
  var schema = {
    transactionId: _joi["default"].number(),
    acccountNumber: _joi["default"].string(),
    cashier: _joi["default"].number(),
    amount: _joi["default"].number().required()
  };
  return _joi["default"].validate(transaction, schema);
};