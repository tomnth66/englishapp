import React, { Component } from "react";
import "../css/InsideProfileDetail.css";
import firebase from "../firebase.js";
import Loading from "./Loading.js";
import Ava from "../img/stitch.jpg";
// import {useParams} from 'react-router-dom';
import DeleteConfirm from "./DeleteConfirm";

export default class InsideProfileDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      User:{},
      isLoading: false,
      ConfirmSelected: false
    };
  }

  showLoading() {
    this.setState({
      isLoading: true
    });
  }

  DeleteConfirmActivate() {
    this.setState({
      ConfirmSelected: true
    });
  }

  CloseConfirmSelected() {
    this.setState({
      ConfirmSelected: false
    });
  }

  componentDidMount() {
    this.showLoading();
    this.GetDB1();
    // this.GetDB();
  }

  GetDB1() {
    const db = firebase.firestore();
    const ref = db.collection("Users").doc("45GCoMKDwQWciXc8193A");
    // const { id } = useParams();

    ref.get().then(data => {
      let Users = data.data().Users;
      // console.log(Users);
      // console.log('test', 'a'.localeCompare('b'))
      let CurUser = Users.filter(
        user => user.Id === this.props.match.params.id
      );


      console.log('after sorting ',CurUser);

      this.setState({
        User: CurUser[0],
        isLoading: false
      });
    });
  }


  render() {
    const { User,isLoading,ConfirmSelected } = this.state;
    return (
      <div className="InsideProfileDetail">
        {isLoading && <Loading />}
        <div className="InsideProfileHeader">
          <h1>Student Detail</h1>
        </div>

        <div className="InsideProfileDetailMain">
          <div className = 'Left'>
            <div className = 'StudentAvatar'>
              <img className="Picture" src={Ava}></img>
            </div>
          </div>
          <div className = 'Right'>
            <ul>
              <li>Name: {User.Name}</li>
              <li>Email: {User.Email}</li>
              <li>Course: {User.Course}</li>
              <li>Total Score: {User.TotalScore}</li>
              {(localStorage.getItem('class')==='admin' || localStorage.getItem('userId') === User.Id) && 
              <li><span className="DeleteCss" onClick = {this.DeleteConfirmActivate.bind(this)}>Delete</span></li>
              }
            </ul>
            {ConfirmSelected && (
                <DeleteConfirm
                  Keyword = 'Are you sure?'
                  CloseConfirmSelected={this.CloseConfirmSelected.bind(this)}
                  Id={User.Id}
                  showLoading = {this.showLoading.bind(this)}
                ></DeleteConfirm>
              )}
          </div>
        </div>
      </div>
    );
  }
}
