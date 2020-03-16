import React, { Component } from "react";
import "../css/News.css";
import InsideNews from "./InsideNews.js";
import firebase from "../firebase";

export default class News extends Component {
  constructor(props) {
    super(props);
    this.state = {
      AnnouncementList: []
    };
  }

  componentDidMount() {
    this.GetDB();
  }

  GetDB() {
    return new Promise((resolve, reject) => {
      const db = firebase.firestore();
      const ref = db.collection("Announcement").doc("A4TT0kGAgjKUxs2wrj8p");
      ref.get().then(data => {
        this.setState(
          {
            AnnouncementList: data.data().AnnouncementList
          },
          () => resolve("done")
        );
      });
    });
  }

  render() {
    const { AnnouncementList } = this.state;
    return (
      <div className="News">
        <h1>Announcement</h1>

        <div className="NewsMain">
          {AnnouncementList.map((Announcement, idx) => (
            <InsideNews
              GetDB={this.GetDB.bind(this)}
              Announcement={Announcement}
            ></InsideNews>
          ))}
        </div>
      </div>
    );
  }
}
