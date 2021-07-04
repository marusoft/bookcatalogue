"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _joi = _interopRequireDefault(require("joi"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var userValidator = function userValidator(req, res, next) {
  var _req$body = req.body,
      firstname = _req$body.firstname,
      lastname = _req$body.lastname,
      email = _req$body.email,
      password = _req$body.password;

  var schema = _joi["default"].object().keys({
    firstname: _joi["default"].string().required().alphanum(),
    lastname: _joi["default"].string().required().alphanum(),
    email: _joi["default"].string().required().email({
      minDomainSegments: 2,
      tlds: {
        allow: ['com', 'net']
      }
    }),
    password: _joi["default"].string().required()
  });

  var inputValue = {
    firstname: firstname,
    lastname: lastname,
    email: email,
    password: password
  };
  var validateInput = schema.validate(inputValue);

  if (validateInput.error) {
    return res.status(401).json({
      message: "Please supply the correct input value",
      error: validateInput.error.details[0].message
    });
  }

  return next();
};

var _default = userValidator;
exports["default"] = _default;