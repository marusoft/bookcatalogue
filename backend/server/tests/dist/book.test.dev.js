"use strict";

var _chai = _interopRequireDefault(require("chai"));

var _fs = _interopRequireDefault(require("fs"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _app = _interopRequireDefault(require("../../app"));

var _models = _interopRequireDefault(require("../database/models"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Book = _models["default"].Book;
var expect = _chai["default"].expect;

_chai["default"].use(_chaiHttp["default"]); // let userToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZmlyc3RuYW1lIjoiYWJ1bXVhaXoxIiwiZW1haWwiOiJhYkBnbWFpbC5jb20iLCJpYXQiOjE2MjU0MzQzMTh9.8grkuX2vrq-1Vt8wGgpgjelmz3gyRly06pnJKCH2lrk';


var userToken;
var bookOne;
var bookTwo;
var bookThree;
var bookFour;
var bookFive;
var unknown = "Levitz Manna";
describe("Test for All routes", function () {
  before(function _callee() {
    var _ref, rows;

    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return regeneratorRuntime.awrap(Book.findAndCountAll({}));

          case 2:
            _ref = _context.sent;
            rows = _ref.rows;
            bookOne = {
              id: rows[0].id,
              slug: rows[0].slug,
              imgUrl: rows[0].imgUrl,
              quantity_chosen: 1,
              amount: rows[0].amount
            }, bookTwo = {
              id: rows[1].id,
              slug: rows[1].slug,
              imgUrl: rows[1].imgUrl,
              quantity_chosen: 2,
              amount: rows[1].amount
            }, bookThree = {
              id: rows[2].id,
              slug: rows[2].slug,
              imgUrl: rows[2].imgUrl,
              quantity_chosen: 1,
              amount: rows[2].amount
            };
            bookFour = rows[7].title;
            bookFive = rows[7].author;

          case 7:
          case "end":
            return _context.stop();
        }
      }
    });
  });
  describe("Test TO Log Users In", function () {
    it.only('should create token for user after successful login', function _callee2() {
      var res;
      return regeneratorRuntime.async(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return regeneratorRuntime.awrap(_chai["default"].request(_app["default"]).post('/api/v1/auth/signin').send({
                email: "kmurphy1@gmail.com",
                password: "quidax21"
              }));

            case 2:
              res = _context2.sent;
              console.log("res.body", res.body);
              expect(res.body.data).to.have.status(200);
              userToken = res.body.data.token;

            case 6:
            case "end":
              return _context2.stop();
          }
        }
      });
    }); // it("Should return 200 status code and log another user in", async () => {
    //   const res = await chai.request(app).post("/api/v1/login").send({
    //     username: "usernametwo",
    //     password: "password",
    //   });
    //   expect(res.status).to.equal(statusCodes.success);
    //   expect(res.body).to.have.property("data");
    //   expect(res.body.message).to.equal(messages.success);
    //   tokenTwo = res.body.data;
    // });
    // it("Should return 200 status code and log another user in", async () => {
    //   const res = await chai.request(app).post("/api/v1/login").send({
    //     username: "usernamethree",
    //     password: "password",
    //   });
    //   expect(res.status).to.equal(statusCodes.success);
    //   expect(res.body).to.have.property("data");
    //   expect(res.body.message).to.equal(messages.success);
    //   console.log("res", res.body.data);
    //   tokenThree = res.body.data;
    // });
    // it("Should return 401 status code and not log user with wrong details in", async () => {
    //   const res = await chai.request(app).post("/api/v1/login").send({
    //     username: "unknown",
    //     password: "password",
    //   });
    //   expect(res.status).to.equal(statusCodes.unauthorized);
    //   expect(res.body).to.have.property("error");
    // });
  });
  describe("Test GET /books", function () {
    it("Should return status code of 200 and all books", function _callee3() {
      var res;
      return regeneratorRuntime.async(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return regeneratorRuntime.awrap(_chai["default"].request(_app["default"]).get("/api/v1/books?page=15"));

            case 2:
              res = _context3.sent;
              res.should.have.status(200);
              expect(res.body.message).to.equal("Books successfully retrieved");
              expect(res.body.data.allBooksResult).to.be.a('Array');

            case 6:
            case "end":
              return _context3.stop();
          }
        }
      });
    });
    it("Should return status code of 200 and return single book", function _callee4() {
      var res;
      return regeneratorRuntime.async(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return regeneratorRuntime.awrap(_chai["default"].request(_app["default"]).get("/api/v1/books/".concat(bookOne.slug)));

            case 2:
              res = _context4.sent;
              res.should.have.status(200);
              expect(res.body.message).to.equal("Books info successfully retrieved");
              expect(res.body).to.have.property("result");
              expect(res.body.result).to.be.an("object");

            case 7:
            case "end":
              return _context4.stop();
          }
        }
      });
    });
    it("Should return status code of 200 and return all featured books", function _callee5() {
      var res;
      return regeneratorRuntime.async(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return regeneratorRuntime.awrap(_chai["default"].request(_app["default"]).get("/api/v1/featuredbooks"));

            case 2:
              res = _context5.sent;
              res.should.have.status(200);
              expect(res.body.message).to.equal('Books successfully retrieved');
              expect(res.body.books).to.be.a('Array');

            case 6:
            case "end":
              return _context5.stop();
          }
        }
      });
    });
  }); // POST/PUT /carts

  describe("Test /carts", function () {
    it("Should return 201 and add items to cart", function _callee6() {
      var res;
      return regeneratorRuntime.async(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.next = 2;
              return regeneratorRuntime.awrap(_chai["default"].request(_app["default"]).post("/api/v1/carts").set("Authorization", "".concat(userToken)).send({
                cart: [bookOne, bookTwo]
              }));

            case 2:
              res = _context6.sent;
              console.log("res.body1", res.body);
              res.should.have.status(201);
              expect(res.body.status).to.equal("success");
              expect(res.body.data).to.have.property("data");
              expect(res.body.data).to.be.a("Object");

            case 8:
            case "end":
              return _context6.stop();
          }
        }
      });
    });
    it("Should return 403 and not add items to cart if no token is supplied", function _callee7() {
      var res;
      return regeneratorRuntime.async(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.next = 2;
              return regeneratorRuntime.awrap(_chai["default"].request(_app["default"]).post("/api/v1/carts").send({
                cart: [bookOne, bookTwo]
              }));

            case 2:
              res = _context7.sent;
              res.should.have.status(201);
              expect(res.body.status).to.equal("forbidden");
              expect(res.body.error).to.equal("No token supplied");

            case 6:
            case "end":
              return _context7.stop();
          }
        }
      });
    });
    it("Should return 200 and update cart", function _callee8() {
      var res;
      return regeneratorRuntime.async(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              _context8.next = 2;
              return regeneratorRuntime.awrap(_chai["default"].request(_app["default"]).post("/api/v1/addtocart").set("Authorization", "".concat(userToken)).send(bookThree));

            case 2:
              res = _context8.sent;
              res.should.have.status(200);
              expect(res.body.status).to.equal("success");

            case 5:
            case "end":
              return _context8.stop();
          }
        }
      });
    });
  }); // POST /ratings

  describe("Test POST /ratings", function () {
    it("Should return 201 and add items to cart", function _callee9() {
      var res;
      return regeneratorRuntime.async(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              _context9.next = 2;
              return regeneratorRuntime.awrap(_chai["default"].request(_app["default"]).post("/api/v1/ratings").set("Authorization", "".concat(userToken)).send({
                rating: "3",
                slug: bookOne.slug
              }));

            case 2:
              res = _context9.sent;
              res.should.have.status(201);
              expect(res.body.status).to.equal("success");
              expect(res.body.data).to.be.a("Number");

            case 6:
            case "end":
              return _context9.stop();
          }
        }
      });
    });
    it("Should return 400 and not add items to cart if rating is invalid", function _callee10() {
      var res;
      return regeneratorRuntime.async(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              _context10.next = 2;
              return regeneratorRuntime.awrap(_chai["default"].request(_app["default"]).post("/api/v1/ratings").set("Authorization", "".concat(userToken)).send({
                rating: "7",
                slug: bookOne.slug
              }));

            case 2:
              res = _context10.sent;
              res.should.have.status(400);
              expect(res.body.status).to.equal("error");
              expect(res.body.error).to.equal('rating must be between 1- 5');

            case 6:
            case "end":
              return _context10.stop();
          }
        }
      });
    });
    it("Should return 403 and not rate book if no token is found", function _callee11() {
      var res;
      return regeneratorRuntime.async(function _callee11$(_context11) {
        while (1) {
          switch (_context11.prev = _context11.next) {
            case 0:
              _context11.next = 2;
              return regeneratorRuntime.awrap(_chai["default"].request(_app["default"]).post("/api/v1/ratings").send({
                rating: "2",
                slug: bookOne.slug
              }));

            case 2:
              res = _context11.sent;
              res.should.have.status(403);
              expect(res.body.status).to.equal("forbidden");
              expect(res.body.error).to.equal('No token supplied');

            case 6:
            case "end":
              return _context11.stop();
          }
        }
      });
    });
  }); // POST /reactions

  describe("Test POST /reactions", function () {
    it("Should return 201 and add reaction for book", function _callee12() {
      var res;
      return regeneratorRuntime.async(function _callee12$(_context12) {
        while (1) {
          switch (_context12.prev = _context12.next) {
            case 0:
              _context12.next = 2;
              return regeneratorRuntime.awrap(_chai["default"].request(_app["default"]).post("/api/v1/reactions").set("Authorization", "".concat(userToken)).send({
                slug: bookOne.slug
              }));

            case 2:
              res = _context12.sent;
              expect(res.status).to.equal(201);

            case 4:
            case "end":
              return _context12.stop();
          }
        }
      });
    });
    it("Should return 201 and add reaction for another book", function _callee13() {
      var res;
      return regeneratorRuntime.async(function _callee13$(_context13) {
        while (1) {
          switch (_context13.prev = _context13.next) {
            case 0:
              _context13.next = 2;
              return regeneratorRuntime.awrap(_chai["default"].request(_app["default"]).post("/api/v1/reactions").set("Authorization", "".concat(tokenTwo)).send({
                slug: bookTwo.slug
              }));

            case 2:
              res = _context13.sent;
              expect(res.status).to.equal(201);

            case 4:
            case "end":
              return _context13.stop();
          }
        }
      });
    });
    it("Should return 403 and not add reaction to book if no token is supplied", function _callee14() {
      var res;
      return regeneratorRuntime.async(function _callee14$(_context14) {
        while (1) {
          switch (_context14.prev = _context14.next) {
            case 0:
              _context14.next = 2;
              return regeneratorRuntime.awrap(_chai["default"].request(_app["default"]).post("/api/v1/ratings").send({
                slug: bookOne.slug
              }));

            case 2:
              res = _context14.sent;
              expect(res.status).to.equal(493);
              expect(res.body.error).to.equal('No token supplied');

            case 5:
            case "end":
              return _context14.stop();
          }
        }
      });
    });
  });
  describe("Test GET /search", function () {
    it("Should return 200 if item is found", function _callee15() {
      var res;
      return regeneratorRuntime.async(function _callee15$(_context15) {
        while (1) {
          switch (_context15.prev = _context15.next) {
            case 0:
              _context15.next = 2;
              return regeneratorRuntime.awrap(_chai["default"].request(_app["default"]).get("/api/v1/search?title=".concat(bookFour)));

            case 2:
              res = _context15.sent;
              expect(res.status).to.equal(200);

            case 4:
            case "end":
              return _context15.stop();
          }
        }
      });
    });
    it("Should return 200 if item is found", function _callee16() {
      var res;
      return regeneratorRuntime.async(function _callee16$(_context16) {
        while (1) {
          switch (_context16.prev = _context16.next) {
            case 0:
              _context16.next = 2;
              return regeneratorRuntime.awrap(_chai["default"].request(_app["default"]).get("/api/v1/search?author=".concat(bookFive)));

            case 2:
              res = _context16.sent;
              expect(res.status).to.equal(200);

            case 4:
            case "end":
              return _context16.stop();
          }
        }
      });
    });
    it("Should return 404 if item is not found in search", function _callee17() {
      var res;
      return regeneratorRuntime.async(function _callee17$(_context17) {
        while (1) {
          switch (_context17.prev = _context17.next) {
            case 0:
              _context17.next = 2;
              return regeneratorRuntime.awrap(_chai["default"].request(_app["default"]).get("/api/v1/search?author=".concat(unknown)));

            case 2:
              res = _context17.sent;
              expect(res.status).to.equal(404);
              expect(res.body.error).to.equal('Request cannot br retrieved');

            case 5:
            case "end":
              return _context17.stop();
          }
        }
      });
    });
  });
  it("should upload image asset", function _callee18() {
    var res;
    return regeneratorRuntime.async(function _callee18$(_context18) {
      while (1) {
        switch (_context18.prev = _context18.next) {
          case 0:
            _context18.prev = 0;
            _context18.next = 3;
            return regeneratorRuntime.awrap(_chai["default"].request(_app["default"]).post("/api/v1/uploads").set("content-type", "multipart/form-data").attach("image", _fs["default"].readdirSync("".concat(__dirname, "/")), "assets/"));

          case 3:
            res = _context18.sent;
            _context18.next = 9;
            break;

          case 6:
            _context18.prev = 6;
            _context18.t0 = _context18["catch"](0);
            console.log(_context18.t0);

          case 9:
          case "end":
            return _context18.stop();
        }
      }
    }, null, null, [[0, 6]]);
  });
});