import React, { Component } from "react";
import "../css/ConfirmSelectedDiv.css";
import Button from "./Button.js";
import firebase from '../firebase';


export default class ConfirmSelectedDiv extends Component {
  constructor(props) {
    super(props);
  }

  Unconfirmed(){
    this.props.CloseConfirmSelected();
    let SelectedDiv = document.getElementById(this.props.SelectedId);

    if(SelectedDiv.value == 'Y') SelectedDiv.value = 'N';
    else SelectedDiv.value = 'Y';
  }

  Confirmed(){
    this.props.CloseConfirmSelected();
    this.updateDB();
  }

  updateDB(){
    // console.log(this.props.Id);
    const db = firebase.firestore();
    const ref = db.collection('Users').doc('45GCoMKDwQWciXc8193A');
    ref.get().then((data)=>{
      let Users = data.data().Users;

      let idx = Users.findIndex(user=>user.Id===this.props.Id);
      Users[idx].Activated = !Users[idx].Activated;

      ref.set({ Users: Users })
    });
  }

  render() {
    return (
      <div className="ConfirmSelectedDiv">
        <div className = 'Cover'>
        </div>

        <div className = 'ConfirmSelectedDivInside'>
          <h1>Are you sure?</h1>
          <div className = 'ConfirmSelectedDivButton'>
                <Button keyword = 'NO' 
                        onClick = {this.Unconfirmed.bind(this)}></Button>
                <Button keyword = 'YES' 
                        onClick = {this.Confirmed.bind(this)}></Button>
          </div>
        </div>
      </div>
    );
  }
}
