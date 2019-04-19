"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _UserController = _interopRequireDefault(require("../controllers/UserController"));

var _authMiddleware = _interopRequireDefault(require("../middleware/authMiddleware"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var route = _express["default"].Router();

route.patch('/api/v1/staff/:id', _authMiddleware["default"], _UserController["default"].createStaff);
var _default = route;
exports["default"] = _default;