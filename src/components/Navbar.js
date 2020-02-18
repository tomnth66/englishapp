import React from "react";
import "../css/Navbar.css";
import "flexboxgrid";

const Navbar = () => {
  const links = [
    { id: 0, href: "./", name: "Home" },
    { id: 1, href: "./Practice", name: "Practice" },
    { id: 2, href: "./Ranking", name: "Ranking" },
    { id: 3, href: "./AboutApp", name: "About App" }
  ];

  const hoverLink = e => {
    e.currentTarget.classList.add("link-hover");
  };

  const leaveLink = e => {
    e.currentTarget.classList.remove("link-hover");
  };

  return (
    <div className="row nav">
      <h3 className="title">SYNTAXI</h3>
      <nav className="col-xs-5 nav-links">
        {links.map(link => {
          return (
            <a
              href={link.href}
              key={link.id}
              onMouseOver={hoverLink}
              onMouseLeave={leaveLink}
            >
              {link.name}
            </a>
          );
        })}
      </nav>
    </div>
  );
};

export default Navbar;
