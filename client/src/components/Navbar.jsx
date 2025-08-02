import React from 'react';
import { Link } from 'react-router-dom';
import useTheme from '../contexts/useTheme';

const Navbar = () => {
  const { darkMode, toggleTheme } = useTheme();
  return (
    <nav style={{ padding: '1rem', backgroundColor: darkMode ? '#1e1e1e' : '#f5f5f5', display: 'flex', justifyContent: 'space-between' }}>
      <div>
        <Link to="/">Home</Link> | <Link to="/ask">Ask</Link> | <Link to="/profile">Profile</Link> | <Link to="/login">Login</Link> | <Link to="/register">Register</Link>
      </div>
      <button onClick={toggleTheme}>{darkMode ? 'Light Mode' : 'Dark Mode'}</button>
    </nav>
  );
};

export default Navbar;