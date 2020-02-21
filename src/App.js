import React,{Component} from 'react';
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Homepage from "./pages/Homepage.js";
import Practicepage from "./pages/Practicepage.js";
import CreateMap from "./pages/CreateMap";
import Test from "./pages/Test";
import Studentmanagement from './pages/Studentmanagement.js'


class App extends Component {
  constructor(){
    super();
  }

  // componentWillMount(){
  //   if(window.location.pathname != '/'){
  //     if(!localStorage.getItem('user')) window.location.href="/";
  //   }
  // }

  render(){
    if(window.location.pathname != '/' && window.location.pathname != '/AboutApp'){
      if(!localStorage.getItem('user')){
        window.location.href="/";
        return null;
      }
    }

    return (
      <Router>
        <div className="App">
          <Route path="/" exact component={Homepage} />
          <Route path="/practice" exact component={Practicepage} />
          <Route path="/createmap" exact component={CreateMap} />
          <Route path="/studentmanagement" exact component={Studentmanagement} />
          <Route path="/test" exact component={Test} />
        </div>
      </Router>
    );
  }
}

export default App;
