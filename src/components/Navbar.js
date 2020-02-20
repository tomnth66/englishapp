import React,{Component} from 'react';
import "../css/Navbar.css";
import "flexboxgrid";

class Navbar extends Component {
  constructor(){
    super();
  }
  links = [
    { id: 0, href: "./", name: "Home" },
    { id: 1, href: "./Practice", name: "Practice" },
    { id: 2, href: "./Ranking", name: "Ranking" },
    { id: 3, href: "./AboutApp", name: "About App" }
  ];

  hoverLink = e => {
    e.currentTarget.classList.add("link-hover");
  };

  leaveLink = e => {
    e.currentTarget.classList.remove("link-hover");
  };

  Validate = (link) =>{
    // console.log('vallidating...',link);
    
    if(!localStorage.getItem('user') && link != './' && link !='./AboutApp'){
      alert('Please login first');
    }
    else
    window.location.href = link;
  }

  render(){
    return (
      <div className="row nav">
        <h3 className="title">SYNTAXI</h3>
        <nav className="col-xs-5 nav-links">
          {this.links.map(link => {
            return (
              <div className = 'Menuitem'
                // href={link.href}
                key={link.id}
                onMouseOver={this.hoverLink}
                onMouseLeave={this.leaveLink}
                onClick = {()=>this.Validate.bind(this)(link.href)}
              >
                {link.name}
              </div>
            );
          })}
        </nav>
      </div>
    );
  }
};

export default Navbar;
