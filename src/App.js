import React from 'react';
import './App.css';
import { BrowserRouter as Router ,Route } from 'react-router-dom';
import Homepage from './components/Homepage.js';
import Practicepage from './components/Practicepage.js';

function App() {
  return (
    <Router>
      <div className="App">
        <Route path = "/" exact component = {Homepage} />
        <Route path = "/practice" exact component = {Practicepage} />
      </div>
    </Router>
  );
}

export default App;
