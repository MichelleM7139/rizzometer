// src/components/Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; // Optional: for styling

const Header = () => {
  return (
    <header className="header">
  <div className="logo-container">
    <img src="logos/1x/left.png" alt="Left Logo" className="header-left" />
    <Link to="/">
      <img src="logos/1x/rizzometer.png" alt="Main Logo" className="rizztest" />
    </Link>
    <img src="logos/1x/right.png" alt="Right Logo" className="header-right" />
  </div>
</header>
  );
};

export default Header;