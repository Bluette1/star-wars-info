import React from 'react';
import { Link } from 'react-router-dom';
import logo from './star-wars-logo.svg';
import '../css/header.css';

function Header() {
  return (
    <div className="header">
      <Link to="/">
        <img
          src={logo}
          alt="StarWars"
          style={{ width: '300px', margin: 'auto', display: 'block' }}
        />
      </Link>
    </div>
  );
}

export default Header;
