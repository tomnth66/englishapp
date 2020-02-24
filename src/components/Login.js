import React, { Component } from "react";
import "../css/Login.css";
import InsideLogin from "./InsideLogin.js";
// import Test from "../pages/Test";

export default class Login extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="Login">
        <InsideLogin></InsideLogin>
        {/* <Test></Test> */}
      </div>
    );
  }
}
