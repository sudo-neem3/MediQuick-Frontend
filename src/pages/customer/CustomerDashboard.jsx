import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import useAuthStore from '../../store/useAuthStore';
import useCartStore from '../../store/useCartStore';
import StatCard from '../../components/StatCard/StatCard';
import { MdShoppingBag, MdLocalPharmacy, MdFavorite } from 'react-icons/md';
import { FiShoppingCart, FiArrowRight } from 'react-icons/fi';
import './CustomerDashboard.css';

const CustomerDashboard = () => {
  const { user } = useAuthStore();
  const { items, totalItems, totalPrice } = useCartStore();

  return (
    <div className="cust-dash">
      <div className="dash-page-header">
        <h1>Welcome back, {user?.name?.split(' ')[0]} 👋</h1>
        <p>Here's a summary of your account</p>
      </div>

      <div className="stats-grid">
        <StatCard icon={<FiShoppingCart />} label="Cart Items" value={totalItems()} color="#63b3ed" />
        <StatCard icon={<MdShoppingBag />} label="Total Orders" value="0" color="#10b981" />
        <StatCard icon={<MdLocalPharmacy />} label="Cart Value" value={`PKR ${totalPrice().toLocaleString()}`} color="#a78bfa" />
        <StatCard icon={<MdFavorite />} label="Saved Items" value="0" color="#f59e0b" />
      </div>

      <div className="dash-quick-actions">
        <h2>Quick Actions</h2>
        <div className="quick-actions-grid">
          <Link to="/medicines" className="quick-action-card">
            <MdLocalPharmacy />
            <div>
              <h3>Browse Medicines</h3>
              <p>Find and order from verified pharmacies</p>
            </div>
            <FiArrowRight className="quick-action-arrow" />
          </Link>
          <Link to="/customer/orders" className="quick-action-card">
            <MdShoppingBag />
            <div>
              <h3>My Orders</h3>
              <p>Track your current and past orders</p>
            </div>
            <FiArrowRight className="quick-action-arrow" />
          </Link>
          <Link to="/customer/cart" className="quick-action-card">
            <FiShoppingCart />
            <div>
              <h3>My Cart</h3>
              <p>{totalItems()} items ready to checkout</p>
            </div>
            <FiArrowRight className="quick-action-arrow" />
          </Link>
        </div>
      </div>

      {items.length > 0 && (
        <div className="dash-cart-preview">
          <div className="dash-section-header">
            <h2>Cart Preview</h2>
            <Link to="/customer/cart" className="see-all">View cart <FiArrowRight /></Link>
          </div>
          <div className="cart-preview-list">
            {items.slice(0, 3).map((item) => (
              <div key={item.medicine._id || item.medicine.id} className="cart-preview-item">
                <MdLocalPharmacy className="cart-preview-icon" />
                <div>
                  <p>{item.medicine.name}</p>
                  <span>Qty: {item.quantity}</span>
                </div>
                <strong>PKR {(item.medicine.price * item.quantity).toLocaleString()}</strong>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
export default CustomerDashboard;
