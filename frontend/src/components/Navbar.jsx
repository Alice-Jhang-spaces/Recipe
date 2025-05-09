import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/Navbar.css';

function Navbar() {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('token'); // Check login status

  // Handle Dashboard navigation
  const handleDashboardClick = () => {
    if (isLoggedIn) {
      navigate('/dashboard');
    } else {
      navigate('/login');
    }
  };
    // Navigate to Favorites page
    const handleFavorite = () => {
      if (isLoggedIn) {
        navigate('/favorites');
      } else {
        alert("Please log in to view your favorites.");
        navigate('/login');
      }
    };
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    navigate('/login'); // Redirect to login after logout
  };

  return (
    <nav className="navbar-custom">
      <div className="navbar-container">
        <div className="navbar-left">
          <Link to="/" className="logo">Recipe</Link>
          <a onClick={handleDashboardClick} className="nav-link">Dashboard</a>
          <a onClick={handleFavorite} className="nav-link">Favorite</a>
        </div>
        

        <ul className="nav-links navbar-right">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/recipes">Recipes</Link></li>
          {isLoggedIn ? (
            <li><button onClick={handleLogout} className="create-btn">Logout</button></li>
          ) : (
            <>
              <li><Link to="/login" className="nav-link">Login</Link></li>
              <li><Link to="/register" className="signup-btn">Sign Up</Link></li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}
export default Navbar;
