import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Homepage from "./pages/Homepage.js";
import Practicepage from "./pages/Practicepage.js";
import CreateMap from "./pages/CreateMap";

function App() {

  return (
    <Router>
      <div className="App">
        <Route path="/" exact component={Homepage} />
        <Route path="/practice" exact component={Practicepage} />
        <Route path="/create-map" exact component={CreateMap} />
      </div>
    </Router>
  );
}

export default App;
