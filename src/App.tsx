import React from 'react';
import './App.css';
import { RegisterServiceWorker } from './RegisterServiceWorker';

function App() {
  return (
    <>
      <RegisterServiceWorker />
      <div className="App">
        <header className="App-header">
          <p>
            Boilerplate - PWA
          </p>
          <p>
            Version 3
          </p>
        </header>
      </div>
    </>
  );
}

export default App;
