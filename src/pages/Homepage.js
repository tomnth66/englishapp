import React, { Component } from "react";
import "../css/Homepage.css";
import Navbar from "../components/Navbar.js";
import News from "../components/News.js";
import Login from "../components/Login.js";
import Profile from "../components/Profile.js";

export default class Homepage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="Homepage">
        <div className="HomepageHeader">
          <Navbar></Navbar>
        </div>

        <div className="HomepageBody">
          <News></News>
          {!localStorage.getItem('user') && <Login></Login>}
          {localStorage.getItem('user') &&  <Profile></Profile>}
        </div>
      </div>
    );
  }
}
