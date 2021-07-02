"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var _require = require("sequelize"),
    Model = _require.Model;

module.exports = function (sequelize, DataTypes) {
  var Book =
  /*#__PURE__*/
  function (_Model) {
    _inherits(Book, _Model);

    function Book() {
      _classCallCheck(this, Book);

      return _possibleConstructorReturn(this, _getPrototypeOf(Book).apply(this, arguments));
    }

    return Book;
  }(Model);

  Book.init({
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
    year_released: {
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
      allowNull: false
    },
    amount: {
      type: DataTypes.DECIMAL(20, 4).UNSIGNED,
      allowNull: false
    }
  }, {
    sequelize: sequelize,
    modelName: "Book"
  });
  return Book;
};