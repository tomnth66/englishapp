import React, { Component } from "react";
import "../css/Newsfooter.css";

export default class Newsfooter extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {Announcement} = this.props;
    return (
      <div className="Newsfooter">
        {/* <div className = 'Counter'>
          <div className = 'LikeCnt'>Like: 10</div>
          <div className = 'DisLikeCnt'>Dislike: 2</div>
          <div className = 'CommentCnt'>Comment: 10</div>
        </div> */}
        <div className = 'Button-3'>
          {/* <div className = 'Like Click'>Like</div>
          <div className = 'DisLike Click'>Dislike</div>
          <div className = 'Comment Click'>Comment</div> */}
          <div className = 'Date'>
            Post on:{Announcement.Time.hours <10 && 0}{Announcement.Time.hours}:
                    {Announcement.Time.minutes <10 && 0}{Announcement.Time.minutes}:
                    {Announcement.Time.seconds <10 && 0}{Announcement.Time.seconds}, 
                    {Announcement.Time.day <10 && 0}{Announcement.Time.day}/
                    {Announcement.Time.month <10 && 0}{Announcement.Time.month}/
                    {Announcement.Time.year}
          </div>
        </div>
      </div>
    );
  }
}
