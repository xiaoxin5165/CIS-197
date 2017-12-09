import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';


export default class TopBar extends React.Component {

  constructor () {
    super();
  }

  render () { 
    return (
      <div>
        <h1> Hi, {this.props.user}. Welcome to The Social Media Apps
          <Link to = {'/user/' + this.props.user}> Go to Own Page </Link>
          <form action = '/' method = 'get'>
            <input type = 'submit' value = 'Logout'/>
          </form>
        </h1>
      </div>
    );
  }
};

