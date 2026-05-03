import { useEffect } from 'react';
import useAdminStore from '../../store/useAdminStore';
import Spinner from '../../components/Spinner/Spinner';
import StatusBadge from '../../components/StatusBadge/StatusBadge';
import { formatCurrency, formatDate } from '../../utils/validators';

const AdminOrders = () => {
  const { orders, isLoading, fetchOrders } = useAdminStore();

  useEffect(() => { fetchOrders(); }, []);

  if (isLoading && orders.length === 0) return <Spinner text="Loading orders..." />;

  return (
    <div style={{ maxWidth: '1100px' }}>
      <div className="dash-page-header">
        <h1>All Orders</h1>
        <p>{orders.length} total orders on the platform</p>
      </div>
      <div className="simple-table-wrap">
        <table className="simple-table">
          <thead>
            <tr><th>Order ID</th><th>Customer</th><th>Pharmacy</th><th>Total</th><th>Date</th><th>Status</th></tr>
          </thead>
          <tbody>
            {orders.length === 0 ? (
              <tr><td colSpan={6} style={{ textAlign: 'center', padding: '2rem', color: 'rgba(255,255,255,0.3)' }}>No orders found</td></tr>
            ) : orders.map((o) => (
              <tr key={o._id}>
                <td>#{o._id.slice(-6).toUpperCase()}</td>
                <td>{o.customer?.name || '—'}</td>
                <td>{o.pharmacy?.name || '—'}</td>
                <td>{formatCurrency(o.totalAmount || 0)}</td>
                <td>{o.createdAt ? formatDate(o.createdAt) : '—'}</td>
                <td><StatusBadge status={o.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default AdminOrders;
