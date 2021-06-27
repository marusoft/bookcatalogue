"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    // static associate(models) {
    //   Book.hasMany(models.BookReaction, {
    //     foreignKey: 'bookSlug',
    //     as: 'bookReactions'
    //   });
    //   Book.hasMany(models.Rating, { foreignKey: 'bookSlug', as: 'ratings' });
  
    //   Book.belongsToMany(models.Tag, {
    //     through: 'BookTags',
    //     as: 'tags',
    //     foreignKey: 'bookId'
    //   });
    // }
  }
  Book.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      title: {
        allowNull: false,
        unique: false,
        type: DataTypes.STRING
      },
      author: {
        allowNull: false,
        type: DataTypes.STRING
      },
      description: {
        allowNull: false,
        type: DataTypes.STRING
      },
      bookContent: {
        allowNull: false,
        unique: false,
        type: DataTypes.TEXT
      },
      imgUrl: {
        allowNull: true,
        unique: false,
        type: DataTypes.TEXT
      },
      slug: {
        allowNull: false,
        type: DataTypes.STRING
      },
      year_released:  {
        allowNull: false,
        type: DataTypes.STRING
      },
      date_released: {
        type: DataTypes.STRING
      },
      quantity: {
        type: DataTypes.INTEGER
      },
      publisher_info: {
        type: DataTypes.STRING
      },
      featured: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      amount: {
        type: DataTypes.DECIMAL(20, 4).UNSIGNED,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Book",
    }
  );
  return Book;
};
