import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";
import Collapse from "@material-ui/core/Collapse";
import "../css/Navbar.css";
import "flexboxgrid";

const useStyles = makeStyles(theme => ({
  alertContainer: {
    width: "100%",
    position: "absolute",
    bottom: theme.spacing(2),
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }
}));

const Navbar = () => {
  let [logIn, setLogIn] = useState(true);

  const classes = useStyles();

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

  const Validate = link => {
    // console.log('vallidating...',link);

    if (
      !localStorage.getItem("user") &&
      link !== "./" &&
      link !== "./AboutApp"
    ) {
      setLogIn(false);
      setTimeout(() => {
        setLogIn(true);
      }, 3000);
    } else {
      window.location.href = link;
      setLogIn(true);
    }
  };

  return (
    <div className="row nav">
      <h3 className="title">SYNTAXI</h3>
      <nav className="col-xs-5 nav-links">
        {links.map(link => {
          return (
            <div
              className="Menuitem"
              // href={link.href}
              key={link.id}
              onMouseOver={hoverLink}
              onMouseLeave={leaveLink}
              onClick={Validate}
            >
              {link.name}
            </div>
          );
        })}
        <div
          style={{
            position: "absolute",
            bottom: "1rem",
            left: "0",
            display: "flex",
            justifyContent: "center",
            width: "100vw"
          }}
        >
          <Collapse in={!logIn} style={{width: "50%"}}>
            <Alert
              style={{ width: "100%" }}
              variant="filled"
              severity="error"
              onClose={() => {
                setLogIn(true);
              }}
            >
              Bạn chưa đăng nhập
            </Alert>
          </Collapse>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
