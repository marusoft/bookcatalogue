"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _models = _interopRequireDefault(require("../database/models"));

var _utils = _interopRequireDefault(require("../Utilities/utils"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var User = _models["default"].User;
/**
 * Create User Account
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @return {object} JSON representing success message
 */

var createUser = function createUser(req, res) {
  var _req$body, firstname, lastname, email, password, savedUser, hashedPassword, newUser, id, token;

  return regeneratorRuntime.async(function createUser$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _req$body = req.body, firstname = _req$body.firstname, lastname = _req$body.lastname, email = _req$body.email, password = _req$body.password;
          _context.next = 4;
          return regeneratorRuntime.awrap(User.findOne({
            where: {
              email: email
            }
          }));

        case 4:
          savedUser = _context.sent;

          if (!savedUser) {
            _context.next = 7;
            break;
          }

          return _context.abrupt("return", res.status(409).json({
            error: "User with this email already exist, please login"
          }));

        case 7:
          hashedPassword = _utils["default"].hashPassword(password);
          _context.next = 10;
          return regeneratorRuntime.awrap(User.create({
            firstname: firstname,
            lastname: lastname,
            email: email,
            password: hashedPassword
          }));

        case 10:
          newUser = _context.sent;
          id = newUser.id;
          token = _utils["default"].generateToken({
            id: id,
            firstname: firstname,
            email: email
          });
          return _context.abrupt("return", res.status(201).json({
            status: "success",
            data: {
              id: id,
              firstname: firstname,
              message: "Account successfully created",
              token: "Bearer ".concat(token)
            }
          }));

        case 16:
          _context.prev = 16;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0);

        case 19:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 16]]);
};
/**
 * Login a user
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @return {object} JSON representing success message
 */


var loginUser = function loginUser(req, res) {
  var _req$body2, email, password, findIfUserExist, validPassword, _findIfUserExist$data, id, firstname, _email, token;

  return regeneratorRuntime.async(function loginUser$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password;
          _context2.prev = 1;
          _context2.next = 4;
          return regeneratorRuntime.awrap(User.findOne({
            where: {
              email: email
            }
          }));

        case 4:
          findIfUserExist = _context2.sent;

          if (findIfUserExist) {
            _context2.next = 7;
            break;
          }

          return _context2.abrupt("return", res.status(401).json({
            error: "Email or Pasword incorrect"
          }));

        case 7:
          validPassword = _utils["default"].verifyPassword(findIfUserExist.dataValues.password, password);

          if (!validPassword) {
            _context2.next = 12;
            break;
          }

          _findIfUserExist$data = findIfUserExist.dataValues, id = _findIfUserExist$data.id, firstname = _findIfUserExist$data.firstname, _email = _findIfUserExist$data.email;
          token = _utils["default"].generateToken({
            id: id,
            firstname: firstname,
            email: _email
          });
          return _context2.abrupt("return", res.status(200).json({
            status: "success",
            data: {
              firstname: firstname,
              message: "Account successfully signed in",
              token: "Bearer ".concat(token),
              id: id
            }
          }));

        case 12:
          return _context2.abrupt("return", res.status(401).json({
            status: "unauthorized",
            error: "Either email or password incorrect"
          }));

        case 15:
          _context2.prev = 15;
          _context2.t0 = _context2["catch"](1);
          res.status(500).json({
            status: 500,
            error: _context2.t0.message
          });

        case 18:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[1, 15]]);
};

var _default = {
  createUser: createUser,
  loginUser: loginUser
};
exports["default"] = _default;