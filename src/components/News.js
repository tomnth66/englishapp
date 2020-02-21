import React, { Component } from "react";
import "../css/News.css";
import InsideNews from './InsideNews.js'

export default class News extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div className="News">
        <h1>Announcement</h1>
        <InsideNews></InsideNews>
        <InsideNews></InsideNews>
        <InsideNews></InsideNews>
      </div>
    );
  }
}
