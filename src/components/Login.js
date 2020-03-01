import React from "react";
import "../css/Login.css";
import InsideLogin from "./InsideLogin.js";
// import Teust from "../pages/Test";

const Login = () => {
    return (
      <div className="Login">
        <InsideLogin></InsideLogin>
        {/* <Test></Test> */}
      </div>
    );
}

export default Login;