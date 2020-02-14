import React from 'react';
import './App.css';
import { BrowserRouter as Router ,Route } from 'react-router-dom';
import Homepage from './components/Homepage.js';

function App() {
  return (
    <Router>
      <div className="App">
        <Route path = "/" component = {Homepage} />
      </div>
    </Router>
  );
}

export default App;
