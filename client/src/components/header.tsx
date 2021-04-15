import React from 'react';
import logo from './star-wars-logo.svg';
import '../css/header.css';

function Header() {
  return (
    <div className="header">
      <img
        src={logo}
        alt="StarWars"
        style={{ width: '300px', margin: 'auto', display: 'block' }}
      />
    </div>
  );
}

export default Header;
