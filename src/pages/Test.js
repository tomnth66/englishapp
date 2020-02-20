// this file is use for example component
import React from "react";
import Navbar from "../components/Navbar.js";
import InputForm from "../components/InputForm.js";
import "flexboxgrid";

const Test = () => {
  return (
    <div style={{ height: "100vh" }}>
      <Navbar />
      <div
        className="row middle-xs center-xs"
        style={{ height: "calc(100% - 4rem)" }}
      >
        <InputForm label="Test" className="col-xs-10" />
      </div>
    </div>
  );
};

export default Test;
