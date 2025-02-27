import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link
import '../styles/Navbar.css';

const Navbar = () => {
  const [menuActive, setMenuActive] = useState(false);

  const toggleMenu = () => {
    setMenuActive(!menuActive);
  };

  return (
    <nav className="custom-navbar">
      <div className="container">
        <h1 className="logo">Hometutions</h1>
        <div className="hamburger" onClick={toggleMenu}>
          &#9776;
        </div>
        <ul className={`nav-links ${menuActive ? 'active' : ''}`}>
          <li className="nav-item">
            <Link className="nav-link" to="/">Home</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/about">About</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/search-tutor">Search for Tutor</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/register-tutor">Register as Tutor</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
