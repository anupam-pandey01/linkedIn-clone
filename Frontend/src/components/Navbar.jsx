import React from 'react';
import { Link, useNavigate } from 'react-router';

export default function Navbar(){
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="nav-inner">
        <Link to="/" className="logo">LinkedIn</Link>
        <div className="nav-right">
          {user ? (
            <>
              <Link to={`/profile/${user.id}`} className="nav-user">{user.name}</Link>
              <button onClick={logout} className="btn">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn">Login</Link>
              <Link to="/signup" className="btn">Signup</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
