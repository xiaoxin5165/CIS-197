import _ from 'lodash';
import React from 'react';
import Profile from './Profile';
import FriendList from './FriendList';
import Status from './Status';
import TopBar from './TopBar';
import * as initialState from '../initialState.js';
import axios from 'axios';
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom'

export default class GameOfLife extends React.Component {

  constructor () {
    super();
    this.state = {loading :  false};
  }

  componentWillMount () { // Before mounting, obtain data about the user
    var instance = this;
    instance.setState({loading:true});
    axios.get('/userinfo').then(function (response) {
      instance.setState({profile: response.data.profile, status: response.data.status, friends: response.data.friends, username: response.data.username, info: response.data.info, loading: false});
    }).catch(function (error) {
      throw error;
    });
  }

  render () {
    var store = this.props.store;
    if (this.state.loading) {
      return (<h1> Page is loading </h1>);
    }
    return (
      <div>
        <Router> 
          <div className = 'game-component'>
            <div className = 'container'>
              <div className = 'toppane'> 
                {<TopBar store = {store} user = {this.state.username} />} 
              </div>
              <Switch>
                <Route exact path = '/user/:muser' render = {(props) => // react router for profile and comments component
                  (<div><div className = 'leftpane'>                   
                    <Profile store = {store} profile = {this.state.profile} user = {this.state.username} info = {this.state.info} isuser = {true} /> </div>
                    <div className = 'middlepane'>
                      <FriendList store = {store} status = {this.state.status} user = {this.state.username} loggedin = {this.state.username} />
                    </div></div>)
                  }/>
                <Route path = '/user_info/:muser' render = {(props) => 
                  (<div><div className = 'leftpane'> 
                    <Profile store = {store} user = {props.match.params.muser} isuser = {false} /> </div>
                    <div className = 'middlepane'>
                      <FriendList store = {store} status = {this.state.status} user = {props.match.params.muser} loggedin = {this.state.username}/>
                    </div></div>)
                  }/>
              </Switch>
              <div className = 'rightpane'>
                <h1>All Users</h1>
                {<Status store = {store} user = {this.state.username} />}
              </div>
            </div>
          </div>
        </Router>
      </div>
    );
  }
}

