import { Link, NavLink, useNavigate } from 'react-router-dom';
import useAuthStore from '../../store/useAuthStore';
import useCartStore from '../../store/useCartStore';
import { FiShoppingCart, FiMenu, FiX, FiLogOut, FiUser } from 'react-icons/fi';
import { MdLocalPharmacy } from 'react-icons/md';
import { useState } from 'react';
import './Navbar.css';

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuthStore();
  const totalItems = useCartStore((s) => s.totalItems());
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getDashboardLink = () => {
    if (!user) return '/login';
    if (user.role === 'admin') return '/admin';
    if (user.role === 'pharmacy') return '/pharmacy';
    return '/customer';
  };

  return (
    <nav className="navbar">
      <div className="navbar__container">
        {/* Logo */}
        <Link to="/" className="navbar__logo">
          <MdLocalPharmacy className="navbar__logo-icon" />
          <span>Medi<span className="navbar__logo-accent">Quick</span></span>
        </Link>

        {/* Desktop nav links */}
        <ul className={`navbar__links ${menuOpen ? 'navbar__links--open' : ''}`}>
          <li><NavLink to="/" end onClick={() => setMenuOpen(false)}>Home</NavLink></li>
          <li><NavLink to="/medicines" onClick={() => setMenuOpen(false)}>Medicines</NavLink></li>
          <li><NavLink to="/about" onClick={() => setMenuOpen(false)}>About</NavLink></li>
          <li><NavLink to="/contact" onClick={() => setMenuOpen(false)}>Contact</NavLink></li>
          {isAuthenticated() && (
            <li><NavLink to={getDashboardLink()} onClick={() => setMenuOpen(false)}>Dashboard</NavLink></li>
          )}
        </ul>

        {/* Right actions */}
        <div className="navbar__actions">
          {user?.role === 'customer' && (
            <Link to="/customer/cart" className="navbar__cart" aria-label="Cart">
              <FiShoppingCart />
              {totalItems > 0 && <span className="navbar__cart-badge">{totalItems}</span>}
            </Link>
          )}

          {isAuthenticated() ? (
            <div className="navbar__user">
              <Link to={getDashboardLink()} className="navbar__user-name">
                <FiUser /> {user.name?.split(' ')[0]}
              </Link>
              <button className="navbar__logout" onClick={handleLogout} title="Logout">
                <FiLogOut />
              </button>
            </div>
          ) : (
            <div className="navbar__auth-btns">
              <Link to="/login" className="btn btn--outline-sm">Login</Link>
              <Link to="/register" className="btn btn--primary-sm">Sign Up</Link>
            </div>
          )}

          <button
            className="navbar__hamburger"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
