import React from 'react';

export default class FriendList extends React.Component {

  constructor() {
    super();
    this.onFriendClick = this.onFriendClick.bind(this);
  }

  onFriendClick() {
    this.props.store.dispatch(actions.friendClicked(0)); // dummy number fix this later
  }


  render() { // check if it's alive
    var friends = this.props.friends;
  	return (
      <div>
  		<h1> Friendlist </h1>
        { function () {
          if (friends.length === 0) {
           return (<h1> You have no friends </h1>);
          } else {
            // create all friends// buttons?
          }
        } ()
        }
      </div>
	  );
  }
};