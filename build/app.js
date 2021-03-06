"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _users = _interopRequireDefault(require("./routes/users"));

var _accountRoute = _interopRequireDefault(require("./routes/accountRoute"));

var _transactionRoute = _interopRequireDefault(require("./routes/transactionRoute"));

var _staffRoute = _interopRequireDefault(require("./routes/staffRoute"));

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();
var port = process.env.PORT || 3000;
app.use(_express["default"].json());
app.use(_bodyParser["default"].json());
app.use(_bodyParser["default"].urlencoded({
  extended: false
}));
app.use(_users["default"]);
app.use(_accountRoute["default"]);
app.use(_transactionRoute["default"]);
app.use(_staffRoute["default"]);
app.get('/', function (req, res) {
  res.send({
    status: 200,
    message: 'Welcome to Banka application'
  });
});
app.listen(port, function () {
  console.log("Server is running on (http://127.0.0.1:".concat(port, ") "));
});
var _default = app;
exports["default"] = _default;