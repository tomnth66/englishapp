import React, { Component } from "react";
import "../css/InsideProfile.css";
import Avatar from "./Avatar.js";
import Button from './Button.js';

export default class InsideProfile extends Component {
  constructor(props) {
    super(props);
  }

  handleLogOut(){
    console.log('logging out')
    localStorage.clear();
    window.location.href="/";
  }

  render() {
    return (
      <div className="InsideProfile">
        <Avatar></Avatar>
        {/* <Button></Button> */}
        <div className="Information">
          <p>Name: {localStorage.getItem('user')} ({localStorage.getItem('class')})</p>

          <div className = 'Action'>
            {localStorage.getItem('class')==='admin' && <a href = '/createmap'> Post an announcement</a>}
            {localStorage.getItem('class')==='admin' && <a href = '/createmap'> Createmap</a>}
            {localStorage.getItem('class')==='admin' && <a href = '/studentmanagement'> Student Management</a>}
          </div>
          
          <Button keyword = 'Logout' onClick = {this.handleLogOut.bind(this)}></Button>
        </div>
      </div>
    );
  }
}
