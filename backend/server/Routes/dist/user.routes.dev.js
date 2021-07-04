"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _user = _interopRequireDefault(require("../Controllers/user.controller"));

var _user2 = _interopRequireDefault(require("../validations/user.validate"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var createUser = _user["default"].createUser,
    loginUser = _user["default"].loginUser;

var userRoute = _express["default"].Router();

userRoute.post('/auth/signup', _user2["default"], createUser);
userRoute.post('/auth/signin', loginUser);
var _default = userRoute;
exports["default"] = _default;