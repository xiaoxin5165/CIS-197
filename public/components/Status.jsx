import React from 'react';

export default class Status extends React.Component {

  constructor() {
    super();
    this.comment = this.comment.bind(this);
    this.like = this.like.bind(this);
    this.submit = this.submit.bind(this);
  }

  comment() {
    this.props.store.dispatch(actions.comment());
  }

  like() {
    this.props.store.dispatch(actions.like());
  }

  submit() {
    this.props.store.dispatch(actions.submit());
  }

  render() { // check if it's alive
  	console.log("I am here");
  	return (
  		<h1> Status is being rendered </h1>
	  );
  }
};