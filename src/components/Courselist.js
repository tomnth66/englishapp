import React, { Component } from "react";
import "../css/Courselist.css";
import firebase from "../firebase";
import DeleteConfirm from './DeleteConfirm.js';
import Ids from "short-id";
// import { Button } from '@material-ui/core';

export default class Courselist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      CourseList:[],
      isDeleteConfirm:false,
      isShowAddingInput:false,
      SelectedIdx:0
      // isShowSettingCourse: false
    };

    this.inputElement = React.createRef();
  }

  componentDidMount() {
    this.GetDB();
  }

  GetDB() {
    const db = firebase.firestore();
    const ref = db.collection("Course").doc("0zc3RakYtmCwitHgM64g");
    ref.get().then(data => {
      this.setState({
        CourseList: data.data().CourseList,
        isDeleteConfirm:false
      });
    });
  }


  updateDB(event){
    if(event.keyCode === 13){
      let NewCourseName  = event.target.value;
      if(!NewCourseName || NewCourseName === ''){
        alert('Type something');
        return;
      }

      if(NewCourseName.trim()===''){
        alert('Type something');
        return;
        // hàm trim sẽ bỏ hết các dấu cách ở đầu và cuối
      }

      const db = firebase.firestore();
      const ref = db.collection("Course").doc("0zc3RakYtmCwitHgM64g");

      ref.get().then((data)=>{
        let CourseList = data.data().CourseList;
        
        CourseList.unshift({
                            Id:Ids.generate(),
                            Name: NewCourseName
                          })


        ref.set({CourseList:CourseList});
        // console.log('ref done');
        this.setState({
          isShowAddingInput:false
        },()=>this.GetDB());
      })
    }

  }


  addingCourse(){
    this.setState({
      isShowAddingInput:true
    },()=>{this.inputElement.current.focus(); 
           document.addEventListener('mousedown',this.handleClick.bind(this), false);})
  }


  handleClick(event){
    if(this.state.isShowAddingInput){
      if(!this.inputElement.current.contains(event.target)){
        this.setState({
          isShowAddingInput:false
        }) 
      }
    }
  }


  closeCourseListDeleteConfirm() {
    this.GetDB();
  }

  showCourseListDeleteConfirm(idx){
    console.log('deleting')
    this.setState({
      isDeleteConfirm:true,
      SelectedIdx:idx
    });
  }
  // changeStateSettingCourse(){
  //   this.setState({
  //     isShowSettingCourse:!this.state.isShowSettingCourse
  //   })
  // }


  render() {
    const { CourseList, isDeleteConfirm, isShowAddingInput, SelectedId } = this.state;
    return (
      <div className="Courselist">
        <h2 className="Course--amount">
          The numbers of the course: {CourseList.length}
        </h2>
        <div className = 'CourselistTable'>
          <table>
            <tr className="Courselist--head">
              <th>STT</th>
              <th>Name</th>
              <th colSpan = '2' className = 'AddCourseBtn' onClick = {this.addingCourse.bind(this)}>Add Course</th>
              {/* <th></th> */}
            </tr>

            {isShowAddingInput &&
              <tr>
                <td>0</td>
                <td className = 'AddingInput' >
                  <input placeholder = 'New Course'
                         ref = {this.inputElement}
                         onKeyUp = {(event)=>this.updateDB.bind(this)(event)} ></input>
                </td>

                <td>
                  <span style = {{opacity:'0.5'}} className="DetailCss">Edit</span>
                </td>

                <td>
                  <span style = {{opacity:'0.5'}} className="DetailCss">Delete</span>
                </td>
              </tr>
            }

            {CourseList.map((course, idx) => (
            <tr>
              <td>{++idx}</td>
              <td>{course.Name}</td>
              <td>
                <span className="DetailCss">Edit</span>
              </td>

              <td>
                <span className="DetailCss" onClick = {this.showCourseListDeleteConfirm.bind(this,idx)}>Delete</span>
              </td>
            </tr>
            ))}
          </table>
          {isDeleteConfirm && 
            <DeleteConfirm closeCourseListDeleteConfirm = {this.closeCourseListDeleteConfirm.bind(this)}
                           deleteIdx = {this.state.SelectedIdx}></DeleteConfirm>}
        </div>
      </div>
    );
  }
}
