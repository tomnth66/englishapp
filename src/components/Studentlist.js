import React, { Component } from "react";
import "../css/Studentlist.css";
import firebase from "../firebase";
import ConfirmSelectedDiv from "./ConfirmSelectedDiv.js";

export default class Studentlist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Users: [],
      ConfirmSelected: false
    };
  }

  componentDidMount() {
    this.GetDB();
  }

  GetDB() {
    const db = firebase.firestore();
    const ref = db.collection("Users").doc("45GCoMKDwQWciXc8193A");
    ref.get().then(data => {
      this.setState({
        Users: data.data().Users
      });
    });
  }

  ChangeActivated(selectedId) {
    // console.log('select is changing',selectId);
    this.setState({
      ConfirmSelected: true,
      SelectedId: selectedId
    });
  }

  CloseConfirmSelected() {
    this.setState({
      ConfirmSelected: false
    });
  }

  render() {
    const { Users, ConfirmSelected, SelectedId } = this.state;
    return (
      <div className="Studentlist">
        <h2 className="student--amount">
          The numbers of the student: {Users.length}
        </h2>
        <table>
          <tr className="studentlist--head">
            <th>STT</th>
            <th>Name</th>
            <th>Email</th>
            <th>Course</th>
            <th>Activated</th>
            <th></th>
          </tr>

          {Users.map((user, idx) => (
            <tr>
              <td>{++idx}</td>
              <td>{user.Name}</td>
              <td>{user.Email}</td>
              <td>{user.Course}</td>
              <td>
                {user.Activated ? (
                  <select
                    id={"select" + user.Id}
                    className="Confirm"
                    onChange={this.ChangeActivated.bind(
                      this,
                      "select" + user.Id
                    )}
                  >
                    <option value="N">NO</option>
                    <option value="Y" selected>
                      YES
                    </option>
                  </select>
                ) : (
                  <select
                    id={"select" + user.Id}
                    className="Confirm"
                    onChange={this.ChangeActivated.bind(
                      this,
                      "select" + user.Id
                    )}
                  >
                    <option value="N" selected>
                      NO
                    </option>
                    <option value="Y">YES</option>
                  </select>
                )}
              </td>
              <td>
                <span className="DetailCss">Detail</span>
              </td>
              {ConfirmSelected && SelectedId === "select" + user.Id && (
                <ConfirmSelectedDiv
                  CloseConfirmSelected={this.CloseConfirmSelected.bind(this)}
                  SelectedId={"select" + user.Id}
                  Id={user.Id}
                ></ConfirmSelectedDiv>
              )}
            </tr>
          ))}
        </table>
      </div>
    );
  }
}
