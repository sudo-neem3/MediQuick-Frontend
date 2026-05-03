import { Link } from 'react-router-dom';
import { MdLocalPharmacy } from 'react-icons/md';
import { FiMail, FiPhone, FiMapPin } from 'react-icons/fi';
import './Footer.css';

const Footer = () => (
  <footer className="footer">
    <div className="footer__container">
      <div className="footer__brand">
        <Link to="/" className="footer__logo">
          <MdLocalPharmacy /> Medi<span>Quick</span>
        </Link>
        <p>Your trusted online pharmacy. Fast delivery, genuine medicines, 24/7 support.</p>
      </div>
      <div className="footer__col">
        <h4>Quick Links</h4>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/medicines">Medicines</Link></li>
          <li><Link to="/about">About Us</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
      </div>
      <div className="footer__col">
        <h4>Account</h4>
        <ul>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/register">Sign Up</Link></li>
          <li><Link to="/customer">My Orders</Link></li>
          <li><Link to="/customer/cart">Cart</Link></li>
        </ul>
      </div>
      <div className="footer__col">
        <h4>Contact</h4>
        <ul className="footer__contact">
          <li><FiMail /> support@mediquick.pk</li>
          <li><FiPhone /> +92 300 1234567</li>
          <li><FiMapPin /> Lahore, Pakistan</li>
        </ul>
      </div>
    </div>
    <div className="footer__bottom">
      <p>© {new Date().getFullYear()} MediQuick. All rights reserved.</p>
    </div>
  </footer>
);

export default Footer;
