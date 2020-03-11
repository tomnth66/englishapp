import React, { Component } from "react";
import "../css/ConfirmSelectedDiv.css";
import { Button } from "@material-ui/core";
import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
import theme from "../theme/muiTheme"
import firebase from "../firebase";

export default class DeleteConfirm extends Component {
  constructor(props) {
    super(props);
  }

  Unconfirmed() {
    this.props.CloseConfirmSelected();
  }

  Confirmed() {
    this.props.showLoading();
    this.props.CloseConfirmSelected();
    this.updateDB();
  }

  updateDB() {
    // console.log(this.props.Id);
    const db = firebase.firestore();
    const ref = db.collection("Users").doc("45GCoMKDwQWciXc8193A");
    ref.get().then(data => {
      let Users = data.data().Users;

      let idx = Users.findIndex(user => user.Id === this.props.Id);
      
      // console.log(Users[idx]);
      Users.splice(idx, 1);
      ref.set({ Users: Users }).then( ()=> window.location.href = "/studentmanagement");
    });
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <div className="ConfirmSelectedDiv">
          <div className="Cover"></div>

          <div className="ConfirmSelectedDivInside">
            <h2 style={{margin: 0}}>{this.props.Keyword}</h2>
            <div className="ConfirmSelectedDivButton">
              <Button color="primary" variant="outlined" onClick={this.Unconfirmed.bind(this)}>
                No
              </Button>
              <Button
                color="primary"
                variant="contained"
                onClick={this.Confirmed.bind(this)}
              >
                Yes
              </Button>
            </div>
          </div>
        </div>
      </ThemeProvider>
    );
  }
}
