import React, { Component } from "react";
import "../css/InsideNews.css";
import firebase from "../firebase.js";
import Ava from "../img/stitch.jpg";
import Newsfooter from "./Newsfooter.js";
import "font-awesome/css/font-awesome.min.css";
import { Button, Card, Tabs, Tab, IconButton } from "@material-ui/core";
import MoreHoriz from "@material-ui/icons/MoreHoriz";
import Loading from "./Loading.js";

export default class InsideNews extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowSetting: false,
      EditState: false,
      originValue: this.props.Announcement.AnnouncementContent,
      value: this.props.Announcement.AnnouncementContent,
      content: "",
      isLoading: false
    };

    this.inputElement1 = React.createRef();
    this.inputElement2 = React.createRef();
    // this.EditTextRef = React.createRef();
  }

  componentDidMount() {
    this.updateRenderDB();
  }

  updateRenderDB() {
    let curAnn = this.state.value;
    let words = curAnn.split("\n");
    let fullPara = "";

    fullPara += `#${this.props.Announcement.id}\n`;

    for (let word of words) {
      fullPara += `<div>\n`;
      word = word.split(" ");
      for (let i = 0; i < word.length; ++i) {
        if (word[i] !== "") {
          fullPara += `${word[i]} `;
        } else {
          fullPara += '<div style="height: 1rem"></div>';
        }
      }
      fullPara += `</div>\n`;
    }

    this.setState({
      content: fullPara
    });
  }

  showSetting() {
    this.setState(
      {
        isShowSetting: !this.state.isShowSetting
      },
      () => {
        document.addEventListener(
          "mousedown",
          this.handleClick.bind(this),
          false
        );
      }
    );
  }

  handleClick(event) {
    if (this.state.isShowSetting) {
      if (
        !this.inputElement1.current.contains(event.target) &&
        !this.inputElement2.current.contains(event.target)
      ) {
        this.setState({
          isShowSetting: false
        });
      }
    }
  }

  EditNews() {
    // console.log('editting...');
    this.setState(
      {
        isShowSetting: false,
        EditState: true
      },
      () => {
        const Ref = this.EditTextRef;
        const length = this.EditTextRef.value.length;
        Ref.focus();
        Ref.setSelectionRange(length, length);
      }
    );
  }

  closeEdit() {
    this.setState({
      EditState: false,
      value: this.state.originValue
    });
  }

  saveEdit() {
    this.setState({
      isLoading: true
    });
    const db = firebase.firestore();
    const ref = db.collection("Announcement").doc("A4TT0kGAgjKUxs2wrj8p");
    let curAnn = document.getElementById("EditTextArea").value;
    let words = curAnn.split("\n");
    let fullPara = "";

    fullPara += `#${this.props.Announcement.id}\n`;

    for (let word of words) {
      fullPara += `<div>\n`;
      word = word.split(" ");
      for (let i = 0; i < word.length; ++i) {
        if (word[i] !== "") {
          fullPara += `${word[i]} `;
        } else {
          fullPara += '<div style="height: 1rem"></div>';
        }
      }
      fullPara += `</div>\n`;
    }

    ref.get().then(data => {
      let AnnouncementList = data.data().AnnouncementList;
      let idx = AnnouncementList.findIndex(
        Ann => Ann.id === this.props.Announcement.id
      );

      AnnouncementList[idx].AnnouncementContent = curAnn;

      ref.set({ AnnouncementList: AnnouncementList }).then(() => {
        // this.closeEdit() ;
        // this.props.GetDB() ;
        this.setState({
          EditState: false,
          content: fullPara,
          isLoading: false,
          originValue: this.state.value
        });
      });
    });
  }

  handleTextChange(e) {
    this.setState({
      value: e.target.value
    });
  }

  DeleteNews() {
    this.setState({
      isLoading: true
    });
    const db = firebase.firestore();
    const ref = db.collection("Announcement").doc("A4TT0kGAgjKUxs2wrj8p");
    ref.get().then(data => {
      let AnnouncementList = data.data().AnnouncementList;
      let idx = AnnouncementList.findIndex(
        Ann => Ann.id === this.props.Announcement.id
      );
      console.log(idx);
      console.log(this.props.Announcement.id);

      console.log("full ", AnnouncementList);
      console.log(AnnouncementList[idx]);
      AnnouncementList.splice(idx, 1);
      console.log("full2 ", AnnouncementList);
      ref.set({ AnnouncementList: AnnouncementList }).then(() => {
        this.props.GetDB().then(() =>
          this.setState({
            isShowSetting: false,
            isLoading: false
          })
        );
      });
      //  .then( ()=> window.location.href = "/studentmanagement");
    });
  }

  render() {
    const { Announcement } = this.props;
    return (
      <div className="InsideNews">
        {this.state.isLoading && <Loading />}
        <div className="Auther">
          <div className="AutherAvatar">
            <img className="Picture" src={Ava} alt="" />
          </div>
          <div className="AutherName">
            <span>San</span>
          </div>

          {localStorage.getItem("class") === "admin" && (
            <div className="News-icons">
              {/*<span
								ref={this.inputElement1}
								onClick={this.showSetting.bind(this)}
							>
								<i id="curIcon" class="fa fa-ellipsis-h"></i>
              </span>*/}
              <IconButton
                ref={this.inputElement1}
                onClick={this.showSetting.bind(this)}
              >
                <MoreHoriz id="curIcon"></MoreHoriz>
              </IconButton>
            </div>
          )}

          {this.state.isShowSetting && (
            <Card ref={this.inputElement2} className="News-setting">
              <Tabs className="settings--list">
                <Tab onClick={this.EditNews.bind(this)} label="Edit" />
                <Tab onClick={this.DeleteNews.bind(this)} label="Delete" />
              </Tabs>
            </Card>
          )}
        </div>

        <div className="NewsContent">
          {!this.state.EditState && (
            <div dangerouslySetInnerHTML={{ __html: this.state.content }}></div>
          )}
          {/* {!this.state.EditState && <div> <p></p> </div>} */}

          {this.state.EditState && (
            <div>
              <textarea
                ref={ref => (this.EditTextRef = ref)}
                value={this.state.value}
                onChange={this.handleTextChange.bind(this)}
                id="EditTextArea"
              ></textarea>
              <div className="EditNewsBtn">
                <Button
                  color="primary"
                  variant="contained"
                  onClick={this.closeEdit.bind(this)}
                >
                  Cancel
                </Button>

                <Button
                  color="primary"
                  variant="contained"
                  onClick={this.saveEdit.bind(this)}
                >
                  Save
                </Button>
              </div>
            </div>
          )}
        </div>

        <Newsfooter Announcement={Announcement}></Newsfooter>
      </div>
    );
  }
}
