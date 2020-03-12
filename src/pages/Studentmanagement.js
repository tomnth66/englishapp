import React, { Component } from "react";
import "../css/Studentmanagement.css";
import Navbar from "../components/Navbar.js";
import Footer from '../components/Footer.js';
import Studentlist from "../components/Studentlist.js";
import Login from "../components/Login.js";
import Profile from "../components/Profile.js";

export default class Studentmanagement extends Component {
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
          <Studentlist></Studentlist>
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
