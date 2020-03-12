import React, { Component } from "react";
import "../css/Homepage.css";
import Navbar from "../components/Navbar.js";
import Footer from '../components/Footer.js';
import Profile from "../components/Profile.js";
// import InsideRanking from "../components/InsideRanking.js";
import InsideAnnouncement from "../components/InsideAnnouncement.js";


export default class Announcement extends Component {
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
          <InsideAnnouncement></InsideAnnouncement>
          {localStorage.getItem('user') &&  <Profile></Profile>}
        </div>

        <div className ="HomepageFooter">
          <Footer></Footer>
        </div>
      </div>
    );
  }
}
