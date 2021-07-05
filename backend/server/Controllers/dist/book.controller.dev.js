"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _models = _interopRequireDefault(require("../database/models"));

var _app = _interopRequireDefault(require("../../app"));

var _uploadUtils = require("../Utilities/uploadUtils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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

          return _context.abrupt("return", res.status(400).json({
            message: "Please attached some files to upload"
          }));

        case 3:
          _context.next = 5;
          return regeneratorRuntime.awrap((0, _uploadUtils.upload)(req.files.image));

        case 5:
          uploadResults = _context.sent;
          (0, _uploadUtils.removeFolder)("tmp");
          _context.next = 12;
          break;

        case 9:
          _context.prev = 9;
          _context.t0 = _context["catch"](0);
          return _context.abrupt("return", res.status(500).json({
            message: _context.t0.message
          }));

        case 12:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 9]]);
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

          return _context3.abrupt("return", res.status(400).json({
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
            data: {
              allBooksResult: allBooksResult
            }
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

var getSummationOfCartItem = function getSummationOfCartItem(req, res) {
  var cart, result, subTotal, _i, cartObj;

  return regeneratorRuntime.async(function getSummationOfCartItem$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          cart = req.body.cart;
          /**
           * check if slug in obj === slug in db
           * if equal, check if price is same as db
           * also check if qty requested is available
           */

          _context4.prev = 1;
          _context4.next = 4;
          return regeneratorRuntime.awrap(Promise.all(cart.map(function (book) {
            return Book.findOne({
              slug: book.slug
            });
          })));

        case 4:
          result = _context4.sent;
          subTotal = 0;
          _i = 0;

        case 7:
          if (!(_i < result.length)) {
            _context4.next = 19;
            break;
          }

          if (!(Number(result[_i].amount) !== Number(cart[_i].amount))) {
            _context4.next = 10;
            break;
          }

          return _context4.abrupt("return", res.status(400).json({
            message: function message(slug) {
              return "Looks like the amount of ".concat(slug, " has been tampered with (cart[i].slug)");
            }
          }));

        case 10:
          if (!(result[_i].quantity_available < +cart[_i].quantity_chosen)) {
            _context4.next = 12;
            break;
          }

          return _context4.abrupt("return", res.status(400).json({
            message: function message(slug) {
              return "you have selected more than we have in stock for ".concat(slug);
            }
          }));

        case 12:
          result[_i].quantity_available = Number(result[_i].quantity_available) - Number(cart[_i].quantity_chosen);
          _context4.next = 15;
          return regeneratorRuntime.awrap(result[_i].save());

        case 15:
          subTotal += +result[_i].amount * cart[_i].quantity_chosen;

        case 16:
          _i++;
          _context4.next = 7;
          break;

        case 19:
          cartObj = {
            cart: cart
          };
          cartObj.subtotal = subTotal;

          _app["default"].set(req.user.payload, JSON.stringify(cartObj), "EX", 86400);

          return _context4.abrupt("return", res.status(200).json({
            message: function message(slug) {
              return "you have selected more than we have in stock for ".concat(slug, " ").concat(cart[i].slug);
            },
            cartObj: cartObj
          }));

        case 25:
          _context4.prev = 25;
          _context4.t0 = _context4["catch"](1);
          return _context4.abrupt("return", res.status(500).json({
            message: _context4.t0.message
          }));

        case 28:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[1, 25]]);
};
/**
 * Add cart
 * @param {object} req
 * @param {object} res
 */


var addToCart = function addToCart(req, res) {
  var cartObj, newCart;
  return regeneratorRuntime.async(function addToCart$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          newCart = req.body;

          _app["default"].get(req.user.payload, function _callee(err, cart) {
            var result;
            return regeneratorRuntime.async(function _callee$(_context5) {
              while (1) {
                switch (_context5.prev = _context5.next) {
                  case 0:
                    if (!err) {
                      _context5.next = 2;
                      break;
                    }

                    return _context5.abrupt("return", res.status(500).json({
                      message: error.message
                    }));

                  case 2:
                    cartObj = JSON.parse(cart);
                    _context5.prev = 3;
                    _context5.next = 6;
                    return regeneratorRuntime.awrap(Book.findOne({
                      slug: newCart.slug
                    }));

                  case 6:
                    result = _context5.sent;

                    if (!(result.quantity_available < +newCart.quantity_chosen)) {
                      _context5.next = 9;
                      break;
                    }

                    return _context5.abrupt("return", res.status(400).json({
                      message: function message(slug) {
                        return "you have selected more than we have in stock for ".concat(slug, " ").concat(newCart.slug);
                      }
                    }));

                  case 9:
                    if (!(+result.amount !== +newCart.amount)) {
                      _context5.next = 11;
                      break;
                    }

                    return _context5.abrupt("return", res.status(400).json({
                      message: function message(slug) {
                        return "(slug) => Looks like the amount of ".concat(slug, " has been tampered with, ").concat(newCart.slug);
                      }
                    }));

                  case 11:
                    cartObj.cart.push(newCart);
                    result.quantity_available = Number(result.quantity_available) - Number(newCart.quantity_chosen);
                    _context5.next = 15;
                    return regeneratorRuntime.awrap(result.save());

                  case 15:
                    cartObj.subtotal += Number(newCart.amount) * Number(newCart.quantity_chosen);

                    _app["default"].set(req.user.payload.firstname, JSON.stringify(cartObj), "EX", 1200);

                    return _context5.abrupt("return", res.status(200).json({
                      message: "Request successfully retrieved",
                      cartObj: cartObj
                    }));

                  case 20:
                    _context5.prev = 20;
                    _context5.t0 = _context5["catch"](3);
                    return _context5.abrupt("return", res.status(500).json({
                      message: _context5.t0.message
                    }));

                  case 23:
                  case "end":
                    return _context5.stop();
                }
              }
            }, null, null, [[3, 20]]);
          });

        case 2:
        case "end":
          return _context6.stop();
      }
    }
  });
};
/**
 * Book information
 * @param {object} req 
   @param {object} res 
 */


