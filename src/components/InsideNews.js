import React, { Component } from "react";
import "../css/InsideNews.css";
import Ava from '../img/stitch.jpg'
import Newsfooter from './Newsfooter.js'
import 'font-awesome/css/font-awesome.min.css';
import { Button } from '@material-ui/core';

export default class InsideNews extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowSetting: false,
      EditState:false
    }

    this.inputElement1 = React.createRef();
    this.inputElement2 = React.createRef();
    // this.EditTextRef = React.createRef();
  }

  showSetting(){
    this.setState({
      isShowSetting:!this.state.isShowSetting
    }, ()=>{document.addEventListener('mousedown',this.handleClick.bind(this),false);})
  }


  handleClick(event){
    if(this.state.isShowSetting){
      if(!this.inputElement1.current.contains(event.target) 
      && !this.inputElement2.current.contains(event.target)){
          this.setState({
            isShowSetting: false,
          }) 
      }
    }
  }

  EditNews(){
    console.log('editting...');
    this.setState({
      isShowSetting:false,
      EditState:true
    },()=>{
      const Ref = this.EditTextRef;
      const length = this.EditTextRef.value.length;
      Ref.focus();
      Ref.setSelectionRange(length, length);
    })
  }

  DeleteNews(){

  }

  render() {
    const {Announcement} = this.props;
    return (
      <div className = 'InsideNews'>
        <div className = 'Auther'>
          <div className = 'AutherAvatar'>
            <img className="Picture" src={Ava}></img>
          </div>
          <div className = 'AutherName'>
            <span>San</span>
          </div>
          
          {localStorage.getItem('class') === 'admin' &&
          <div className = 'News-icons'>
            <span ref = {this.inputElement1} 
                  onClick = {this.showSetting.bind(this)}><i class="fa fa-ellipsis-h"></i></span>
          </div>}

          {this.state.isShowSetting &&
          <div ref = {this.inputElement2}  
               className = 'News-setting'>
              <ul>
                <li onClick = {this.EditNews.bind(this)}>Edit</li>
                <li onClick = {this.DeleteNews.bind(this)}>Delete</li>
              </ul>
          </div> 
          }
        </div>

        <div className = 'NewsContent'>
          {!this.state.EditState && <p>{Announcement.AnnouncementContent}</p> }

          {this.state.EditState && 
            <div>
              <textarea ref = {ref => this.EditTextRef = ref} value = {Announcement.AnnouncementContent} id = 'EditTextArea'></textarea> 
              <Button color="primary" variant="contained">
                          Post
              </Button>
            </div>
          }
        </div>

        <Newsfooter Announcement = {Announcement}></Newsfooter>
      </div>
    );
  }
}
