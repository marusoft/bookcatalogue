"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.redisClient = void 0;

var _express = _interopRequireDefault(require("express"));

var _morgan = _interopRequireDefault(require("morgan"));

var _redis = _interopRequireDefault(require("redis"));

var _user = _interopRequireDefault(require("./server/Routes/user.routes"));

var _book = _interopRequireDefault(require("./server/Routes/book.routes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();
var port = parseInt(process.env.PORT, 10) || 2021;
app.use((0, _morgan["default"])('dev'));

var redisClient = _redis["default"].createClient(process.env.REDIS_URL);

exports.redisClient = redisClient;
redisClient.on('connect', function () {
  console.log('Redis client connected');
});
redisClient.on('error', function (err) {
  console.log('Something went wrong ' + err);
});
app.use(_express["default"].json());
app.use(_express["default"].urlencoded({
  extended: false
}));
app.use('/api/v1', _user["default"]);
app.use('/api/v1', _book["default"]);
app.get('/api/v1', function (req, res) {
  return res.status(200).send({
    message: 'A simple REST design for book catalogue'
  });
});
app.get('*', function (req, res) {
  return res.status(404).send({
    message: 'API not found'
  });
});
app.listen(port, function () {
  return console.log("Server running on port ".concat(port, " \uD83D\uDD25"));
});
var _default = app;
exports["default"] = _default;