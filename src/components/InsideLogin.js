import React, { Component } from "react";
import "../css/InsideLogin.css";
import Button from "./Button.js";
import firebase from '../firebase';
import RegisterForm from './RegisterForm.js'
import RegisterDone from './RegisterDone.js'

let acc,pass;
let userInfo;

export default class InsideLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      err:'',
      registerForm: false,
      registerDone: false
    }

    this.inputElement = React.createRef();
  }

  login(event,funct){
    // console.log(event.keyCode);
    if(event.keyCode === 13){
      funct();
    }
  }

  handleAccount(event){
    acc = event.target.value;
  }

  handlePassword(event){
    pass = event.target.value;
  }

  handleForm(){
    // console.log(acc,pass);
    const db = firebase.firestore();
    const ref = db.collection('Users').doc('45GCoMKDwQWciXc8193A');
    ref.get().then((data) => {
      // console.log('data after update in mount',data.data().ContractList);
      let Users = data.data().Users;
      // console.log(Users);
      let UserAccount = Users.filter(function(user){
        return user.Account === acc;
      })
      // console.log(UserAccount);
      if(!UserAccount.length){
        this.setState({
          redirect:this.state.redirect,
          err: 'This account is not exist'
        }) 
      }
      else{
        let User = UserAccount.filter(function(user){
          return user.Password === pass;
        })

        if(!User.length){
          this.setState({
            redirect:this.state.redirect,
            err: 'Wrong password'
          }) 
        }
        else{
          userInfo = User[0];
          if(!userInfo.Activated){
            this.setState({
              err: 'Sorry, this account is inactivated, please wait until it is activated'
            }) 
          }

          else{
            localStorage.setItem('user',userInfo.Name);
            localStorage.setItem('class',userInfo.Class);
            localStorage.setItem('userId',userInfo.Id);
            window.location.href="/";
            return;
          }
          // this.hello();
        }
      }

      // console.log(this.state.err);
    });
  }

  register(){
    this.setState({
      registerForm: true
    })
  }

  CloseRegisterForm(){
    // console.log('closing...');
    this.setState({
      registerForm: false
    })
  }

  RegisterDone(){
    this.setState({
      registerForm: false,
      registerDone: true
    })
  }

  render() {
    return (
      <div className="InsideLogin">
        <div className="Account">
          <input type="text" 
                 placeholder="Username" 
                 class="Input"
                 ref = {this.inputElement}
                 onKeyUp = {(event)=>this.login.bind(this)(event,this.handleForm.bind(this))} 
                 onChange = {this.handleAccount.bind(this)}></input>
        </div>

        <div className="Password">
          <input type="password" 
                 placeholder="Password" 
                 class="Input"
                 onKeyUp = {(event)=>this.login.bind(this)(event,this.handleForm.bind(this))} 
                 onChange = {this.handlePassword.bind(this)}></input>
        </div>

        <Button keyword="Login" onClick =  {this.handleForm.bind(this)}></Button>
        <Button keyword="Register" onClick = {this.register.bind(this)}></Button>

        {this.state.registerForm && <RegisterForm CloseRegisterForm = {this.CloseRegisterForm.bind(this)} 
                                                  RegisterDone = {this.RegisterDone.bind(this)}></RegisterForm>}

        {this.state.registerDone && <RegisterDone></RegisterDone>}
        {this.state.err && <p>{this.state.err}</p>}

      </div>
    );
  }
}
