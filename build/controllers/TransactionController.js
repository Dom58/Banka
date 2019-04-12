"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _db = _interopRequireDefault(require("../models/db"));

var _transactiontHelper = _interopRequireDefault(require("../helpers/transactiontHelper"));

var _authMiddleware = _interopRequireDefault(require("../middleware/authMiddleware"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var transactionController = {
  allTransactions: function allTransactions(req, res) {
    if (_db["default"].transactions.length === 0) {
      res.status(404).json({
        status: 404,
        error: 'No BANKA transaction recorded yet !!'
      });
    } else {
      res.status(200).json({
        status: 200,
        data: _db["default"].transactions
      });
    }
  },
  makeCreditTransaction: function makeCreditTransaction(req, res) {
    var _validate$validatetra = _transactiontHelper["default"].validatetransaction(req.body),
        error = _validate$validatetra.error;

    if (error) return res.status(400).json({
      status: 400,
      error: error.details[0].message
    });

    var foundAcc = _db["default"].accounts.find(function (found) {
      return found.accountNumber === parseInt(req.params.accountNumber);
    });

    if (!foundAcc) return res.status(404).json({
      status: 404,
      error: "Bank account number ## ".concat(req.params.accountNumber, " ## not found !")
    });else {
      var transaction = {
        transactionId: _db["default"].transactions.length + 1,
        createdOn: new Date(),
        transactionType: "credit",
        accountNumber: req.params.accountNumber,
        cashier: req.body.cashier,
        amount: parseFloat(req.body.amount),
        accountBalance: foundAcc.balance + parseFloat(req.body.amount)
      };
      var index = 0;

      _db["default"].accounts.forEach(function (account) {
        if (account.accountNumber == req.params.accountNumber) {
          _db["default"].accounts[index].balance = transaction.accountBalance;
        }

        index++;
      });

      _db["default"].transactions.push(transaction);

      res.status(200).json({
        success: 200,
        data: transaction
      });
    }
  },
  makeDebitTransaction: function makeDebitTransaction(req, res) {
    var _validate$validatetra2 = _transactiontHelper["default"].validatetransaction(req.body),
        error = _validate$validatetra2.error;

    if (error) return res.status(400).json({
      status: 400,
      error: error.details[0].message
    });

    var foundAcc = _db["default"].accounts.find(function (found) {
      return found.accountNumber === parseInt(req.params.accountNumber);
    });

    if (!foundAcc) return res.status(400).json({
      status: 400,
      error: "Bank account number ## ".concat(req.params.accountNumber, " ## not found !")
    });else if (foundAcc.balance < parseFloat(req.body.amount)) {
      res.status(400).json({
        error: 400,
        message: "Insufficient amount ## ".concat(foundAcc.balance, " ##!? Please recharge your balance !!")
      });
    } else {
      var transaction = {
        transactionId: _db["default"].transactions.length + 1,
        createdOn: new Date(),
        transactionType: "Debit",
        accountNumber: req.params.accountNumber,
        cashier: req.body.cashier,
        amount: parseFloat(req.body.amount),
        accountBalance: foundAcc.balance - parseFloat(req.body.amount)
      };
      var index = 0;

      _db["default"].accounts.forEach(function (account) {
        if (account.accountNumber == req.params.accountNumber) {
          _db["default"].accounts[index].balance = transaction.accountBalance;
        }

        index++;
      });

      _db["default"].transactions.push(transaction);

      res.status(200).json({
        success: 200,
        data: transaction
      });
    }
  }
};
var _default = transactionController;
exports["default"] = _default;