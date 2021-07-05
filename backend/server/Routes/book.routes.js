import express from 'express';
import fileUpload from 'express-fileupload';
import bookController from '../Controllers/book.controller';
import UserAuth from "../middlewares/userAuth";
import { ratingValidator } from '../validations/rating.validate';


const { validateRating } = ratingValidator;

const {
  uploadBook,
  getNumberOfFeaturedBooks,
  allBooks,
  getSummationOfCartItem,
  addToCart,
  bookInfo,
  bookRating,
  likeAndDislike,
  bookSearch,
} = bookController;

const { verifyUserToken } = UserAuth;

const bookRoute = express.Router();

bookRoute.post("/uploads", fileUpload({ useTempFiles: true }), uploadBook);
bookRoute.get("/featuredbooks", getNumberOfFeaturedBooks);
bookRoute.get("/books", allBooks);
bookRoute.get("/books/:id", bookInfo);
bookRoute.post("/carts", verifyUserToken, getSummationOfCartItem);
bookRoute.post('/addtocart', verifyUserToken, addToCart);
bookRoute.post('/rating', verifyUserToken, bookRating);
bookRoute.post('/ratings', verifyUserToken, validateRating, bookRating);
bookRoute.post('/reactions', verifyUserToken, likeAndDislike);
bookRoute.get('/search', bookSearch);

export default bookRoute;
