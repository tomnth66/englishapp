import React,{Component} from 'react';
import '../css/Button.css';

export default class Button extends Component {
  constructor(props){
    super(props);
  }

  render(){
    return(
      <div className = 'Button'>
        <span className = 'wordSpan'>{this.props.keyword}</span>
      </div>
    );
  }
}