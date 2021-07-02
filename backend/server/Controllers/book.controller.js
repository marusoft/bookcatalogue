import datastore from "../database/models";
import { upload, removeFolder } from "../Utilities/uploadUtils";

const { Book, Rating, BookReaction } = datastore;

/**
 * upload books
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @return {object} JSON representing success message
 */
const uploadBook = async (req, res) => {
  try {
    if (!req.files) {
      return res.status(401).json({
        message: "Please attached some files to upload",
      });
    }
    const uploadResults = await upload(req.files.image);
    console.log(`uploadResults`, uploadResults)
    removeFolder("tmp");
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

/**
 * Featured books
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @return {object} JSON representing success message
 */
const getNumberOfBooks = async (req, res) => {
  try {
    const books = await Book.findAll({ limit: 20 });
    return res.status(200).json({
      message: "Books successfully retrieved",
      books,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

/**
 * All paginated books
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @return {object} JSON representing success message
 */
const allBooks = async (req, res) => {
  const regex = /^\d+$/;
  if (!req.query.page.match(regex)){
    return res.status(401).json({
      message: "Pages does not match",
    });
  }
  
  const page = Number(req.query.page);
  try {
    const allBooks = await Book.findAndCountAll();
    const bookCount = allBooks.count;
    const numberOfBooksPerPage = 15;

    const currentPage = page || 1;
    const startFrom = req.query.offset ? Number(req.query.offset) : 0;
    if (bookCount < 1) {
      return res.status(404).json({
        message: "Books not found",
      });
    }

    const allBooksResult = await Book.findAll({
      offset: startFrom,
      limit: numberOfBooksPerPage,
    });
    return res.status(200).json({
      message: "Books successfully retrieved",
      allBooksResult,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export default { uploadBook, getNumberOfBooks, allBooks };
