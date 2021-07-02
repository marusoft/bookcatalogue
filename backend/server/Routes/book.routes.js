import express from 'express';
import fileUpload from 'express-fileupload';
import bookController from '../Controllers/book.controller'


const { uploadBook, getNumberOfBooks, allBooks } = bookController;


const bookRoute = express.Router();


bookRoute.post('/uploads', fileUpload({useTempFiles: true}), uploadBook);
bookRoute.get('/featuredbooks', getNumberOfBooks);
bookRoute.get('/books', allBooks)


export default bookRoute;

