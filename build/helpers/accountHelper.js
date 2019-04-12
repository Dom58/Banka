"use strict";

var _joi = _interopRequireDefault(require("joi"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

exports.validateAccount = function (account) {
  var schema = {
    accountNumber: _joi["default"].number().min(1000000000).max(9999999999),
    owner: _joi["default"].number(),
    user_id: _joi["default"].number(),
    type: _joi["default"].string().required(),
    status: _joi["default"].string(),
    balance: _joi["default"].number()
  };
  return _joi["default"].validate(account, schema);
};