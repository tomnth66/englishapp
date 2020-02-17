import React,{Component} from 'react';
import '../css/Practicepage.css';
import Navbar from '../components/Navbar.js';
import MapSelection from '../components/MapSelection.js';
import Profile from '../components/Profile.js'

export default class Homepage extends Component {
  constructor(props){
    super(props);
  }

  render(){
    return(
      <div className = 'Practicepage'>
        <div className = 'PracticepageHeader'>
          <Navbar></Navbar>
        </div>

        <div className = 'PracticepageBodyHeader'>
          <h1>There should be a title here</h1>
        </div>

        <div className = 'PracticepageBody'>
          <MapSelection></MapSelection>
          <Profile></Profile>
        </div>

      </div>
    );
  }
}