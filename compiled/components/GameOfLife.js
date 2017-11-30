'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Cell = require('./Cell');

var _Cell2 = _interopRequireDefault(_Cell);

var _initialState = require('../initialState.js');

var initialState = _interopRequireWildcard(_initialState);

var _index = require('../actions/index.js');

var actions = _interopRequireWildcard(_index);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // CIS 197 - React HW

var GameOfLife = function (_React$Component) {
  _inherits(GameOfLife, _React$Component);

  // Here we subscribe to changes in the store data and update
  // the React component's state by using `store.getState()`.
  // Technically this is non-standard architecture, but we need to
  // organize things this way for the sake of the game's performance.
  // NOTE: further down in the render function, you will need to
  //       access this.state.cells and this.state.x and this.state.y.
  //       For these attributes, be sure to use this.state and not this.props
  function GameOfLife() {
    _classCallCheck(this, GameOfLife);

    var _this = _possibleConstructorReturn(this, (GameOfLife.__proto__ || Object.getPrototypeOf(GameOfLife)).call(this));

    _this.state = initialState;
    _this.onImportSeed = _this.onImportSeed.bind(_this);
    _this.onRun = _this.onRun.bind(_this);
    _this.onStep = _this.onStep.bind(_this);
    _this.onStop = _this.onStop.bind(_this);
    _this.onClear = _this.onClear.bind(_this);
    _this.onExportMap = _this.onExportMap.bind(_this);
    _this.onRandomSeed = _this.onRandomSeed.bind(_this);
    return _this;
  }

  _createClass(GameOfLife, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.props.store.subscribe(function () {
        this.setState(this.props.store.getState());
      }.bind(this));
    }
  }, {
    key: 'onImportSeed',
    value: function onImportSeed(seedName) {
      //  dispatch everything
      this.props.store.dispatch(actions.importSeed(seedName));
    }
  }, {
    key: 'onRun',
    value: function onRun() {
      this.props.store.dispatch(actions.run());
    }
  }, {
    key: 'onStep',
    value: function onStep() {
      this.props.store.dispatch(actions.step());
    }
  }, {
    key: 'onStop',
    value: function onStop() {
      this.props.store.dispatch(actions.stop());
    }
  }, {
    key: 'onClear',
    value: function onClear() {
      this.props.store.dispatch(actions.clear());
    }
  }, {
    key: 'onExportMap',
    value: function onExportMap() {
      this.props.store.dispatch(actions.exportMap());
    }
  }, {
    key: 'onRandomSeed',
    value: function onRandomSeed() {
      this.props.store.dispatch(actions.randomSeed());
    }

    // TODO: here you'll want to implement the functions that get called
    //       when various actions (such as button clicks) occur in thie view.
    //       These functions should, like onImportSeed above, dispatch the
    //       appropriate actions using the Redux store prop.

    // TODO: Generate the following HTML structure:
    // <div class="game-component">
    //   <div class="board-component" style="width=900px">
    //     <span class="cell-widget cell"></span>
    //     <span class="cell-widget cell"></span>
    //     <span class="cell-widget cell alive "></span>
    //      ...remaining cells
    //   </div>
    //   <div class="controls">
    //     <h4>Controls</h4>
    //     <button>run</button>
    //     <button>step</button>
    //     <button>stop</button>
    //     <button>clear</button>
    //     <button>export map</button>
    //   </div>
    //   <div class="seeds">
    //     <button>glider</button>
    //     <button>glider gun</button>
    //     <button>acorn</button>
    //     <button>line</button>
    //     <button>random</button>
    //   </div>
    // </div>
    //
    // HINT: Use the `onClick` prop on your buttons to register click callbacks!
    // NOTE: Please make sure your button text matches the button text above,
    //       as this is necessary for the test suite.
    //       (e.g. your 'step' button should have button text 'step',
    //        and your 'glider gun' button should have button text 'glider gun')
    // HINT: Remember to pass the store as a prop of each <Cell> component
    // HINT: Remember that the application state's `x`, `y`, and `cells` values
    //       are located in this.state and not this.props.

  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var store = this.props.store;
      return _react2.default.createElement(
        'div',
        { className: 'game-component' },
        _react2.default.createElement(
          'div',
          { className: 'container' },
          _react2.default.createElement(
            'div',
            { className: 'toppane' },
            ' Top '
          ),
          _react2.default.createElement(
            'div',
            { className: 'leftpane' },
            _react2.default.createElement(
              'h1',
              null,
              'Left (Profile)'
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'middlepane' },
            'Middle status'
          ),
          _react2.default.createElement(
            'div',
            { className: 'rightpane' },
            _react2.default.createElement(
              'h1',
              null,
              'right (friends)'
            )
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'board-component', style: { width: 1 * this.state.x } },
          this.state.cells.map(function (target, index) {
            var newcell = _react2.default.createElement(_Cell2.default, { alive: target, key: index, index: index, store: store });
            return newcell;
          })
        ),
        _react2.default.createElement(
          'div',
          { className: 'controls' },
          _react2.default.createElement(
            'h4',
            null,
            'Controls'
          ),
          _react2.default.createElement(
            'button',
            { onClick: this.onRun },
            'ruasdfasdfan'
          ),
          _react2.default.createElement(
            'button',
            { onClick: this.onStep },
            'step'
          ),
          _react2.default.createElement(
            'button',
            { onClick: this.onStop },
            'stop'
          ),
          _react2.default.createElement(
            'button',
            { onClick: this.onClear },
            'clear'
          ),
          _react2.default.createElement(
            'button',
            { onClick: this.onExportMap },
            'export map'
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'seeds' },
          _react2.default.createElement(
            'button',
            { onClick: function onClick() {
                _this2.onImportSeed('GLIDER');
              } },
            'glider'
          ),
          _react2.default.createElement(
            'button',
            { onClick: function onClick() {
                _this2.onImportSeed('GLIDER_GUN');
              } },
            'glider gun'
          ),
          _react2.default.createElement(
            'button',
            { onClick: function onClick() {
                _this2.onImportSeed('ACORN');
              } },
            'acorn'
          ),
          _react2.default.createElement(
            'button',
            { onClick: function onClick() {
                _this2.onImportSeed('LINE');
              } },
            'line'
          ),
          _react2.default.createElement(
            'button',
            { onClick: this.onRandomSeed },
            'random'
          )
        )
      );
    }
  }]);

  return GameOfLife;
}(_react2.default.Component);

exports.default = GameOfLife;