import React from 'react';
import logo from './star-wars-logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <img
        src={logo}
        alt="StarWars"
        style={{ width: '300px', margin: 'auto', display: 'block' }}
      />
    </div>
  );
}

export default App;
