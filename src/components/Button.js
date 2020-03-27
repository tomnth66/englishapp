import "../css/Button.css";
import React from "react";
import Ripples from "react-ripples";
import '@fortawesome/fontawesome-free/css/all.css';
  

const Button = props => {
  // custom color button
  let btnColor = `btn--${props.color}`;

  let btnClass = "btn waves--effect ";
  if (props.color) {
    btnClass += btnColor;
  }

  const changeBackground = e => {
    e.currentTarget.classList.add("btn--hover");
  };

  const returnBackground = e => {
    e.currentTarget.classList.remove("btn--hover");
  };

  return (
    <Ripples
      color="rgba(216, 222, 233, 0.35)"
      during="1200"
      onMouseOver={changeBackground}
      onMouseLeave={returnBackground}
      className={btnClass}
      onClick={props.onClick}
    >
        {props.keyword}
        {"\t"}
        <i className={`fa fa-${props.icon}`}></i>
    </Ripples>
  );
};

export default Button;
