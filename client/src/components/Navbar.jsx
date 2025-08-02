import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useTheme from '../contexts/useTheme';

const Navbar = () => {
  const { darkMode, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav style={{
      padding: '1rem',
      backgroundColor: darkMode ? '#1e1e1e' : '#f5f5f5',
      color: darkMode ? '#eee' : '#111',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <Link to="/">Home</Link>
        {token && <Link to="/ask">Ask</Link>}
        {token && <Link to="/profile">Profile</Link>}
        {!token && <Link to="/login">Login</Link>}
        {!token && <Link to="/register">Register</Link>}
      </div>
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <button onClick={toggleTheme}>
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
        {token && (
          <button onClick={handleLogout}>
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
