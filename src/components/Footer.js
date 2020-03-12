import React, { Component } from "react";
import "../css/Footer.css";
import 'font-awesome/css/font-awesome.min.css';
import firebase from "../firebase.js";

// import {useParams} from 'react-router-dom';

export default class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false
    };
  }

  showLoading() {
    this.setState({
      isLoading: true
    });
  }


  componentDidMount() {

  }



  render() {
    const {isLoading} = this.state;
    return (
      <footer class="footer-distributed">
        <div class="footer-left">
          <h3>Company<span>logo</span></h3>
          <p class="footer-links">
            <a href="/">Home</a>
            
            <a href="/practice">Practice</a>
            
            <a href="/ranking">Ranking</a>
            
            <a href="#">About</a>
            
          </p>
          <p class="footer-company-name">SYNTAXI © 2020</p>

          <div class="footer-icons">
            <a href="#"><i className="fa fa-facebook"></i></a>
            <a href="#"><i className="fa fa-twitter"></i></a>
            <a href="#"><i className="fa fa-linkedin"></i></a>
            <a href="#"><i className="fa fa-github"></i></a>
          </div>
        </div>

			<div class="footer-right">
				<p>Contact Us</p>
				<div className = 'footerForm'>
          <input type="text" name="email" placeholder="Email"></input>
					<textarea name="message" placeholder="Message"></textarea>
					<button>Send</button>
        </div>
			</div>
		</footer>
    );
  }
}
