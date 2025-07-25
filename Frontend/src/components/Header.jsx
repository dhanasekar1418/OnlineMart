import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { logoutUser } from '../redux/slices/userSlice';
import { ShoppingCart, UserCircle, LogOut, Search } from 'lucide-react';
import '../Styles/header.css';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useSelector((state) => state.user);
  const { cartItems } = useSelector((state) => state.cart);

  const [searchTerm, setSearchTerm] = useState('');

  const handleLogout = () => {
    dispatch(logoutUser());
    toast.info('You have been logged out.');
    navigate('/login');
  };

  // LIVE SEARCH: update URL as user types
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.trim() === '') {
      // Show all products
      navigate('/products');
    } else {
      // Update URL with search term
      navigate(`/products?search=${value}`);
    }
  };

  return (
    <>
      <div className="top-banner">
        <p className="scroll-text">
          Get up to ₹200 cashback on payment via Mobikwik wallet over Rs. 499. T&C Apply* &nbsp;&nbsp;
          Use code <strong>DELIGHT</strong> and unlock exciting offers!
        </p>
      </div>

      <header className="header">
        <div className="header-container">
          <Link to="/" className="logo">ShopVerse</Link>

          {/* Search Bar */}
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <Search size={18} />
          </div>

          {/* Navigation */}
          <nav className="nav">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/products" className="nav-link">Products</Link>
            <Link to="/cart" className="cart-link">
              <ShoppingCart className="cart-icon" />
              {cartItems.length > 0 && (
                <span className="cart-badge">{cartItems.length}</span>
              )}
            </Link>

            {/* User Dropdown */}
            {user ? (
              <div className="user-dropdown">
                <button className="user-button">
                  <UserCircle className="user-icon" />
                  <span className="user-name">{user.name}</span>
                </button>
                <div className="dropdown-menu">
                  {user.isAdmin && (
                    <Link to="/admin/dashboard" className="dropdown-item">
                      Admin Dashboard
                    </Link>
                  )}
                  <Link to="/profile" className="dropdown-item">
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="dropdown-item logout"
                  >
                    <LogOut size={16} /> Logout
                  </button>
                </div>
              </div>
            ) : (
              <Link to="/login" className="login-link">Login</Link>
            )}
          </nav>
        </div>
      </header>
    </>
  );
};

export default Header;
