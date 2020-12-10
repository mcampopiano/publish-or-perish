import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from "react-router-dom"
import { POP } from './App';

ReactDOM.render(

  <React.StrictMode>
    {/* Install router from react-router-dom, then wrap everything in the Router tag so that all components have acces to it, along with having access to all of the route props (match, location, history). */}
    <Router>
      <POP />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
