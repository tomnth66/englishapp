import React, { Component } from "react";
import "../css/InsideProfile.css";
import Avatar from "./Avatar.js";
// import Button from './Button.js';
import { Button, Card, ButtonGroup } from "@material-ui/core";
import { Link } from "react-router-dom";
import firebase from "../firebase.js";

class InsideProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Avatar: {},
    };
  }

  componentDidMount() {
    this.GetDB1();
    // this.GetDB();
  }

  GetDB1() {
    const db = firebase.firestore();
    const ref = db.collection("Users").doc("45GCoMKDwQWciXc8193A");
    // const { id } = useParams();

    ref.get().then((data) => {
      let Users = data.data().Users;
      let CurUser = Users.filter(
        (user) => user.Id === localStorage.getItem("userId")
      );

      // console.log('after sorting ', CurUser);
      if (CurUser.length === 0) {
        window.location.href = "/";
      } else {
        let gs = firebase.storage();

        let storageRef =
          CurUser[0].Avatar !== "" && CurUser[0].Avatar !== undefined
            ? gs.ref("UsersAvatar/" + CurUser[0].Id + "/" + CurUser[0].Avatar)
            : gs.ref("UsersAvatar/standard/avatar.png");

        let imageFolder = [];
        const arrImageUrl = [];

        arrImageUrl.push(storageRef.getDownloadURL());

        // console.log(arrImageUrl)

        Promise.all(arrImageUrl).then(
          (result) => {
            imageFolder = result;
            this.setState(function (state) {
              return {
                Avatar: imageFolder,
              };
            });
          },
          (error) => {}
        );
      }
    });
  }

  handleLogOut() {
    // console.log('logging out');
    localStorage.clear();
    window.location.href = "/";
  }

  render() {
    return (
      <Card className="InsideProfile">
        <Avatar
          Ava={this.state.Avatar}
          id={localStorage.getItem("userId")}
        ></Avatar>
        {/* <Button></Button> */}
        <div className="Information">
          <div className="UserInfo">
            <h1 style={{ margin: "0" }}>{localStorage.getItem("user")}</h1>
            <span style={{ fontWeight: "300", fontSize: "0.85rem" }}>
              {localStorage.getItem("class")}
            </span>
          </div>

          {localStorage.getItem("class") === "admin" ? (
            <ButtonGroup
              variant="text"
              color="primary"
              className="ActionButton"
            >
              <Link to="/postannouncement">
                <Button>Post Announcement</Button>
              </Link>
              <Link to="/createmap">
                <Button>Create Map</Button>
              </Link>
              <Link to="/studentmanagement">
                <Button>Student Management</Button>
              </Link>
            </ButtonGroup>
          ) : (
            <ButtonGroup
              variant="text"
              color="primary"
              className="ActionButton"
            >
              <Link style={{ minWidth: "100%" }} to ='/package'>
                <Button style={{ minWidth: "100%"}}>Buy Package</Button>
              </Link>
            </ButtonGroup>
          )}
          <Button
            variant="contained"
            color="primary"
            onClick={this.handleLogOut.bind(this)}
            style={{ marginTop: "1rem", width: "95%" }}
          >
            Log Out
          </Button>
        </div>
      </Card>
    );
  }
}
export default InsideProfile;
