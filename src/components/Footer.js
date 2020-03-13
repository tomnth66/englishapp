import React, { Component } from "react";
import "../css/Footer.css";
import 'font-awesome/css/font-awesome.min.css';
import { Button } from '@material-ui/core';

// import {useParams} from 'react-router-dom';

export default class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      footerState:false
    }
  }


changeFooterState(){
    this.setState({
      footerState:!this.state.footerState
    })
  }


  render() {
    const classFirst = this.state.footerState===true?'hide':'show';
    const classSecond = this.state.footerState===false?'hide':'show'
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
				{/* <form className = 'footerForm' onSubmit={this.handleSubmit.bind(this)} method="POST">
          <input type="text" id="FormEmail" name="email" placeholder="Email"></input>
					<textarea id="FormMessage" name="message" placeholder="Message"></textarea>
					<button type = 'submit'>Send</button>
        </form> */}

        <form id="contactform" className = 'footerForm' action="https://formspree.io/xknzgbno" method="POST">
          
              <div className = {classFirst}>
                <input type="text" name="name" placeholder="Your name"></input>
                <input put type="email" name="_replyto" placeholder="Your email"></input>
                <Button color="primary" variant="contained" onClick={this.changeFooterState.bind(this)}>
                            Next
                </Button>
              </div>
            
              <div className = {classSecond}>
                <div class="footer-icons backBtn">
                  <span onClick = {this.changeFooterState.bind(this)}><i className ="fa fa-arrow-left"></i></span>
                </div>
                <textarea name="message" placeholder="Your message"></textarea>
                <input className = 'footerFormBtn' type="submit" value="Send"></input>
              </div>
            
        </form>

			</div>
		</footer>
    );
  }
}
