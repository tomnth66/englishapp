import React,{Component} from 'react';
import '../css/Mapcard.css';
import Button from './Button.js';
import Picture from '../img/vocabpicture.jpg'

export default class Mapcard extends Component {
  constructor(props){
    super(props);
  }

  render(){
    return(
      <div className = 'Mapcard'>
        <div className = 'Header'>
          <div className = 'Title'>{this.props.title}</div>
          <div className = 'Mapcontroller'>
            <Button keyword = 'Play'></Button>
          </div>
        </div>

        <div className = 'Describe'>
          <div className = 'Mappicture'>
            <img src = {Picture} className = 'Mappictureinside'></img>
          </div>
          <div className = 'Instruction'>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit,
               sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
               Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
               nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in 
               reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla 
               pariatur. Excepteur sint occaecat cupidatat non proident, sunt in 
               culpa qui officia deserunt mollit anim id est laborum.</p>
          </div>
        </div>
      </div>
    );
  }
}