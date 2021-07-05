"use strict";

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _app = _interopRequireDefault(require("../../app"));

var _user = require("./mockData/user.data");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var should = _chai["default"].should,
    expect = _chai["default"].expect;
should();

_chai["default"].use(_chaiHttp["default"]);

var createUserUrl = "/api/v1/auth/signup";
var loginUrl = "/api/v1/auth/signin";
describe("Users Test", function () {
  describe("Test create user endpoint", function () {
    it("should return status code 201 and create new user1", function (done) {
      _chai["default"].request(_app["default"]).post(createUserUrl).send(_user.createUserDetails[0]).end(function (err, res) {
        res.should.have.status(201);
        res.body.should.be.an("object");
        expect(res.body.status).to.equal("success");
        expect(res.body.data.message).to.equal("Account successfully created");
        done();
      });
    });
    it("should return status code 201 and create new user2", function (done) {
      _chai["default"].request(_app["default"]).post(createUserUrl).send(_user.createUserDetails[1]).end(function (err, res) {
        res.should.have.status(201);
        res.body.should.be.an("object");
        expect(res.body.status).to.equal("success");
        expect(res.body.data.message).to.equal("Account successfully created");
        done();
      });
    });
    it("should return status code 201 and create new user3", function (done) {
      _chai["default"].request(_app["default"]).post(createUserUrl).send(_user.createUserDetails[2]).end(function (err, res) {
        res.should.have.status(201);
        res.body.should.be.an("object");
        expect(res.body.status).to.equal("success");
        expect(res.body.data.message).to.equal("Account successfully created");
        done();
      });
    });
    it("should return status code 400 for email undefined", function (done) {
      _chai["default"].request(_app["default"]).post(createUserUrl).send(_user.wrongCreateUserDetails[0]).end(function (err, res) {
        res.should.have.status(401);
        res.body.should.be.an("object");
        done();
      });
    });
    it("should return status code 400 for invalid email", function (done) {
      _chai["default"].request(_app["default"]).post(createUserUrl).send(_user.wrongCreateUserDetails[1]).end(function (err, res) {
        res.should.have.status(401);
        res.body.should.be.an("object");
        done();
      });
    });
    it("should return status code 400 for invalid email", function (done) {
      _chai["default"].request(_app["default"]).post(createUserUrl).send(_user.wrongCreateUserDetails[2]).end(function (err, res) {
        res.should.have.status(401);
        res.body.should.be.an("object");
        done();
      });
    });
    it("should return status code 409 for existing email", function (done) {
      _chai["default"].request(_app["default"]).post(createUserUrl).send(_user.wrongCreateUserDetails[3]).end(function (err, res) {
        res.should.have.status(409);
        res.body.should.be.an("object");
        expect(res.body.error).to.equal("User with this email already exist, please login");
        done();
      });
    });
    it("should return status code 400 for firstname undefined", function (done) {
      _chai["default"].request(_app["default"]).post(createUserUrl).send(_user.wrongCreateUserDetails[4]).end(function (err, res) {
        res.should.have.status(401);
        res.body.should.be.an("object");
        done();
      });
    });
    it("should return status code 400 for invalid firstname", function (done) {
      _chai["default"].request(_app["default"]).post(createUserUrl).send(_user.wrongCreateUserDetails[5]).end(function (err, res) {
        res.should.have.status(401);
        res.body.should.be.an("object");
        done();
      });
    });
    it("should return status code 400 for undefined lastname", function (done) {
      _chai["default"].request(_app["default"]).post(createUserUrl).send(_user.wrongCreateUserDetails[7]).end(function (err, res) {
        res.should.have.status(401);
        res.body.should.be.an("object");
        done();
      });
    });
    it("should return status code 400 for invalid lastname", function (done) {
      _chai["default"].request(_app["default"]).post(createUserUrl).send(_user.wrongCreateUserDetails[8]).end(function (err, res) {
        res.should.have.status(401);
        res.body.should.be.an("object");
        done();
      });
    });
    it("should return status code 400 for undefined password", function (done) {
      _chai["default"].request(_app["default"]).post(createUserUrl).send(_user.wrongCreateUserDetails[10]).end(function (err, res) {
        res.should.have.status(401);
        res.body.should.be.an("object");
        done();
      });
    });
  });
  describe("Test for Login endpoint", function () {
    it("should return status code 200 and login user with correct credentials", function (done) {
      _chai["default"].request(_app["default"]).post(loginUrl).send(_user.createUserDetails[0]).end(function (err, res) {
        res.should.have.status(200);
        res.body.should.be.an("object");
        expect(res.body.status).to.equal("success");
        done();
      });
    });
    it("should return status code 200 and login user with correct credentials then return a success msg", function (done) {
      _chai["default"].request(_app["default"]).post(loginUrl).send(_user.createUserDetails[0]).end(function (err, res) {
        res.should.have.status(200);
        res.body.should.be.an("object");
        expect(res.body.status).to.equal("success");
        expect(res.body.data.message).to.equal("Account successfully signed in");
        console.log("res.body", res.body);
        done();
      });
    });
    it("should return status code 400 and empty email login details ", function (done) {
      _chai["default"].request(_app["default"]).post(loginUrl).send(_user.invalidSigninDetails[0]).end(function (err, res) {
        res.should.have.status(401);
        res.body.should.be.an("object");
        done();
      });
    });
  });
});