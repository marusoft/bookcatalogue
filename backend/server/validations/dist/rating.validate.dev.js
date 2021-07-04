"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ratingValidator = void 0;

var _models = _interopRequireDefault(require("../database/models"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Book = _models["default"].Book;
var ratingValidator = {
  validateRating: function validateRating(req, res, next) {
    var _req$body, rating, slug, foundBook;

    return regeneratorRuntime.async(function validateRating$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$body = req.body, rating = _req$body.rating, slug = _req$body.slug;

            if (!(!rating || rating === "")) {
              _context.next = 3;
              break;
            }

            return _context.abrupt("return", res.status(401).json({
              message: 'Invalid ratings'
            }));

          case 3:
            if (!(!slug || slug === "")) {
              _context.next = 5;
              break;
            }

            return _context.abrupt("return", res.status(401).json({
              message: 'Invalid ratings'
            }));

          case 5:
            if (/^[1-5]$/.test(rating)) {
              _context.next = 7;
              break;
            }

            return _context.abrupt("return", res.status(401).json({
              message: 'Ratings must have length 1-5'
            }));

          case 7:
            _context.next = 9;
            return regeneratorRuntime.awrap(Book.findOne({
              slug: slug
            }));

          case 9:
            foundBook = _context.sent;

            if (!(foundBook === null || foundBook === undefined)) {
              _context.next = 12;
              break;
            }

            return _context.abrupt("return", res.status(404).json({
              message: 'Book cannot be found'
            }));

          case 12:
            req.body.rating = rating;
            req.body.foundBook = foundBook;
            next();

          case 15:
          case "end":
            return _context.stop();
        }
      }
    });
  }
};
exports.ratingValidator = ratingValidator;