var bookInfo = function bookInfo(req, res) {
  var result;
  return regeneratorRuntime.async(function bookInfo$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          _context7.next = 3;
          return regeneratorRuntime.awrap(Book.findOne({
            slug: req.params.id
          }));

        case 3:
          result = _context7.sent;

          if (!(result === null || result === undefined)) {
            _context7.next = 6;
            break;
          }

          return _context7.abrupt("return", res.status(404).json({
            message: "Books info not found"
          }));

        case 6:
          return _context7.abrupt("return", res.status(200).json({
            message: "Books info successfully retrieved",
            result: result.dataValues
          }));

        case 9:
          _context7.prev = 9;
          _context7.t0 = _context7["catch"](0);
          return _context7.abrupt("return", res.status(500).json({
            message: _context7.t0.message
          }));

        case 12:
        case "end":
          return _context7.stop();
      }
    }
  }, null, null, [[0, 9]]);
};
/**
 * Book rating
 * @param {object} req
 * @param {object} res
 */


var bookRating = function bookRating(req, res) {
  var _req$body, foundBook, rating, bookSlug, authorId, ratingObj, bookRatings, bookRatingStar, sum;

  return regeneratorRuntime.async(function bookRating$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          _req$body = req.body, foundBook = _req$body.foundBook, rating = _req$body.rating;
          bookSlug = foundBook.slug;
          authorId = req.user.payload.id;
          ratingObj = {
            authorId: authorId,
            bookSlug: bookSlug,
            rating: rating
          };
          _context8.prev = 4;
          _context8.next = 7;
          return regeneratorRuntime.awrap(Rating.create(ratingObj));

        case 7:
          _context8.next = 9;
          return regeneratorRuntime.awrap(Rating.findAll({
            where: {
              bookSlug: bookSlug
            }
          }));

        case 9:
          bookRatings = _context8.sent;
          bookRatingStar = 0;

          if (bookRatings.length) {
            _context8.next = 13;
            break;
          }

          return _context8.abrupt("return", bookRatingStar);

        case 13:
          sum = 0;
          bookRatings.forEach(function (values) {
            sum += Number(values.rating);
          });
          bookRatingStar = sum / bookRatings.length;
          bookRatingStar.toFixed(1);
          return _context8.abrupt("return", res.status(201).json({
            message: "Books rating successfully created",
            bookRatingStar: bookRatingStar
          }));

        case 20:
          _context8.prev = 20;
          _context8.t0 = _context8["catch"](4);
          return _context8.abrupt("return", res.status(500).json({
            message: _context8.t0.message
          }));

        case 23:
        case "end":
          return _context8.stop();
      }
    }
  }, null, null, [[4, 20]]);
};
/**
 * Like and Dislike
 * @param {object} req
 * @param {object} res
 */


