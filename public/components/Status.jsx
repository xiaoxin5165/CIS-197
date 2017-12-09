import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Profile from './Profile';


export default class Status extends React.Component {

  constructor (props) {
    super(props);
    this.state = {alluser : [], loading: false};
  }

  componentWillMount () { // obtain all the users server
    var instance = this;
    instance.setState({loading: true});
    axios.get('/alluser/' + this.props.user).then(function (response) {
      instance.setState({alluser: response.data, loading: false});
      }).catch(function (error) {
        throw error;
    });
  }


  render () { // renders all users
    var state = this.state;
    if (this.state.loading){
      return (<h1> loading... </h1>);
    }
    return (
      <div>
        {state.alluser.map(function(name, index){ // list every user
          return (
            <h1 className = 'w3-panel w3-red'>
              <Link to = {'/user_info/' + name} key = {index} > {name} </Link>
            </h1>
          )
        })} 
      </div>
    );
  }
};

