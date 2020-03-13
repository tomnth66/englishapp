import React, { Component } from "react";
import "../css/InsideNews.css";
import Ava from '../img/stitch.jpg'
import Newsfooter from './Newsfooter.js'

export default class InsideNews extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {Announcement} = this.props;
    return (
      <div className = 'InsideNews'>
        <div className = 'Auther'>
          <div className = 'AutherAvatar'>
            <img className="Picture" src={Ava}></img>
          </div>
          <div className = 'AutherName'>
            <span>San</span>
          </div>
        </div>

        <div className = 'NewsContent'>
          <p>{Announcement.AnnouncementContent}</p>
        </div>
        <Newsfooter Announcement = {Announcement}></Newsfooter>
      </div>
    );
  }
}
