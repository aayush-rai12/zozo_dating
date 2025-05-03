import React from 'react';
import './header.css';
import { Link } from 'react-router-dom';

const Header = () => {
  const location = window.location.pathname;
  const hidenavbar = ['/login', '/register', '/userProfile'].includes(location);
  return (
    <header className="nav_header">
      <div className="logo">
        <Link to="/">Zozo Dating</Link>
      </div>
      <nav className="header_nav_links">
       {!hidenavbar && <Link to="/login">Login</Link>}
        <Link to="/register">Register</Link>
        <Link to="/userProfile">Profile</Link>
      </nav>
    </header>
  );
};

export default Header;
