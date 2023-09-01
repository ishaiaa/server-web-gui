import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Login from './components/pages/Login';
import Desktop from './components/pages/Desktop';

import { createStore } from 'state-pool';

import { BrowserRouter as Router} from 'react-router-dom';

// import reportWebVitals from './reportWebVitals';

const store = createStore();  // Create store for storing our state
store.setState("darkTheme", false);

const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

root.render(
  <Router>
    <App />
  </Router>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
