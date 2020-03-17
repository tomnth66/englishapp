import React, { Component } from "react";
import "../css/SettingCourse.css";
import { Button } from "@material-ui/core";
import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
import theme from "../theme/muiTheme"
import firebase from "../firebase";
import deleteBtn from '../img/delete.svg';

export default class SettingCourse extends Component {
  constructor(props) {
    super(props);
  }


  render() {
    return (
      <ThemeProvider theme={theme}>
        <div className="SettingCourse">

          <div className="Cover"></div>
          <div className="SettingCourseInside">
            <img onClick = {this.props.changeStateSettingCourse} className = 'deleteBtn' src = {deleteBtn}></img>
            <h1>Course Management</h1>
            <select>
              <option value = 'option1'>option1</option>
              <option value = 'option2'>option2</option>
              <option value = 'option3'>option3</option>
            </select>
          </div>
        </div>
      </ThemeProvider>
    );
  }
}
