import React from 'react';
import axios from 'axios';

export default class Profile extends React.Component {

  constructor(props) {
    super(props);
    this.state = {info : this.props.info, profile: null, url: null, loading: false};
    this.uploadFile = this.uploadFile.bind(this);
    this.newUserInfo = this.newUserInfo.bind(this);
    //this.getinitinfo = this.getinitinfo.bind(this);
    this.otherUserInfo = this.otherUserInfo.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    var instance = this;
    instance.setState({loading: true});
    axios.get('/userprofile'+'/'+nextProps.user).then(function (response) {
      var datajpg;

      if (response.data[0].profile !== undefined){
        datajpg = "data:image/jpg;base64," + response.data[0].profile.data;
      }
      instance.setState({loading: false, url: datajpg, info: response.data[0].info});
      }).catch(function (error) {
        throw error;
    });
  }


  otherUserInfo () { // obtain the profile information when visiting other people's page
    var instance = this;
    instance.setState({loading: true});
    axios.get('/userprofile'+'/'+this.props.user, {user: this.props.user}).then(function (response) {
      instance.setState({loading: false});
      }).catch(function (error) {
        throw error;
    });
  }

  componentWillMount(){ // obtain the first info for user when user logs in
    console.log('im in component will mount');
    var instance = this;
    console.log('im rendering component will mount of profile');
    var datajpg = "data:image/jpg;base64," + this.props.profile.data;
    console.log(this.props);
    instance.setState({url: datajpg, info: this.props.info});
  }

  newUserInfo() { // when the user wants to update the story about itself
    var text = document.getElementById('info').value;
    var instance = this;
    axios.post('/userproinfo', {text: text, user: this.props.user}).then(function (response) {
      instance.setState({info : text});
      }).catch(function (error) {
        throw error;
    });
  }

  uploadFile() { // when the user wants to upload new images as profile picture
    var formData = new FormData();
    var selectedFile = document.getElementById('fileinput').files[0];
    var instance = this;
    formData.append("image", selectedFile);
    formData.append("user", this.props.user);
    console.log('im sending a file');
    axios.post('/userprofile/'+this.props.user, formData).then(function (response) {
      var b64encoded = btoa(String.fromCharCode.apply(null, response.data.data.data));
      var datajpg = "data:image/jpg;base64," + b64encoded;
      //document.getElementById("myimage").src = datajpg;
      instance.setState({url : datajpg});
      }).catch(function (error) {
        throw error;
    });
  }

  render() {
    var props = this.props;
    if (this.state.loading){
      return (<h1> loading... </h1>);
    }
  	return (
      <div>
        <img id="ItemPreview" src={this.state.url} width="100%" height="400"/>
  		  <h1>  {this.props.user} </h1>
          <form ref="uploadForm" className="uploader" encType="multipart/form-data" >
          <input type="file" id= "fileinput" />
          <input type= 'button' value="submit" onClick= {this.uploadFile}/>
          </form>  
        <h1>  {this.state.info} </h1> 
          <form ref="uploadForm" className="uploader" encType="multipart/form-data">
              <input ref = 'text' type="text" id = "info"  />
              <input type= 'button' value="submit" onClick={this.newUserInfo} />
          </form>
      </div>
	  );
  }
};

