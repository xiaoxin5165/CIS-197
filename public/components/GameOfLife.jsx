// CIS 197 - React HW

import _ from 'lodash';
import React from 'react';
import Cell from './Cell';
import Profile from './Profile';
import FriendList from './FriendList';
import Status from './Status';
import TopBar from './TopBar';
import * as initialState from '../initialState.js';
import * as actions from '../actions/index.js';
import axios from 'axios';



export default class GameOfLife extends React.Component {

  constructor() {
    super();
    this.state = initialState;
    this.onImportSeed = this.onImportSeed.bind(this);
    this.onRun = this.onRun.bind(this);
    this.onStep = this.onStep.bind(this);
    this.onStop = this.onStop.bind(this);
    this.onClear = this.onClear.bind(this);
    this.onExportMap = this.onExportMap.bind(this);
    this.onRandomSeed = this.onRandomSeed.bind(this);

  }

  componentWillMount(){
    var instance = this;
    axios.get('/userinfo').then(function (response) {
      instance.setState({profile: response.data.profile, status: response.data.status, friends: response.data.friends, username: response.data.username, info: response.data.info});
      }).catch(function (error) {
        throw error;
    });
  }

  componentDidMount() {
    this.props.store.subscribe(function () {
      this.setState(this.props.store.getState());
    }.bind(this));
  }

  onImportSeed(seedName) { //  dispatch everything
    this.props.store.dispatch(actions.importSeed(seedName));
  }

  onRun() {
    this.props.store.dispatch(actions.run());
  }

  onStep() {
    this.props.store.dispatch(actions.step());
  }

  onStop() {
    this.props.store.dispatch(actions.stop());
  }

  onClear() {
    this.props.store.dispatch(actions.clear());
  }

  onExportMap() {
    this.props.store.dispatch(actions.exportMap());
  }

  onRandomSeed() {
    this.props.store.dispatch(actions.randomSeed());
  }

  render() {
    var store = this.props.store;
    console.log(this.state);
    return (
      <div className="game-component">
        <div className="container">
          <div className="toppane"> {<TopBar store = {store} user = {this.state.username} />} </div>
          <div className="leftpane">
            <h1></h1> {<Profile store = {store} profile = {this.state.profile} user = {this.state.username} info = {this.state.info} />} </div>
          <div className="middlepane">{<Status store = {store} status = {this.state.status} />}</div>
          <div className="rightpane">
            <h1></h1>{<FriendList  store = {store} friends = {this.state.friends}/>}</div>
        </div>
      </div>
    );
  }
}

