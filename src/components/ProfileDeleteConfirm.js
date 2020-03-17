import React, { Component } from "react";
import "../css/ProfileDeleteConfirm.css";
import { Button } from "@material-ui/core";
import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
import theme from "../theme/muiTheme"
import firebase from "../firebase";

export default class ProfileDeleteConfirm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmContent:'',
      CourseList:[]
    }
    this.inputElement = React.createRef();
  }

  componentDidMount(){
    this.inputElement.current.focus(); 
  }

  Unconfirmed() {
    this.props.CloseConfirmSelected();
  }


  handleInput(event){
    this.setState({
      confirmContent:event.target.value
    })
  }

  updateDB(event) {

    // console.log('idxx',this.props.deleteIdx);

    let confirmContent  = this.state.confirmContent;
    if(!confirmContent || confirmContent === ''){
      alert('Wrong Confirm');
      return;
    }

    if(confirmContent.trim()===''){
      alert('Wrong Confirm');
      return;
      // hàm trim sẽ bỏ hết các dấu cách ở đầu và cuối
    }

    if(confirmContent.trim()!=='CONFIRM'){
      alert('Wrong Confirm');
      return;
    }


    // console.log(this.props.Id);
    const db = firebase.firestore();
    const ref = db.collection("Users").doc("45GCoMKDwQWciXc8193A");





    ref.get().then(data =>{
      let Users = data.data().Users;

      // console.log('STAGE1F ',this.props.deleteIdx, this.state.CourseList);
      let idx = Users.findIndex(
				user => user.Id === this.props.Id
      );
      
      Users.splice(idx,1);

      // console.log('STAGE1S ',this.props.deleteIdx, this.state.CourseList);

      ref.set({ Users: Users }).then(()=>{
        if(this.props.Id === localStorage.getItem('userId')){
          localStorage.clear();
          window.location.href = '/'
        }
        else{
          window.location.href = '/studentmanagement'
        }
      });
    })
  }


  render() {
    return (
      <ThemeProvider theme={theme}>
        <div className="ProfileDeleteConfirm">
          <div className="Cover"></div>

          <div className="ProfileDeleteConfirmInside">
            <h2 style={{margin: 0}}>Confirmation</h2>
            <div className = 'ProfileDeleteConfirmInput'>
              <input placeholder = 'CONFIRM'
                     ref = {this.inputElement}
                     onKeyUp = {(event)=>
                                        this.handleInput.bind(this)(event)}></input>
            </div>
            <div className="ProfileDeleteConfirmButton">
              <Button style = {{marginRight:'1rem'}} color="primary" variant="outlined" onClick={this.Unconfirmed.bind(this)}>
                Back
              </Button>
              <Button
                color="primary"
                variant="contained"
                onClick={this.updateDB.bind(this)}
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      </ThemeProvider>
    );
  }
}
