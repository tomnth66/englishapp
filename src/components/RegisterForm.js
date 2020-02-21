import React, { Component } from "react";
import "../css/RegisterForm.css";

export default class RegisterForm extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="RegisterForm">
        <div className = 'Cover'>

        </div>

        <div className = 'FormInside'>
          <h1>Welcome to SYNTAXI</h1>
        </div>
      </div>
    );
  }
}
