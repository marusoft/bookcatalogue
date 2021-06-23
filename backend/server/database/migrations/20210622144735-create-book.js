"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Books", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        allowNull: false,
        unique: false,
        type: Sequelize.STRING,
      },
      author: {
        type: Sequelize.STRING,
      },
      description: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      bookContent: {
        allowNull: false,
        unique: false,
        type: Sequelize.TEXT,
      },
      imgUrl: {
        allowNull: true,
        unique: false,
        type: Sequelize.TEXT,
      },
      slug: {
        unique: true,
      allowNull: false,
        type: Sequelize.STRING,
      },
      year_released: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      date_released: {
        type: Sequelize.STRING,
      },
      quantity: {
        type: Sequelize.INTEGER,
      },
      publisher_info: {
        type: Sequelize.STRING,
      },
      featured: {
        type: Sequelize.BOOLEAN,
      allowNull: false,
      },
      amount: {
        type: Sequelize.DECIMAL(20, 4).UNSIGNED,
      allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Books");
  },
};
