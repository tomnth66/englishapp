import React,{Component} from 'react';
import '../css/InsideLogin.css';
import Button from './Button.js'

export default class Navbar extends Component {
  constructor(props){
    super(props);
  }

  render(){
    return(
      <div className = 'InsideLogin'>
          <div className = 'Account'>
            <input type = 'text' placeholder = 'Username' class = 'Input'></input>
          </div>

          <div className = 'Password'>
            <input type = 'password' placeholder = 'Password' class = 'Input'></input>
          </div>
          
          <Button keyword = 'Login'></Button>
      </div>
    );
  }
}