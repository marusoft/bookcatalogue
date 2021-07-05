import datastore from "../database/models";
import redisClient from "../../app" 
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
      return res.status(400).json({
        message: "Please attached some files to upload",
      });
    }
    const uploadResults = await upload(req.files.image);
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
const getNumberOfFeaturedBooks = async (req, res) => {
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
  if (!req.query.page.match(regex)) {
    return res.status(400).json({
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
      data: {
        allBooksResult,
      }
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

const getSummationOfCartItem = async (req, res) => {
  const cart = req.body.cart;
  /**
   * check if slug in obj === slug in db
   * if equal, check if price is same as db
   * also check if qty requested is available
   */
  try {
    const result = await Promise.all(
      cart.map((book) => Book.findOne({ slug: book.slug }))
    );

    let subTotal = 0;
    for (let i = 0; i < result.length; i++) {
      if (Number(result[i].amount) !== Number(cart[i].amount)) {
        return res.status(400).json({
          message: (slug) =>
            `Looks like the amount of ${slug} has been tampered with (cart[i].slug)`,
        });
      }
      if (result[i].quantity_available < +cart[i].quantity_chosen) {
        return res.status(400).json({
          message: (slug) =>
            `you have selected more than we have in stock for ${slug}`,
        });
      }

      result[i].quantity_available =
        Number(result[i].quantity_available) - Number(cart[i].quantity_chosen);
      await result[i].save();
      subTotal += +result[i].amount * cart[i].quantity_chosen;
    }
    let cartObj = { cart };
    cartObj.subtotal = subTotal;
    redisClient.set(
      req.user.payload,
      JSON.stringify(cartObj),
      "EX",
      86400
    );
    return res.status(200).json({
      message: (slug) =>
        `you have selected more than we have in stock for ${slug} ${cart[i].slug}`,
      cartObj,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

/**
 * Add cart
 * @param {object} req
 * @param {object} res
 */
const addToCart = async (req, res) => {
  let cartObj;
  const newCart = req.body;

  redisClient.get(req.user.payload, async (err, cart) => {
    if (err) {
      return res.status(500).json({
        message: error.message,
      });
    }

    cartObj = JSON.parse(cart);

    try {
      const result = await Book.findOne({ slug: newCart.slug });
      if (result.quantity_available < +newCart.quantity_chosen) {
        return res.status(400).json({
          message: (slug) =>
            `you have selected more than we have in stock for ${slug} ${newCart.slug}`,
        });
      }
      if (+result.amount !== +newCart.amount) {
        return res.status(400).json({
          message: (slug) =>
            `(slug) => Looks like the amount of ${slug} has been tampered with, ${newCart.slug}`,
        });
      }

      cartObj.cart.push(newCart);
      result.quantity_available =
        Number(result.quantity_available) - Number(newCart.quantity_chosen);
      await result.save();
      cartObj.subtotal +=
        Number(newCart.amount) * Number(newCart.quantity_chosen);
      redisClient.set(
        req.user.payload,
        JSON.stringify(cartObj),
        "EX",
        1200
      );
      return res.status(200).json({
        message: "Request successfully retrieved",
        cartObj,
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  });
};

/**
 * Book information
 * @param {object} req 
   @param {object} res 
 */
const bookInfo = async (req, res) => {
  try {
    const result = await Book.findOne({ slug: req.params.id });
    if (result === null || result === undefined) {
      return res.status(404).json({
        message: "Books info not found",
      });
    }
    return res.status(200).json({
      message: "Books info successfully retrieved",
      result: result.dataValues,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

/**
 * Book rating
 * @param {object} req
 * @param {object} res
 */
const bookRating = async (req, res) => {
  const { foundBook, rating } = req.body;
  const bookSlug = foundBook.slug;
  const { id: authorId } = req.user.payload;
  const ratingObj = {
    authorId,
    bookSlug,
    rating,
  };
  try {
    await Rating.create(ratingObj);

    const bookRatings = await Rating.findAll({
      where: { bookSlug },
    });

    let bookRatingStar = 0;

    if (!bookRatings.length) return bookRatingStar;

    let sum = 0;
    bookRatings.forEach((values) => {
      sum += Number(values.rating);
    });
    bookRatingStar = sum / bookRatings.length;
    bookRatingStar.toFixed(1);
    return res.status(201).json({
      message: "Books rating successfully created",
      bookRatingStar,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

/**
 * Like and Dislike
 * @param {object} req
 * @param {object} res
 */

const likeAndDislike = async (req, res) => {
  const { slug } = req.body;
  const userId = req.user.payload.id;

  const where = {
    [Op.and]: [{ bookSlug: slug }, { likedBy: userId }],
  };

  try {
    const bookReaction = await BookReaction.findOne({
      where,
    });
    if (bookReaction) {
      await BookReaction.destroy({ where });
      const reactionCount = await BookReaction.findAll({
        where: { bookSlug: slug },
      });
      return res.status(200).json({
        message: "Books reaction successfully removed",
        reactionCount: reactionCount.length,
      });
    }

    const create = await BookReaction.create({
      isLiked: true,
      likedBy: userId,
      bookSlug: slug,
    });

    const reactionCount = await BookReaction.findAll({
      where: { bookSlug: slug },
    });

    return res.status(201).json({
      message: "Books reaction successfully created",
      reactionCount: reactionCount.length,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

/**
 * Search Books
 * @param {object} req
 * @param {object} res
 */
const bookSearch = async (req, res) => {
  let { offset, limit, order, sort, ...rest } = req.query;
  offset = offset ? Number(offset) : 0;
  limit = limit ? Number(limit) : 10;
  let options = {};

  if (Object.keys(rest).length) {
    for (const key in rest) {
      if (rest.hasOwnProperty(key)) {
        const value =
          key === "q" ? { [Op.iLike]: `%${rest[key]}%` } : rest[key];
        const field = key === "q" ? "title" || "author" : key;
        options[field] = value;
      }
    }
  }

  try {
    const result = await Book.findAndCountAll({
      where: options,
      order: [[sort || "updatedAt", order || "DESC"]],
      offset,
      limit,
    });
    if (result.rows.length > 0) {
      return res.status(200).json({
        message: "Request successfully retrieved",
        result: result.rows,
      });
    } else {
      return res.status(404).json({
        message: "Request not found",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export default {
  uploadBook,
  getNumberOfFeaturedBooks,
  allBooks,
  getSummationOfCartItem,
  addToCart,
  bookInfo,
  bookRating,
  likeAndDislike,
  bookSearch,
};
