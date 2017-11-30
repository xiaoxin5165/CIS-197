'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setStore = exports.stop = exports.run = undefined;

var _actions = require('./actions');

var actions = _interopRequireWildcard(_actions);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var interval = null; // CIS 197 - React HW

var store = null;

var run = function run() {
  if (!interval) {
    interval = setInterval(function () {
      store.dispatch(actions.step());
    }, 1);
  }
};

var stop = function stop() {
  if (interval) {
    clearInterval(interval);
    interval = null;
  }
};

var setStore = function setStore(s) {
  store = s;
};

exports.run = run;
exports.stop = stop;
exports.setStore = setStore;