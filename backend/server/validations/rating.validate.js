import datastore from '../database/models';

const { Book } = datastore;



export const ratingValidator = {
  async validateRating(req, res, next) {
    let { rating, slug } = req.body;
    if (!rating || rating === "") {
     return res.status(401).json({
       message: 'Invalid ratings'
     });
    }

    if (!slug || slug === "") {
      return res.status(401).json({
        message: 'Invalid ratings'
      });
    }

    if (!/^[1-5]$/.test(rating)) {
      return res.status(401).json({
        message: 'Ratings must have length 1-5'
      });
    }

    const foundBook = await Book.findOne({ slug: slug });
    if (foundBook === null || foundBook === undefined) {
      return res.status(404).json({
        message: 'Book cannot be found'
      });
    }

    req.body.rating = rating;
    req.body.foundBook = foundBook;
    next();
  },
};
