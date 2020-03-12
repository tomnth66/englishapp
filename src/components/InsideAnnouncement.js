import React, { Component } from "react";
import "../css/InsideAnnouncement.css";
import firebase from "../firebase.js";
import Loading from "./Loading.js";
import Ava from "../img/stitch.jpg";
// import {useParams} from 'react-router-dom';

export default class InsideProfileDetail extends Component {
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
      <div className="InsideAnnouncement">
        {isLoading && <Loading />}
        <div className="InsideAnnouncementHeader">
          <h1>Create Announcement</h1>
        </div>

        <div className="InsideAnnouncementMain">
          {/* <div className = 'Left'>
            <div className = 'StudentAvatar'>
              <img className="Picture" src={Ava}></img>
            </div>
          </div>
          <div className = 'Right'>

          </div> */}

          <textarea className="AnnouncementInputArea" placeholder = 'Write your announcement in this area'></textarea>
        </div>
      </div>
    );
  }
}
