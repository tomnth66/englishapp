import React, { Component } from "react";
import "../css/RegisterForm.css";
import Button from "./Button.js";
import deleteBtn from '../img/delete.svg';
import firebase from "../firebase.js";
import Ids from 'short-id'

// let username='',password='',retypePassword ='',studentName='',course='',email ='';

export default class RegisterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      FormState:1,
      RegisterDone:false,
      username:'',
      password:'',
      retypePassword:'',
      studentName:'',
      course:'',
      email:''
    }
  }

  changeState(){
    console.log('changing state...')
    if(this.state.FormState==1){
      this.setState({
        FormState:2
      })
    }
    else{
      this.setState({
        FormState:1
      })
    }
  }

  handleUsername(e){
    // console.log(e.target.value)
    this.setState({
      username:e.target.value
    })
  }

  handlePassword(e){
    this.setState({
      password:e.target.value
    })
  }

  handleRetypePassword(e){
    this.setState({
      retypePassword:e.target.value
    })
  }

  handleStudentName(e){
    this.setState({
      studentName:e.target.value
    })
  }

  handleCourse(e){
    this.setState({
      course:e.target.value
    })
  }

  handleEmail(e){
    this.setState({
      email:e.target.value
    })
  }

  handleRegisterForm(func){
    if(this.state.password!=this.state.retypePassword)
    alert('Wrong retype password');
    else{
      const db = firebase.firestore();
      const ref = db.collection('Users').doc('45GCoMKDwQWciXc8193A');
      ref.get().then((data) => {
      // console.log('data after update in mount',data.data().ContractList);
      let Users = data.data().Users;

      Users.unshift({
        Account:this.state.username,
        Class:'student',
        Id:Ids.generate(),
        Name:this.state.studentName,
        Password:this.state.password,
        Course:this.state.course,
        Email:this.state.email,
        TotalScore:0,
        Activated:false
      });

      // localStorage.setItem('user',this.state.studentName);
      // localStorage.setItem('class','student');
      // localStorage.setItem('userId',this.state.Id);

      ref.set({ Users: Users }).then(() => {
        func()
      });
        
      });
    }
    
  }




  render() {
    return (
      <div className="RegisterForm">
        <div className = 'Cover'>

        </div>

        <div className = 'FormInside'>
          <img onClick = {this.props.CloseRegisterForm.bind(this)} className = 'deleteBtn' src = {deleteBtn}></img>
          <h1>Welcome to SYNTAXI</h1>
          <div className = 'Form'>
            {this.state.FormState === 1 &&
             <div className = 'FormState1'>
              <div className="FormUsername">
                <input type="text" 
                       placeholder="Username" 
                       class="FormInput"
                       onChange = {this.handleUsername.bind(this)}
                       value = {this.state.username}
                        ></input>
              </div>
  
              <div className="FormPassword">
                <input type="password" 
                       placeholder="Password" 
                       class="FormInput"
                       onChange = {this.handlePassword.bind(this)}
                       value = {this.state.password}
                        ></input>
              </div>
  
              <div className="FormPasswordAgain">
                <input type="password" 
                       placeholder="Retype password" 
                       class="FormInput"
                       onChange = {this.handleRetypePassword.bind(this)}
                       value = {this.state.retypePassword}
                        ></input>
              </div>

              <div className = 'FormButton'>
                <Button keyword = 'Next' onClick = {this.changeState.bind(this)}></Button>
              </div>
             </div>
            }

            {this.state.FormState === 2 &&
             <div className = 'FormState2'>
              <div className="StudentName">
                <input type="text" 
                       placeholder="Student Name" 
                       class="FormInput"
                       onChange = {this.handleStudentName.bind(this)}
                       value = {this.state.studentName}
                        ></input>
              </div>
  
              <div className="Course">
                <input type="text" 
                       placeholder="Course" 
                       class="FormInput"
                       onChange = {this.handleCourse.bind(this)}
                       value = {this.state.course}
                        ></input>
              </div>
  
              <div className="Email">
                <input type="text" 
                       placeholder="Email" 
                       class="FormInput"
                       onChange = {this.handleEmail.bind(this)}
                       value = {this.state.email}
                        ></input>
              </div>

              <div className = 'FormButton'>
                <Button keyword = 'Back' onClick = {this.changeState.bind(this)}></Button>
                <Button keyword = 'Register' 
                        onClick = {this.handleRegisterForm.bind(this,
                                                                this.props.RegisterDone.bind(this))}></Button>
              </div>
             </div>
            }
          </div>
        </div>
      </div>
    );
  }
}
