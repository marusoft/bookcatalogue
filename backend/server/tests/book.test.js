import chai from "chai";
import fs from "fs";
import chaiHttp from "chai-http";
import app from "../../app";
import datastore from "../database/models";

const { Book } = datastore;

const { expect } = chai;

chai.use(chaiHttp);

// let userToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZmlyc3RuYW1lIjoiYWJ1bXVhaXoxIiwiZW1haWwiOiJhYkBnbWFpbC5jb20iLCJpYXQiOjE2MjU0MzQzMTh9.8grkuX2vrq-1Vt8wGgpgjelmz3gyRly06pnJKCH2lrk';

let userToken1;
let userToken2
let userToken3

let bookOne;
let bookTwo;
let bookThree;
let bookFour;
let bookFive;

let author = "Lilian Petrov";

describe("Test for All routes", () => {
  before(async () => {
    // runs before all tests in this file regardless where this line is defined.
    const { rows } = await Book.findAndCountAll({});

    (bookOne = {
      id: rows[0].id,
      slug: rows[0].slug,
      imgUrl: rows[0].imgUrl,
      quantity_chosen: 1,
      amount: rows[0].amount,
    }),
      (bookTwo = {
        id: rows[1].id,
        slug: rows[1].slug,
        imgUrl: rows[1].imgUrl,
        quantity_chosen: 2,
        amount: rows[1].amount,
      }),
      (bookThree = {
        id: rows[2].id,
        slug: rows[2].slug,
        imgUrl: rows[2].imgUrl,
        quantity_chosen: 1,
        amount: rows[2].amount,
      });

    bookFour = rows[7].title;
    bookFive = rows[7].author;
  });

  describe("Test To Login Users", () => {
    it("should create token for user after successful login", async () => {
      const res = await chai.request(app).post("/api/v1/auth/signin").send({
        email: "kmurphy1@gmail.com",
        password: "quidax21",
      });
      expect(res).to.have.status(200);
      expect(res.body).to.have.property("data");
      expect(res.body.data.message).to.equal("Account successfully signed in");
      userToken1 = res.body.data.token;
    });

    it("Should return 200 status code and log another user in", async () => {
      const res = await chai.request(app).post("/api/v1/auth/signin").send({
        email: "kmurphy2@gmail.com",
        password: "quidax21",
      });
      expect(res).to.have.status(200);
      expect(res.body).to.have.property("data");
      expect(res.body.data.message).to.equal("Account successfully signed in");
      userToken2 = res.body.data.token;
    });

    it("Should return 200 status code and log another user in1", async () => {
      const res = await chai.request(app).post("/api/v1/auth/signin").send({
        email: "kmurphy3@gmail.com",
        password: "quidax21",
      });
      expect(res).to.have.status(200);
      expect(res.body).to.have.property("data");
      expect(res.body.data.message).to.equal("Account successfully signed in");
      userToken3 = res.body.data.token;
    });

    it("Should return 401 status code and not log user with wrong details in", async () => {
      const res = await chai.request(app).post("/api/v1/auth/signin").send({
        email: "rrrrrrrrff",
        password: "quidax21",
      });
      expect(res.status).to.equal(401);
      expect(res.body).to.have.property("error");
    });
  });

  describe("Test GET /books", () => {
    it("Should return status code of 200 and all books", async () => {
      const res = await chai.request(app).get("/api/v1/books?page=15");
      res.should.have.status(200);
      expect(res.body.message).to.equal("Books successfully retrieved");
      expect(res.body.data.allBooksResult).to.be.a("Array");
    });

    it("Should return status code of 200 and return single book", async () => {
      const res = await chai.request(app).get(`/api/v1/books/${bookOne.slug}`);
      res.should.have.status(200);
      expect(res.body.message).to.equal("Books info successfully retrieved");
      expect(res.body).to.have.property("result");
      expect(res.body.result).to.be.an("object");
    });

    it("Should return status code of 200 and return all featured books", async () => {
      const res = await chai.request(app).get("/api/v1/featuredbooks");
      res.should.have.status(200);
      expect(res.body.message).to.equal("Books successfully retrieved");
      expect(res.body.books).to.be.a("Array");
    });
  });

  // POST/PUT /carts
  describe("Test /carts", () => {
    it("Should return 201 and add items to cart", async () => {
      const res = await chai
        .request(app)
        .post("/api/v1/carts")
        .set("Authorization", `${userToken1}`)
        .send({ cart: [bookOne, bookTwo] });
      res.should.have.status(200);
      expect(res.body.cartObj).to.be.an("Object",);
      expect(res.body).to.be.a("Object");
    });

    it("Should return 403 and not add items to cart if no token is supplied", async () => {
      const res = await chai
        .request(app)
        .post("/api/v1/carts")
        .send({ cart: [bookOne, bookTwo] });
      res.should.have.status(401);
      expect(res.body.status).to.equal(401);
      expect(res.body.error).to.equal('No authorization header was specified');
    });
  });

  // POST /ratings
  // describe("Test POST /ratings", () => {
  //   it("Should return 201 and add items to cart", async () => {
  //     const res = await chai
  //       .request(app)
  //       .post("/api/v1/ratings")
  //       .set("Authorization", `${userToken1}`)
  //       .send({
  //         rating: "3",
  //         slug: bookOne.slug,
  //       });
  //       console.log(`res.body`, res.body)
  //     res.should.have.status(201);
  //     expect(res.body.status).to.equal("success");
  //     expect(res.body.data).to.be.a("Number");
  //   });

  //   it("Should return 400 and not add items to cart if rating is invalid", async () => {
  //     const res = await chai
  //       .request(app)
  //       .post("/api/v1/ratings")
  //       .set("Authorization", `${userToken1}`)
  //       .send({
  //         rating: "7",
  //         slug: bookOne.slug,
  //       });
  //     res.should.have.status(400);
  //     expect(res.body.status).to.equal("error");
  //     expect(res.body.error).to.equal("rating must be between 1- 5");
  //   });

  //   it("Should return 403 and not rate book if no token is found", async () => {
  //     const res = await chai.request(app).post("/api/v1/ratings").send({
  //       rating: "2",
  //       slug: bookOne.slug,
  //     });
  //     res.should.have.status(403);
  //     expect(res.body.status).to.equal("forbidden");
  //     expect(res.body.error).to.equal("No token supplied");
  //   });
  // });

  // // POST /reactions
  // describe("Test POST /reactions", () => {
  //   it("Should return 201 and add reaction for book", async () => {
  //     const res = await chai
  //       .request(app)
  //       .post("/api/v1/reactions")
  //       .set("Authorization", `${userToken1}`)
  //       .send({
  //         slug: bookOne.slug,
  //       });
  //     expect(res.status).to.equal(201);
  //   });

  //   it("Should return 201 and add reaction for another book", async () => {
  //     const res = await chai
  //       .request(app)
  //       .post("/api/v1/reactions")
  //       .set("Authorization", `${userToken2}`)
  //       .send({
  //         slug: bookTwo.slug,
  //       });
  //     expect(res.status).to.equal(201);
  //   });

  //   // it("Should return 403 and not add reaction to book if no token is supplied", async () => {
  //   //   const res = await chai.request(app).post("/api/v1/ratings").send({
  //   //     slug: bookOne.slug,
  //   //   });
      
  //   //   console.log(`res.body`, res.body)
  //   //   expect(res.status).to.equal(493);
  //   //   expect(res.body.error).to.equal('No authorization header was specified');
  //   // });
  // });

  describe("Test GET /search", () => {
    // it("Should return 200 if item is found", async () => {
    //   const res = await chai
    //     .request(app)
    //     .get(`/api/v1/search?title=${bookFour}`);
    //   expect(res.status).to.equal(200);
    // });

    // it("Should return 200 if item is found", async () => {
    //   const res = await chai
    //     .request(app)
    //     .get(`/api/v1/search?author=${bookFive}`);
    //   expect(res.status).to.equal(200);
    // });

    // it("Should return 404 if item is not found in search", async () => {
    //   const res = await chai
    //     .request(app)
    //     .get(`/api/v1/search?author=${author}`);
    //   expect(res.status).to.equal(404);
    //   expect(res.body.error).to.equal("Request cannot br retrieved");
    // });
  });

  // it("should upload image asset", async () => {
  //   try {
  //     const res = await chai
  //       .request(app)
  //       .post("/api/v1/uploads")
  //       .set("content-type", "multipart/form-data")
  //       .attach("image", fs.readdirSync(`${__dirname}/`), "book-assets/");
  //   } catch (error) {

  //   }
  // });
});
