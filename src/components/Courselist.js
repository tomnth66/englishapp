import React, { Component } from "react";
import "../css/Courselist.css";
import firebase from "../firebase";
import ConfirmSelectedDiv from "./ConfirmSelectedDiv.js";
import SettingCourse from './SettingCourse.js';
// import { Button } from '@material-ui/core';

export default class Courselist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      CourseList:[],
      ConfirmSelected: false,
      // isShowSettingCourse: false
    };
  }

  componentDidMount() {
    this.GetDB();
  }

  GetDB() {
    const db = firebase.firestore();
    const ref = db.collection("Course").doc("0zc3RakYtmCwitHgM64g");
    ref.get().then(data => {
      this.setState({
        CourseList: data.data().CourseList
      });
    });
  }


  CloseConfirmSelected() {
    this.setState({
      ConfirmSelected: false
    });
  }

  // changeStateSettingCourse(){
  //   this.setState({
  //     isShowSettingCourse:!this.state.isShowSettingCourse
  //   })
  // }


  render() {
    const { CourseList, ConfirmSelected, SelectedId } = this.state;
    return (
      <div className="Courselist">
        <h2 className="Course--amount">
          The numbers of the student: {CourseList.length}
        </h2>
        <div className = 'CourselistTable'>
          <table>
            <tr className="Courselist--head">
              <th>STT</th>
              <th>Name</th>
              <th></th>
              <th></th>
            </tr>

            {CourseList.map((course, idx) => (
            <tr>
              <td>{++idx}</td>
              <td>{course.Name}</td>
              <td>
                <span className="DetailCss">Edit</span>
              </td>

              <td>
                <span className="DetailCss">Delete</span>
              </td>
            </tr>
            ))}
          </table>
        </div>
      </div>
    );
  }
}
