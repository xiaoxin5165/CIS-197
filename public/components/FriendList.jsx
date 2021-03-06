import React from 'react';
import axios from 'axios';


export default class FriendList extends React.Component {

  constructor (props) {
    super(props);
    this.addcomment = this.addcomment.bind(this);
    this.like = this.like.bind(this);
    this.delete = this.delete.bind(this);
    this.state = {status : this.props.status, loading: false};
  }

  like (index, like) { // like a comment
    var instance = this;
    instance.setState({loading: true});
    axios.post('/likecomment/' + this.props.user + '/' + this.props.loggedin, {like : like, index: index}).then(function (response) {
      instance.setState({loading: false, status: response.data});
    }).catch(function (error) {
      throw error
    });
  }

  delete (index) { // delete a comment
    var instance = this;
    instance.setState({loading: true});
    axios.post('/deletecomment/' + this.props.user, {index: index}).then(function (response) {
      instance.setState({loading: false, status: response.data});
    }).catch(function (error) {
      throw error
    });
  }

  addcomment () { // add a comment
    var instance = this;
    var text = document.getElementById('info2').value;
    instance.setState({loading: true});
    axios.post('/usercomment/' + this.props.user + '/' + this.props.loggedin, {comment: text}).then(function (response) {
      instance.setState({loading: false, status: response.data});
    }).catch(function (error) {
      throw error;
    });
  }

  componentWillReceiveProps (nextProps) { // get all comments of user when changes
    var instance = this;
    instance.setState({loading: true});
    axios.get('/usercomment' + '/' + nextProps.user).then(function (response) {
      var comments = response.data;
      instance.setState({loading: false, status: comments});
      }).catch(function (error) {
        throw error;
    });
  }

  componentWillMount () { // obtain the first info for user when user logs in
    var instance = this;
    instance.setState({loading: true});
    axios.get('/usercomment' + '/' + this.props.user).then(function (response) {
      var comments = response.data;
      instance.setState({loading: false, status: comments});
      }).catch(function (error) {
        throw error;
    });
  }

  render() { // Renders all the comments
    var state = this.state;
    var thi = this;
    if (state.loading) {
      return (<h1> This part is still loading</h1>);
    }
    return (
      <div>
        <h1> 
          {state.status.map(function (name, index){
            return (
              <div className = 'w3-panel w3-green' key = {index}>
                {name.text} by {name.from}
                <img src = 'https://d30y9cdsu7xlg0.cloudfront.net/png/100266-200.png' alt = 'image1' width = '40' height = '40' />
                {(name.liked !== undefined) ? name.liked.length : 0}
                <div type = 'button' onClick={() => thi.like(index, (name.liked.indexOf(thi.props.loggedin) === -1))}> {((name.liked.indexOf(thi.props.loggedin) === -1) ? 'like' : 'dislike')} </div>  
                  {(thi.props.loggedin === thi.props.user || name.from === thi.props.loggedin) ? <div onClick = {() => thi.delete(index)} > Delete </div> : <div/>}
              </div>
            );
          })}
        </h1>
        <form ref = 'uploadForm' className = 'uploader' encType = 'multipart/form-data'>
          <input ref = 'text' type = 'text' id = 'info2'  />
          <input type = 'button' value = 'submit' onClick = {this.addcomment} />
        </form>
      </div>
    );
  }
};