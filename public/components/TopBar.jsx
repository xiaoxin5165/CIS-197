import React from 'react';
import axios from 'axios';


export default class TopBar extends React.Component {

  constructor() {
    super();
    this.onSelfClick = this.onSelfClick.bind(this);
    this.findFriends = this.findFriends.bind(this);
    //this.mongo = require('../../db/mongo_connect.js');
    //console.log('Im here0-3ruehjbfdnsmej23hriefbkjdnk');
  }

  onSelfClick() {
    this.props.store.dispatch(actions.friendClicked(0)); // dummy number fix this later function should still wotk
  }

  findFriends() {
    this.props.store.dispatch(actions.findFriends()); // dummy number fix this later function should still wotk
  }

  render() { // check if it's alive
  	return (
  		<h1> Hi, {this.props.user}. Welcome to Stupid Facebook</h1>
	  );
  }
};