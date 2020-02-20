import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Homepage from "./pages/Homepage.js";
import Practicepage from "./pages/Practicepage.js";
import CreateMap from "./pages/CreateMap";
import Test from "./pages/Test";

function App() {

  return (
    <Router>
      <div className="App">
        <Route path="/" exact component={Homepage} />
        <Route path="/practice" exact component={Practicepage} />
        <Route path="/createmap" exact component={CreateMap} />
        <Route path="/test" exact component={Test} />
      </div>
    </Router>
  );
}

export default App;
