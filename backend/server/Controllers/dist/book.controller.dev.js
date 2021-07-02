"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _models = _interopRequireDefault(require("../database/models"));

var _uploadUtils = require("../Utilities/uploadUtils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Book = _models["default"].Book,
    Rating = _models["default"].Rating,
    BookReaction = _models["default"].BookReaction;
/**
 * upload books
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @return {object} JSON representing success message
 */

var uploadBook = function uploadBook(req, res) {
  var uploadResults;
  return regeneratorRuntime.async(function uploadBook$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;

          if (req.files) {
            _context.next = 3;
            break;
          }

          return _context.abrupt("return", res.status(401).json({
            message: "Please attached some files to upload"
          }));

        case 3:
          _context.next = 5;
          return regeneratorRuntime.awrap((0, _uploadUtils.upload)(req.files.image));

        case 5:
          uploadResults = _context.sent;
          console.log("uploadResults", uploadResults);
          (0, _uploadUtils.removeFolder)("tmp");
          _context.next = 13;
          break;

        case 10:
          _context.prev = 10;
          _context.t0 = _context["catch"](0);
          return _context.abrupt("return", res.status(500).json({
            message: _context.t0.message
          }));

        case 13:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 10]]);
};
/**
 * Featured books
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @return {object} JSON representing success message
 */


var getNumberOfFeaturedBooks = function getNumberOfFeaturedBooks(req, res) {
  var books;
  return regeneratorRuntime.async(function getNumberOfFeaturedBooks$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(Book.findAll({
            limit: 20
          }));

        case 3:
          books = _context2.sent;
          return _context2.abrupt("return", res.status(200).json({
            message: "Books successfully retrieved",
            books: books
          }));

        case 7:
          _context2.prev = 7;
          _context2.t0 = _context2["catch"](0);
          return _context2.abrupt("return", res.status(500).json({
            message: _context2.t0.message
          }));

        case 10:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 7]]);
};
/**
 * All paginated books
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @return {object} JSON representing success message
 */


var allBooks = function allBooks(req, res) {
  var regex, page, _allBooks, bookCount, numberOfBooksPerPage, currentPage, startFrom, allBooksResult;

  return regeneratorRuntime.async(function allBooks$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          regex = /^\d+$/;

          if (req.query.page.match(regex)) {
            _context3.next = 3;
            break;
          }

          return _context3.abrupt("return", res.status(401).json({
            message: "Pages does not match"
          }));

        case 3:
          page = Number(req.query.page);
          _context3.prev = 4;
          _context3.next = 7;
          return regeneratorRuntime.awrap(Book.findAndCountAll());

        case 7:
          _allBooks = _context3.sent;
          bookCount = _allBooks.count;
          numberOfBooksPerPage = 15;
          currentPage = page || 1;
          startFrom = req.query.offset ? Number(req.query.offset) : 0;

          if (!(bookCount < 1)) {
            _context3.next = 14;
            break;
          }

          return _context3.abrupt("return", res.status(404).json({
            message: "Books not found"
          }));

        case 14:
          _context3.next = 16;
          return regeneratorRuntime.awrap(Book.findAll({
            offset: startFrom,
            limit: numberOfBooksPerPage
          }));

        case 16:
          allBooksResult = _context3.sent;
          return _context3.abrupt("return", res.status(200).json({
            message: "Books successfully retrieved",
            allBooksResult: allBooksResult
          }));

        case 20:
          _context3.prev = 20;
          _context3.t0 = _context3["catch"](4);
          return _context3.abrupt("return", res.status(500).json({
            message: _context3.t0.message
          }));

        case 23:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[4, 20]]);
};

var _default = {
  uploadBook: uploadBook,
  getNumberOfFeaturedBooks: getNumberOfFeaturedBooks,
  allBooks: allBooks
};
exports["default"] = _default;