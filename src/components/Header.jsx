import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  const handleLogout = () => {
    // Clear authentication data
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    // Navigate to home page
    navigate('/');
  };

  return (
    <header className="bg-blue-900 text-white fixed top-0 left-0 w-full shadow-lg z-50">
      <div className="container mx-auto flex justify-between items-center px-4 py-4">
        
        <div className="flex items-center space-x-3">
          <img src="logo.jpg" alt="Ragify Logo" className="h-10 w-10 object-contain rounded-lg" />
          <span className="text-2xl font-bold tracking-wide">Ragify</span>
        </div>

        
        <div className="lg:hidden">
          <button
            className="text-white hover:text-yellow-300 transition"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? (
              <span className="text-xl font-bold">&times;</span>
            ) : (
              <span className="text-xl font-bold">&#9776;</span>
            )}
          </button>
        </div>

        
        <nav
          className={`absolute lg:static top-16 left-0 w-full lg:w-auto bg-blue-900 lg:bg-transparent lg:flex lg:space-x-8 lg:items-center text-lg font-medium transition-transform ${
            menuOpen ? 'block' : 'hidden'
          }`}
        >
          <ul className="flex flex-col lg:flex-row items-center lg:space-x-8">
            <li>
              <Link
                to="/"
                className="block py-2 px-4 hover:text-yellow-300 transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/pricing"
                className="block py-2 px-4 hover:text-yellow-300 transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                Pricing
              </Link>
            </li>
            {isAuthenticated ? (
              <>
                <li>
                  <Link
                    to="/dashboard"
                    className="block py-2 px-4 hover:text-yellow-300 transition-colors"
                    onClick={() => setMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="block py-2 px-4 hover:text-yellow-300 transition-colors"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    to="/login"
                    className="block py-2 px-4 hover:text-yellow-300 transition-colors"
                    onClick={() => setMenuOpen(false)}
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    to="/signup"
                    className="block py-2 px-4 hover:text-yellow-300 transition-colors"
                    onClick={() => setMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
