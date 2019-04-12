"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _accountHelper = _interopRequireDefault(require("../helpers/accountHelper"));

var _db = _interopRequireDefault(require("../models/db"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var thesecret_code = 'BANKA_JWT_SECRET_CODE';
var accountController = {
  allAccounts: function allAccounts(req, res) {
    if (!_db["default"].accounts.length) return res.status(404).json({
      status: 404,
      message: 'No account created!'
    });
    return res.status(200).json({
      status: 200,
      data: _db["default"].accounts
    });
  },
  createAccount: function createAccount(req, res) {
    // const token = jwt.sign(req.user, `${thesecret_code}`);
    function randomInt() {
      return Math.floor(Math.random() * (9999999999 - 1000000000) + 1000000000);
    } //   const randomNmber = Math.floor(Math.random() * 10;


    var balance = 0;

    var _validate$validateAcc = _accountHelper["default"].validateAccount(req.body),
        error = _validate$validateAcc.error;

    if (error) return res.status(400).json({
      status: 400,
      error: error.details[0].message
    });else {
      var account = {
        id: _db["default"].accounts.length + 1,
        accountNumber: parseInt(randomInt()),
        firstName: req.user.firstName,
        lastName: req.user.lastName,
        email: req.user.email,
        type: req.body.type,
        status: "active",
        createdOn: new Date(),
        balance: parseFloat(balance)
      };

      _db["default"].accounts.push(account);

      res.status(200).json({
        status: 200,
        message: "Bank account created with this ## ".concat(account.accountNumber, " ## account number, Enjoy our services"),
        data: account
      });
    }
  },
  // activate or draft a user bank account
  activateAccount: function activateAccount(req, res) {
    var account = _db["default"].accounts.find(function (findAccount) {
      return findAccount.accountNumber === parseInt(req.params.accountNumber);
    });

    if (!account) return res.status(400).json({
      status: 400,
      error: "This account number ## ".concat(req.params.accountNumber, " ## was not found !")
    });
    account.status = req.body.status;
    return res.status(200).json({
      status: 200,
      message: 'Account Updated',
      data: account
    });
  },
  //delete an account
  deleteAccount: function deleteAccount(req, res) {
    var account = _db["default"].accounts.find(function (findAccount) {
      return findAccount.accountNumber === parseInt(req.params.accountNumber);
    });

    if (!account) return res.status(400).json({
      status: 400,
      error: "This account number ## ".concat(req.params.accountNumber, " ## was not found !")
    }); //find index of account

    var index = _db["default"].accounts.indexOf(account); //remove account


    _db["default"].accounts.splice(index, 1);

    res.status(200).json({
      status: 200,
      message: "Account successfully deleted"
    });
  }
};
var _default = accountController;
exports["default"] = _default;