// keep this css up here so it has the lowest priorty
import 'bootstrap/dist/css/bootstrap.css';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import './css/index.css';

ReactDOM.render(<App />, document.getElementById('root'));
// registerServiceWorker();

// if we're developing locally, change page title to reflect that
if (window.location.hostname === 'localhost') {
  document.querySelector('title').innerHTML = 'DEV youtube clip';
}
