import React, { Component } from "react";
import "../css/CourseManagement.css";
import Navbar from "../components/Navbar.js";
import Footer from '../components/Footer.js';
import Courselist from "../components/Courselist.js";
import Login from "../components/Login.js";
import Profile from "../components/Profile.js";

export default class CourseManagement extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="Studentman">
        <div className="StudentmanHeader">
          <Navbar></Navbar>
        </div>

        <div className="StudentmanBody">
          <Courselist></Courselist>
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
