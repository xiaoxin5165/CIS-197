'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.randomSeed = exports.updateCells = exports.mainReducer = undefined;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _timer = require('../timer.js');

var timer = _interopRequireWildcard(_timer);

var _initialState = require('../initialState.js');

var initialState = _interopRequireWildcard(_initialState);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Every time an action is dispatched, this function is called.
// Using the current state and the action just performed (along with
// any payload data associated with it), this function computes the
// next state.
// HOWEVER, note that you CANNOT mutate the state variable directly.
// Instead, you want return a new, updated copy of the state in the
// reducer each time it is called (an easy way to do this is to use
// lodash's _.assign function).
//
// TODO: Implement the following cases:
//       'STOP' - stop the animation by stopping the timer
//       'STEP' - use the updateCells function below to update the cells array
//       'CLEAR' - set the grid to an empty grid and stop the animation
//       'RANDOM_SEED' - set the cells array to a randomly-generated grid
//       'IMPORT_SEED' - update the cells array to the action's seed payload
//                       and stop the animation if necessary.
var mainReducer = function mainReducer(state, action) {
  switch (action.type) {
    case 'RUN':
      timer.run();
      return state;

    case 'EXPORT_MAP':
      {
        var data = encodeURIComponent(state.cells);
        return document.location = '/export?data=[' + data + ']';
      }

    case 'CELL_CLICKED':
      {
        var cells = state.cells.slice(0);
        cells[action.index] = !cells[action.index];
        return _lodash2.default.assign({}, state, { cells: cells });
      }

    case 'STOP':
      {
        timer.stop();
        return state;
      }

    case 'STEP':
      {
        var newstate = updateCells(state);
        return _lodash2.default.assign({}, state, { cells: newstate });
      }

    case 'CLEAR':
      {
        var newcells = Array.apply(null, Array(state.x * state.y)).map(function () {
          return false;
        });
        timer.stop();
        return _lodash2.default.assign({}, state, { cells: newcells });
      }

    case 'RANDOM_SEED':
      {
        var newcell = randomSeed(state);
        return _lodash2.default.assign({}, state, { cells: newcell });
      }

    case 'IMPORT_SEED':
      {
        var newarray = action.seed;
        return _lodash2.default.assign({}, state, { cells: newarray });
      }

  }
  return state;
}; // CIS 197 - React HW

var randomSeed = function randomSeed(state) {
  // TODO: Return a (NEW) randomly generated array of true/false values
  // the same length as state.cells
  var newcells = Array.apply(null, Array(state.x * state.y)).map(function () {
    var rand = Math.random();
    return rand > 0.5;
  });
  return newcells;
};

// This is the main algorithm behind the Game of Life simulation.
// Every time it is called, it computes based on the current state's
// cells the NEXT state's cells and return a copy of the new cells array.
//
// The algorthim determines cell state based on the states of neighbouring
// cells for each iteration according to these rules:
//
// 1 - Any live cell with fewer than two live neighbours dies,as if caused by
//     under-population.
// 2 - Any live cell with two or three live neighbours lives on to the next
//     generation.
// 3 - Any live cell with more than three live neighbours dies, as if by
//     overcrowding.
// 4 - Any dead cell with exactly three live neighbours becomes a live cell,
//     as if by reproduction.
//
var updateCells = function updateCells(state) {
  var newCells = new Array(state.cells.length);
  state.cells.map(function (_, i) {
    var cell = state.cells[i];
    var live_neighbors = 0;
    var x = i % state.x;
    var y = Math.floor(i / state.x);
    var l = x !== 0 && i - 1;
    var r = x !== state.x - 1 && i + 1;
    var t = y !== 0 && i - state.x;
    var b = y !== state.y - 1 && i + state.x;

    var tl = void 0,
        tr = void 0,
        bl = void 0,
        br = void 0;
    l && t && (tl = l - state.x);
    l && b && (bl = l + state.x);
    r && t && (tr = r - state.x);
    r && b && (br = r + state.x);

    [l, r, t, b, tl, bl, tr, br].map(function (n) {
      state.cells[n] && live_neighbors++;
    });

    newCells[i] = cell && (live_neighbors === 2 || live_neighbors === 3) || live_neighbors === 3;
  });
  return newCells;
};

exports.mainReducer = mainReducer;
exports.updateCells = updateCells;
exports.randomSeed = randomSeed;