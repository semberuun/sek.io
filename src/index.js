import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom'
import './index.css';
import App from './Pages/App';
import { UserStore } from './Context/UserContext';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <UserStore>
        <App />
      </UserStore>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

