import React, { Component } from "react";
import "../css/InsideRanking.css";
import firebase from "../firebase.js";
import CircularProgress from "@material-ui/core/CircularProgress";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";

export default class InsideRanking extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Users: [],
      Course: [],
      curCourse: 0,
      loading: false
    };
  }

  componentDidMount() {
    this.GetDB1(this.GetDB2.bind(this));
    // this.GetDB();
  }

  GetDB1(func) {
    const db = firebase.firestore();
    const ref = db.collection("Course").doc("0zc3RakYtmCwitHgM64g");
    ref.get().then(data => {
      let Course = data.data().CourseList;
      // console.log(Course);
      this.setState(
        {
          Course: Course
        },
        func()
      );
    });

    // func();
  }

  GetDB2() {
    this.setState({
      Users: []
    });
    const db = firebase.firestore();
    const ref = db.collection("Users").doc("45GCoMKDwQWciXc8193A");
    ref.get().then(data => {
      let Users = data.data().Users;
      // console.log(Users);
      // console.log('test', 'a'.localeCompare('b'))
      let CurUsers = Users.filter(
        user => user.Course === this.state.Course[this.state.curCourse]
      );

      CurUsers.sort(function(user1, user2) {
        let diff = user2.TotalScore - user1.TotalScore;
        if (diff !== 0) return user2.TotalScore - user1.TotalScore;

        return user1.Name.localeCompare(user2.Name);
      });

      // console.log('after sorting ',Users);
      this.setState({
        Users: CurUsers
      });
    });
  }

  getDB = async _ => {
    const db = firebase.firestore();
    console.time("Course");
    await db
      .collection("Course")
      .doc("0zc3RakYtmCwitHgM64g")
      .get()
      .then(data => {
        let Course = data.data().CourseList;
        // console.log(Course);
        this.setState({
          Course: Course
        });
      });
    console.timeEnd("Course");

    console.time("Users");
    db.collection("Users")
      .doc("45GCoMKDwQWciXc8193A")
      .get()
      .then(data => {
        let Users = data.data().Users;
        // console.log(Users);
        // console.log('test', 'a'.localeCompare('b'))
        let CurUsers = Users.filter(
          user => user.Course === this.state.Course[this.state.curCourse]
        );

        CurUsers.sort(function(user1, user2) {
          let diff = user2.TotalScore - user1.TotalScore;
          if (diff !== 0) return user2.TotalScore - user1.TotalScore;

          return user1.Name.localeCompare(user2.Name);
        });

        // console.log('after sorting ',Users);
        this.setState({
          Users: CurUsers
        });
      });
    console.timeEnd("Users");
  };

  ChangeCourse(e) {
    // console.log('changing... ', document.getElementById('RankingCourseSelectId').value);
    console.log(e.target.value);
    this.setState(
      {
        curCourse: e.target.value
      },
      this.GetDB1(this.GetDB2.bind(this))
      // this.getDB()
    );
  }

  render() {
    const { Users, Course, curCourse } = this.state;
    return (
      <div className="InsideRanking">
        <div className="CourseSelector">
          <h1>Ranking</h1>
          <FormControl
            variant="outlined"
            style={{ width: "30%", margin: "10 0" }}
          >
            <InputLabel htmlFor="RankingCourseSelectId">Course</InputLabel>
            <Select
              id="RankingCourseSelectId"
              onChange={this.ChangeCourse.bind(this)}
              labelWidth={60}
              value={curCourse}
            >
              {Course.map((item, idx) => (
                <MenuItem value={idx}>{item}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <div className="InsideRankingMain">
          <table>
            {/* <tr>
            <td colspan='3' style={{color: '#C36'}}>Tổng số học sinh: {Users.length}</td>
            <td colspan='3'></td>
            <td colspan='1'></td>
          </tr> */}

            <tr className="studentlist--head">
              <th>STT</th>
              <th>Name</th>
              <th>Score</th>
              <th></th>
            </tr>

            {/* <tr>
            <td width = '6%'>1</td>
            <td width = '65%'>Leminh</td>
            <td width = '17%'>100</td>
            <td className = 'DetailCss'>Detail</td>
          </tr>

          <tr>
            <td>2</td>
            <td>LeVu</td>
            <td>200</td>
            <td className = 'DetailCss'>Detail</td>
          </tr> */}

            {Users.map((user, idx) => (
              <tr>
                <td width="6%">{++idx}</td>
                <td width="65%">{user.Name}</td>
                <td width="17%">{user.TotalScore}</td>
                <td>
                  <span className="DetailCss">Detail</span>
                </td>
              </tr>
            ))}
          </table>
        </div>
      </div>
    );
  }
}
