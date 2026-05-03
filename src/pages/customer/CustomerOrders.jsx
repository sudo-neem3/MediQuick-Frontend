import { useEffect, useState } from 'react';
import { getMyOrders } from '../../api/orders.api';
import StatusBadge from '../../components/StatusBadge/StatusBadge';
import Spinner from '../../components/Spinner/Spinner';
import { formatCurrency, formatDate } from '../../utils/validators';
import { MdShoppingBag } from 'react-icons/md';
import { Link } from 'react-router-dom';
import './CustomerOrders.css';

const MOCK_ORDERS = [
  { _id: '1', createdAt: new Date().toISOString(), status: 'delivered', totalAmount: 430, items: [{ medicine: { name: 'Paracetamol' }, quantity: 2 }] },
  { _id: '2', createdAt: new Date().toISOString(), status: 'pending', totalAmount: 180, items: [{ medicine: { name: 'Amoxicillin' }, quantity: 1 }] },
];

const CustomerOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMyOrders()
      .then(({ data }) => setOrders(data.orders || data))
      .catch(() => setOrders(MOCK_ORDERS))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Spinner text="Loading orders..." />;

  return (
    <div className="orders-page">
      <div className="dash-page-header">
        <h1>My Orders</h1>
        <p>Track all your medicine orders</p>
      </div>

      {orders.length === 0 ? (
        <div className="cart-empty">
          <MdShoppingBag />
          <h2>No orders yet</h2>
          <p>Start by browsing our medicines</p>
          <Link to="/medicines" className="btn btn--primary">Browse Medicines</Link>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <div key={order._id} className="order-card">
              <div className="order-card__top">
                <div>
                  <p className="order-card__id">Order #{order._id.slice(-8).toUpperCase()}</p>
                  <p className="order-card__date">{formatDate(order.createdAt)}</p>
                </div>
                <StatusBadge status={order.status} />
              </div>
              <div className="order-card__items">
                {order.items?.map((item, i) => (
                  <span key={i} className="order-item-tag">
                    {item.medicine?.name} × {item.quantity}
                  </span>
                ))}
              </div>
              <div className="order-card__footer">
                <span>Total: <strong>{formatCurrency(order.totalAmount)}</strong></span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default CustomerOrders;
