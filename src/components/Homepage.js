import React,{Component} from 'react';
import '../css/Homepage.css';
import Navbar from './Navbar.js';
import News from './News.js';
import Login from './Login.js';
import Profile from './Profile.js'

export default class Homepage extends Component {
  constructor(props){
    super(props);
  }

  render(){
    return(
      <div className = 'Homepage'>
        <div className = 'HomepageHeader'>
          <Navbar></Navbar>
        </div>

        <div className = 'HomepageBody'>
          <News></News>
          <Login></Login>
          {/* <Profile></Profile> */}
        </div>

      </div>
    );
  }
}