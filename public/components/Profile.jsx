import React from 'react';
import axios from 'axios';


export default class Profile extends React.Component {

  constructor(props) {
    super(props);
    this.state = {info : this.props.info};
    this.uploadFile = this.uploadFile.bind(this);
    this.onEditPro = this.onEditPro.bind(this);
    this.newUserInfo = this.newUserInfo.bind(this);
  }

  newUserInfo() {
    
      var text = document.getElementById('info').value;
      var instance = this;
      axios.post('/userproinfo', {text: text, user: this.props.user}).then(function (response) {
        instance.setState({info : text});
        }).catch(function (error) {
          throw error;
      });
    
  }

  uploadFile() { // update picture This does not work
    var formData = new FormData();
    var selectedFile = document.getElementById('fileinput').files[0];
    console.log(selectedFile);
    console.log('a------');
    formData.append("image", selectedFile);
    formData.append("user", this.props.user);
    axios.post('/userprofile', formData).then(function (response) {

      }).catch(function (error) {
        throw error;
    });
  }

  onEditPro() { //update profile info
    this.props.store.dispatch(actions.cellClicked(this.props.index));
  }

  render() { 
  	return (
      <div>
  		  <h1>  {this.props.user} </h1>
        <h1>  {this.state.info} </h1> 
          <form ref="uploadForm" className="uploader" encType="multipart/form-data" >
          <input type="file" id= "fileinput" />
          <input type= 'button' value="submit" onClick= {this.uploadFile}/>
          </form>  

          <form ref="uploadForm" className="uploader" encType="multipart/form-data">
              <input ref = 'text' type="text" id = "info"  />
              <input type= 'button' value="submit" onClick={this.newUserInfo} />
          </form>
      </div>
	  );
  }
};
