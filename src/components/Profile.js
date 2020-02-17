import React, { Component } from "react";
import "../css/Profile.css";
import InsideProfile from "./InsideProfile.js";

export default class News extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="Profile">
        <InsideProfile></InsideProfile>
      </div>
    );
  }
}
