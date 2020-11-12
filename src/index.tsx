import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorkerRegistration'

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.register({
  onUpdate: (registration) => {
    registration.waiting?.postMessage({type: 'SKIP_WAITING'})
  }
})
