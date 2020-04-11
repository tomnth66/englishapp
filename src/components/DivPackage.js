import React, { Component } from "react";
import "../css/DivPackage.css";


export default class DivPackage extends Component {
  constructor(props) {
    super(props);
  }

  
  render() {
    return(
      <div className = 'Package'>
        <h1 className="Pactitle"> SYNTAXI PACKAGE</h1>

        <div id="container">
          <div className="pricetab">
            <h1> FREE </h1>
            <div className="price"> 
              <h2> Free </h2> 
            </div>
            <div className="infos">
              <h3> Premium Profile Listing </h3>
              <h3> Unlimited File Access </h3>
            </div>
            <div className="pricefooter">
              <div className="pacbutton">
                <a href="#"> Contact </a>
              </div>
            </div>
          </div>
          <div className="pricetab">
            <h1> STARTER </h1>
            <div className="price"> 
              <h2> 10$ </h2> 
            </div>
            <div className="infos">
              <h3> Premium Profile Listing </h3>
              <h3> Unlimited File Access </h3>
            </div>
            <div className="pricefooter">
              <div className="pacbutton">
                <a href="#"> Contact </a>
              </div>
            </div>
          </div>
          <div className="pricetabmid">
            <h1> BASIC </h1>
            <div className="pricemid"> 
              <h2> 30$ </h2> 
            </div>
            <div className="infos">
              <h3> Premium Profile Listing </h3>
              <h3> Unlimited File Access </h3>
            </div>
            <div className="pricefootermid">
              <div className="pacbuttonmid">
                <a href="#"> Contact </a>
              </div>
            </div>
          </div>
          <div className="pricetab">
            <h1> PREMIUM </h1>
            <div className="price"> 
              <h2> 50$ </h2> 
            </div>
            <div className="infos">
              <h3> Premium Profile Listing </h3>
              <h3> Unlimited File Access </h3>
            </div>
            <div className="pricefooter">
              <div className="pacbutton">
                <a href="#"> Contact </a>
              </div>
            </div>
          </div>
          <div className="pricetab">
            <h1> VIP </h1>
            <div className="price"> 
              <h2> 100$ </h2> 
            </div>
            <div className="infos">
              <h3> Premium Profile Listing </h3>
              <h3> Unlimited File Access </h3>
            </div>
            <div className="pricefooter">
              <div className="pacbutton">
                <a href="#"> Contact </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
