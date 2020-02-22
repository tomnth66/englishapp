import React, { Component } from "react";
import "../css/RegisterDone.css";
import Button from "./Button.js";


// let username='',password='',retypePassword ='',studentName='',course='',email ='';

export default class RegisterDone extends Component {
  constructor(props) {
    super(props);
  }

 
  BackToHomepage(){
    window.location.href = '/';
  }

  
  render() {
    return (
      <div className="RegisterDone">
        <div className = 'Cover'>
        </div>

        <div className = 'RegisterDoneInside'>
          <h1>Thank you for joining SYNTAXI</h1>
          <div className = 'RegisterDoneButton'>
                <Button keyword = 'Back to homepage' 
                        onClick = {this.BackToHomepage.bind(this)}></Button>
          </div>
        </div>
      </div>
    );
  }
}
