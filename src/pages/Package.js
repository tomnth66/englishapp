import React, { Component } from "react";
import "../css/Package.css";
import Navbar from "../components/Navbar.js";
import Footer from '../components/Footer.js';
import DivPackage from '../components/DivPackage.js';

export default class Package extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="Homepage">
        <div className="HomepageHeader">
          <Navbar></Navbar>
        </div>

        <div className="PackageBody">
          <DivPackage></DivPackage>
        </div>

        <div className ="HomepageFooter">
          <Footer></Footer>
        </div>
      </div>
    );
  }
}
