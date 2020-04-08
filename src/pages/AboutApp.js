import React, { Component } from "react";
import "../css/Homepage.css";
import Navbar from "../components/Navbar.js";
import Footer from '../components/Footer.js';
import AppIntro from "../components/AppIntro.js";
import Login from "../components/Login.js";
import Profile from "../components/Profile.js";

export default class AboutApp extends Component {
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
          <AppIntro></AppIntro>
          {!localStorage.getItem('user') && <Login></Login>}
          {localStorage.getItem('user') &&  <Profile></Profile>}
        </div>

        <div className ="HomepageFooter">
          <Footer></Footer>
        </div>
      </div>
    );
  }
}
