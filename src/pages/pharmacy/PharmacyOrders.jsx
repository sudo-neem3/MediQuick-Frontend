import { useEffect } from 'react';
import usePharmacyStore from '../../store/usePharmacyStore';
import Spinner from '../../components/Spinner/Spinner';
import StatusBadge from '../../components/StatusBadge/StatusBadge';
import { formatCurrency, formatDate } from '../../utils/validators';
import toast from 'react-hot-toast';
import './PharmacyOrders.css';

const STATUS_OPTIONS = ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'];

const PharmacyOrders = () => {
  const { orders, isLoading, fetchOrders, updateOrderStatus } = usePharmacyStore();

  useEffect(() => { fetchOrders(); }, []);

  const handleStatus = async (orderId, status) => {
    const result = await updateOrderStatus(orderId, status);
    if (result.success) toast.success(`Order marked as ${status}`);
    else toast.error('Status update failed');
  };

  if (isLoading && orders.length === 0) return <Spinner text="Loading orders..." />;

  return (
    <div className="ph-orders">
      <div className="dash-page-header">
        <h1>Orders</h1>
        <p>Manage and update customer orders</p>
      </div>
      {orders.length === 0 ? (
        <p className="no-data">No orders received yet.</p>
      ) : (
        <div className="simple-table-wrap">
          <table className="simple-table">
            <thead>
              <tr><th>Order ID</th><th>Customer</th><th>Items</th><th>Total</th><th>Date</th><th>Status</th><th>Update</th></tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o._id}>
                  <td>#{o._id.slice(-6).toUpperCase()}</td>
                  <td>{o.customer?.name || 'Customer'}</td>
                  <td>{o.items?.length || 0} item(s)</td>
                  <td>{formatCurrency(o.totalAmount || 0)}</td>
                  <td>{formatDate(o.createdAt)}</td>
                  <td><StatusBadge status={o.status} /></td>
                  <td>
                    <select className="status-select" value={o.status}
                      onChange={(e) => handleStatus(o._id, e.target.value)}>
                      {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
export default PharmacyOrders;
