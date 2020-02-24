import React, { Component } from "react";
import "../css/Newsfooter.css";

export default class Newsfooter extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="Newsfooter">
        <div className = 'Counter'>
          <div className = 'LikeCnt'>Like: 10</div>
          <div className = 'DisLikeCnt'>Dislike: 2</div>
          <div className = 'CommentCnt'>Comment: 10</div>
        </div>
        <div className = 'Button-3'>
          <div className = 'Like Click'>Like</div>
          <div className = 'DisLike Click'>Dislike</div>
          <div className = 'Comment Click'>Comment</div>
          <div className = 'Date'>10:10:20, 23/02/2020</div>
        </div>
      </div>
    );
  }
}
