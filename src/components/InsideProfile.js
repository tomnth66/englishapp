import React, { Component } from "react";
import "../css/InsideProfile.css";
import Avatar from "./Avatar.js";

export default class Navbar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="InsideProfile">
        <Avatar></Avatar>
        {/* <Button></Button> */}
        <div className="Information"></div>
      </div>
    );
  }
}
