import React, { Component } from "react";
import "../css/Avatar.css";
import Ava from "../img/stitch.jpg";

export default class Avatar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="Avatar">
        <img className="Picture" src={Ava}></img>
      </div>
    );
  }
}
