import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaCog } from 'react-icons/fa';
import "./Navbar.css"; // Add a separate CSS file for the Navbar styles

function Navbar() {
  let location = useLocation();
  let navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("auth-token");
    navigate("/login");
    window.location.reload();
  }

  return (
    <nav className="sidebar">
      <div className="sidebar-header">
        <Link className="brand" to="/">DigitalNoteBook</Link>
      </div>
      <ul className="sidebar-menu">
        <li>
          <Link className={location.pathname === "/allnotes" ? "active" : ""} to="/allnotes">All Notes</Link>
        </li>
        <li>
          <Link className={location.pathname === "/favourites" ? "active" : ""} to="/favourites">Favourites</Link>
        </li>
      </ul>
      <div className="sidebar-footer">
        {!localStorage.getItem("auth-token") ? (
          <div className="auth-buttons">
            <Link to="/login" className="btn">Login</Link>
            <Link to="/signup" className="btn">Signup</Link>
          </div>
        ) : (
          <div className="auth-actions">
            <Link to="/settings" className="btn settings-btn"><FaCog /></Link>
            <button onClick={handleLogout} className="btn logout-btn">Logout</button>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