var likeAndDislike = function likeAndDislike(req, res) {
  var slug, userId, where, bookReaction, _reactionCount, create, reactionCount;

  return regeneratorRuntime.async(function likeAndDislike$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          slug = req.body.slug;
          userId = req.user.payload.id;
          where = _defineProperty({}, Op.and, [{
            bookSlug: slug
          }, {
            likedBy: userId
          }]);
          _context9.prev = 3;
          _context9.next = 6;
          return regeneratorRuntime.awrap(BookReaction.findOne({
            where: where
          }));

        case 6:
          bookReaction = _context9.sent;

          if (!bookReaction) {
            _context9.next = 14;
            break;
          }

          _context9.next = 10;
          return regeneratorRuntime.awrap(BookReaction.destroy({
            where: where
          }));

        case 10:
          _context9.next = 12;
          return regeneratorRuntime.awrap(BookReaction.findAll({
            where: {
              bookSlug: slug
            }
          }));

        case 12:
          _reactionCount = _context9.sent;
          return _context9.abrupt("return", res.status(200).json({
            message: "Books reaction successfully removed",
            reactionCount: _reactionCount.length
          }));

        case 14:
          _context9.next = 16;
          return regeneratorRuntime.awrap(BookReaction.create({
            isLiked: true,
            likedBy: userId,
            bookSlug: slug
          }));

        case 16:
          create = _context9.sent;
          _context9.next = 19;
          return regeneratorRuntime.awrap(BookReaction.findAll({
            where: {
              bookSlug: slug
            }
          }));

        case 19:
          reactionCount = _context9.sent;
          return _context9.abrupt("return", res.status(201).json({
            message: "Books reaction successfully created",
            reactionCount: reactionCount.length
          }));

        case 23:
          _context9.prev = 23;
          _context9.t0 = _context9["catch"](3);
          return _context9.abrupt("return", res.status(500).json({
            message: _context9.t0.message
          }));

        case 26:
        case "end":
          return _context9.stop();
      }
    }
  }, null, null, [[3, 23]]);
};
/**
 * Search Books
 * @param {object} req
 * @param {object} res
 */


var bookSearch = function bookSearch(req, res) {
  var _req$query, offset, limit, order, sort, rest, options, key, value, field, result;

  return regeneratorRuntime.async(function bookSearch$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
        case 0:
          _req$query = req.query, offset = _req$query.offset, limit = _req$query.limit, order = _req$query.order, sort = _req$query.sort, rest = _objectWithoutProperties(_req$query, ["offset", "limit", "order", "sort"]);
          offset = offset ? Number(offset) : 0;
          limit = limit ? Number(limit) : 10;
          options = {};

          if (Object.keys(rest).length) {
            for (key in rest) {
              if (rest.hasOwnProperty(key)) {
                value = key === "q" ? _defineProperty({}, Op.iLike, "%".concat(rest[key], "%")) : rest[key];
                field = key === "q" ? "title" || "author" : key;
                options[field] = value;
              }
            }
          }

          _context10.prev = 5;
          _context10.next = 8;
          return regeneratorRuntime.awrap(Book.findAndCountAll({
            where: options,
            order: [[sort || "updatedAt", order || "DESC"]],
            offset: offset,
            limit: limit
          }));

        case 8:
          result = _context10.sent;

          if (!(result.rows.length > 0)) {
            _context10.next = 13;
            break;
          }

          return _context10.abrupt("return", res.status(200).json({
            message: "Request successfully retrieved",
            result: result.rows
          }));

        case 13:
          return _context10.abrupt("return", res.status(404).json({
            message: "Request not found"
          }));

        case 14:
          _context10.next = 19;
          break;

        case 16:
          _context10.prev = 16;
          _context10.t0 = _context10["catch"](5);
          return _context10.abrupt("return", res.status(500).json({
            message: _context10.t0.message
          }));

        case 19:
        case "end":
          return _context10.stop();
      }
    }
  }, null, null, [[5, 16]]);
};

var _default = {
  uploadBook: uploadBook,
  getNumberOfFeaturedBooks: getNumberOfFeaturedBooks,
  allBooks: allBooks,
  getSummationOfCartItem: getSummationOfCartItem,
  addToCart: addToCart,
  bookInfo: bookInfo,
  bookRating: bookRating,
  likeAndDislike: likeAndDislike,
  bookSearch: bookSearch
};
exports["default"] = _default;