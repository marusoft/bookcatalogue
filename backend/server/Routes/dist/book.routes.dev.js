"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _expressFileupload = _interopRequireDefault(require("express-fileupload"));

var _book = _interopRequireDefault(require("../Controllers/book.controller"));

var _userAuth = _interopRequireDefault(require("../middlewares/userAuth"));

var _rating = require("../validations/rating.validate");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var validateRating = _rating.ratingValidator.validateRating;
var uploadBook = _book["default"].uploadBook,
    getNumberOfFeaturedBooks = _book["default"].getNumberOfFeaturedBooks,
    allBooks = _book["default"].allBooks,
    getSummationOfCartItem = _book["default"].getSummationOfCartItem,
    addToCart = _book["default"].addToCart,
    bookInfo = _book["default"].bookInfo,
    bookRating = _book["default"].bookRating,
    likeAndDislike = _book["default"].likeAndDislike,
    bookSearch = _book["default"].bookSearch;
var verifyUserToken = _userAuth["default"].verifyUserToken;

var bookRoute = _express["default"].Router();

bookRoute.post("/uploads", (0, _expressFileupload["default"])({
  useTempFiles: true
}), uploadBook);
bookRoute.get("/featuredbooks", getNumberOfFeaturedBooks);
bookRoute.get("/books", allBooks);
bookRoute.get("/books/:id", bookInfo);
bookRoute.post("/carts", getSummationOfCartItem);
bookRoute.post('/addtocart', verifyUserToken, addToCart);
bookRoute.post('/rating', verifyUserToken, bookRating);
bookRoute.post('/ratings', verifyUserToken, validateRating, bookRating);
bookRoute.post('/reactions', verifyUserToken, likeAndDislike);
bookRoute.get('/search', bookSearch);
var _default = bookRoute;
exports["default"] = _default;