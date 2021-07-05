import chai from "chai";
import chaiHttp from "chai-http";
import app from "../../app";

import {
  createUserDetails,
  wrongCreateUserDetails,
  invalidSigninDetails,
} from "./mockData/user.data";

const { should, expect } = chai;
should();

chai.use(chaiHttp);

const createUserUrl = "/api/v1/auth/signup";
const loginUrl = "/api/v1/auth/signin";

describe("Users Test", () => {
  describe("Test create user endpoint", () => {
    it("should return status code 201 and create new user1", (done) => {
      chai
        .request(app)
        .post(createUserUrl)
        .send(createUserDetails[0])
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.an("object");
          expect(res.body.status).to.equal("success");
          expect(res.body.data.message).to.equal(
            "Account successfully created",
          );
          done();
        });
    });
    it("should return status code 201 and create new user2", (done) => {
      chai
        .request(app)
        .post(createUserUrl)
        .send(createUserDetails[1])
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.an("object");
          expect(res.body.status).to.equal("success");
          expect(res.body.data.message).to.equal(
            "Account successfully created"
          );
          done();
        });
    });
    it("should return status code 201 and create new user3", (done) => {
      chai
        .request(app)
        .post(createUserUrl)
        .send(createUserDetails[2])
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.an("object");
          expect(res.body.status).to.equal("success");
          expect(res.body.data.message).to.equal(
            "Account successfully created"
          );
          done();
        });
    });
    it("should return status code 400 for email undefined", (done) => {
      chai
        .request(app)
        .post(createUserUrl)
        .send(wrongCreateUserDetails[0])
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.be.an("object");
          done();
        });
    });
    it("should return status code 400 for invalid email", (done) => {
      chai
        .request(app)
        .post(createUserUrl)
        .send(wrongCreateUserDetails[1])
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.be.an("object");
          done();
        });
    });
    it("should return status code 400 for invalid email", (done) => {
      chai
        .request(app)
        .post(createUserUrl)
        .send(wrongCreateUserDetails[2])
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.be.an("object");
          done();
        });
    });
    it("should return status code 409 for existing email", (done) => {
      chai
        .request(app)
        .post(createUserUrl)
        .send(wrongCreateUserDetails[3])
        .end((err, res) => {
          res.should.have.status(409);
          res.body.should.be.an("object");
          expect(res.body.error).to.equal(
            `User with this email already exist, please login`,
          );
          done();
        });
    });
    it("should return status code 400 for firstname undefined", (done) => {
      chai
        .request(app)
        .post(createUserUrl)
        .send(wrongCreateUserDetails[4])
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.be.an("object");
          done();
        });
    });
    it("should return status code 400 for invalid firstname", (done) => {
      chai
        .request(app)
        .post(createUserUrl)
        .send(wrongCreateUserDetails[5])
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.be.an("object");
          done();
        });
    });
  
    it("should return status code 400 for undefined lastname", (done) => {
      chai
        .request(app)
        .post(createUserUrl)
        .send(wrongCreateUserDetails[7])
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.be.an("object");
          done();
        });
    });
    it("should return status code 400 for invalid lastname", (done) => {
      chai
        .request(app)
        .post(createUserUrl)
        .send(wrongCreateUserDetails[8])
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.be.an("object");
          done();
        });
    });
   
    it("should return status code 400 for undefined password", (done) => {
      chai
        .request(app)
        .post(createUserUrl)
        .send(wrongCreateUserDetails[10])
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.be.an("object");
          done();
        });
    });
   
  });

  describe("Test for Login endpoint", () => {
    it("should return status code 200 and login user with correct credentials", (done) => {
      chai
        .request(app)
        .post(loginUrl)
        .send(createUserDetails[0])
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an("object");
          expect(res.body.status).to.equal("success");
          done();
        });
    });
    it("should return status code 200 and login user with correct credentials then return a success msg", (done) => {
      chai
        .request(app)
        .post(loginUrl)
        .send(createUserDetails[0])
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an("object");
          expect(res.body.status).to.equal("success");
          expect(res.body.data.message).to.equal(
            `Account successfully signed in`,
          
          done();
        });
    });
    it("should return status code 400 and empty email login details ", (done) => {
      chai
        .request(app)
        .post(loginUrl)
        .send(invalidSigninDetails[0])
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.be.an("object");
          done();
        });
    });
  
  });
});
