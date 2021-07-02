"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _expressFileupload = _interopRequireDefault(require("express-fileupload"));

var _book = _interopRequireDefault(require("../Controllers/book.controller"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var uploadBook = _book["default"].uploadBook,
    getNumberOfFeaturedBooks = _book["default"].getNumberOfFeaturedBooks,
    allBooks = _book["default"].allBooks;

var bookRoute = _express["default"].Router();

bookRoute.post('/uploads', (0, _expressFileupload["default"])({
  useTempFiles: true
}), uploadBook);
bookRoute.get('/featuredbooks', getNumberOfFeaturedBooks);
bookRoute.get('/books', allBooks);
var _default = bookRoute;
exports["default"] = _default;