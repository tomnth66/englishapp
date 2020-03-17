import React, { Component } from "react";
import "../css/DeleteConfirm.css";
import { Button } from "@material-ui/core";
import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
import theme from "../theme/muiTheme"
import firebase from "../firebase";

export default class DeleteConfirm extends Component {
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
    this.GetDB();
  }

  GetDB(){
    const db = firebase.firestore();
    const ref = db.collection("Course").doc("0zc3RakYtmCwitHgM64g");
    ref.get().then(data => {
      this.setState({
        CourseList: data.data().CourseList,
      });
    });
  }

  Unconfirmed() {
    this.props.closeCourseListDeleteConfirm();
  }

  Confirmed() {
    this.props.showLoading();
    this.props.CloseConfirmSelected();
    this.updateDB();
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
    const ref1 = db.collection("Course").doc("0zc3RakYtmCwitHgM64g");
    const ref2 = db.collection("Users").doc("45GCoMKDwQWciXc8193A");





    ref2.get().then(data =>{
      let Users = data.data().Users;

      // console.log('STAGE1F ',this.props.deleteIdx, this.state.CourseList);

      let NewUsers = Users.filter(
        user => user.Course !== this.state.CourseList[this.props.deleteIdx-1].Name
      );

      // console.log('STAGE1S ',this.props.deleteIdx, this.state.CourseList);

      ref2.set({ Users: NewUsers }).then(()=>{
        ref1.get().then(data2 => {

          let CourseList = this.state.CourseList;
    
          // console.log('STAGE2F ',this.props.deleteIdx, this.state.CourseList);
    
          CourseList.splice(this.props.deleteIdx-1, 1);
    
          // console.log('STAGE2S ',this.props.deleteIdx, this.state.CourseList);
          ref1.set({ CourseList: CourseList })
          .then( ()=> this.props.closeCourseListDeleteConfirm() );
        });




      });
    })
  }


  render() {
    return (
      <ThemeProvider theme={theme}>
        <div className="DeleteConfirm">
          <div className="Cover"></div>

          <div className="DeleteConfirmInside">
            <h2 style={{margin: 0}}>Confirmation</h2>
            <span className = 'DeleteConfirmWarning'>ALL STUDENTS IN THIS COURSE WILL BE DELETED Type "CONFIRM" to delete the course</span>
            <div className = 'DeleteConfirmInput'>
              <input placeholder = 'CONFIRM'
                     ref = {this.inputElement}
                     onKeyUp = {(event)=>
                                        this.handleInput.bind(this)(event)}></input>
            </div>
            <div className="DeleteConfirmButton">
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
