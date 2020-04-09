import React, { Component } from "react";
import "../css/AppIntro.css";


export default class News extends Component {
  constructor(props) {
    super(props);
  }

  
  render() {
    
    return(
      <div className="IntroHeader">
        <h1>Welcome to Syntaxi</h1>

        <div className="Introduce">
          <h2>Practice makes perfect</h2>
          <p>
          <span className = 'bolder color'>SYNTAXI</span> is designed to help you improve your <span className ='bolder'>writing skills</span>. 
          The program allows you to proofread paragraphs and essays written by students of different levels. 
          All you have to do is:
          </p>
          <ul>
            <li><span className ='bolder color'>Find</span> the mistakes</li>
            <li><span className ='bolder color'>Correct</span> them with or without the clues provided</li>
            <li><span className ='bolder color'>Check</span> the answers</li>
          </ul>
          <h2>Enjoy your <span className = 'color'>SYNTAXI</span> ride.</h2>
        </div>
      </div>
    );
  }
}
