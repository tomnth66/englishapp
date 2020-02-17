import "../css/Button.css";
import React, { useState } from "react";
import Ripples from "react-ripples";
// var classNames = require("classnames");

const Button = props => {
  // custom color button
  let btnColor = `btn--${props.color}`;

  let btnClass = "btn waves--effect ";
  if (props.color) {
    btnClass += btnColor;
  }

  // set pos for ripple
  let [pos, setPos] = useState({ X: 0, Y: 0 });

  // default size
  let maxSize = `${60 * 2}px`;
  const changeBackground = e => {
    e.target.classList.add("btn--hover");
  };

  const returnBackground = e => {
    e.target.classList.remove("btn--hover");
  };

  return (
    <Ripples
      color="rgba(216, 222, 233, 0.25)"
      during="1200"
    >
      <div
        onMouseOver={changeBackground}
        onMouseLeave={returnBackground}
        className={btnClass}
      >
        {props.keyword}
      </div>
    </Ripples>
  );
};

export default Button;
