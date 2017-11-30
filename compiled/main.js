'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _redux = require('redux');

var _reducers = require('./reducers');

var _GameOfLife = require('./components/GameOfLife');

var _GameOfLife2 = _interopRequireDefault(_GameOfLife);

var _initialState = require('./initialState');

var initialState = _interopRequireWildcard(_initialState);

var _index = require('./actions/index');

var actions = _interopRequireWildcard(_index);

var _timer = require('./timer');

var timer = _interopRequireWildcard(_timer);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// CIS 197 - React HW
var store = (0, _redux.createStore)(_reducers.mainReducer, initialState);

var gameOfLife = _react2.default.createElement(_GameOfLife2.default, { store: store });

document.addEventListener('DOMContentLoaded', function () {
  _reactDom2.default.render(gameOfLife, document.getElementById('container'));
});