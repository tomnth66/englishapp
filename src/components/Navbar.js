import React,{Component} from 'react';
import '../css/Navbar.css';

export default class Navbar extends Component {
  constructor(props){
    super(props);
  }

  render(){
    return(
      <div className = 'Menu'>
          <ul>
            <li><a href = './'>Home</a></li>
            <li><a href = './Practice'>Practice</a></li>
            <li><a href = './Ranking'>Ranking</a></li>
            <li><a href = './AboutApp'>About App</a></li>
          </ul>
        </div>
    );
  }
}