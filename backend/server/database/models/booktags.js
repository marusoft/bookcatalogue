const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class BookTags extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  BookTags.init({
    tagId: DataTypes.INTEGER,
    bookId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'BookTags',
  });
  return BookTags;
};