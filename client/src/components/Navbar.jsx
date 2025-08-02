import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav style={{ padding: '1rem', background: '#f0f0f0' }}>
      <Link to="/">Home</Link> |{" "}
      <Link to="/ask">Ask</Link> |{" "}
      <Link to="/profile">Profile</Link> |{" "}
      <Link to="/login">Login</Link> |{" "}
      <Link to="/register">Register</Link>
    </nav>
  );
};

export default Navbar;
