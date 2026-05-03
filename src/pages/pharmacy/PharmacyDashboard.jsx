import { useEffect } from 'react';
import usePharmacyStore from '../../store/usePharmacyStore';
import useAuthStore from '../../store/useAuthStore';
import StatCard from '../../components/StatCard/StatCard';
import Spinner from '../../components/Spinner/Spinner';
import { MdMedicalServices, MdListAlt, MdCheckCircle, MdAttachMoney } from 'react-icons/md';
import { formatCurrency } from '../../utils/validators';
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import './PharmacyDashboard.css';

const PharmacyDashboard = () => {
  const { user } = useAuthStore();
  const { stats, orders, isLoading, fetchOrders, fetchMedicines } = usePharmacyStore();

  useEffect(() => {
    fetchOrders();
    fetchMedicines();
  }, []);

  if (isLoading) return <Spinner text="Loading dashboard..." />;

  const recentOrders = orders.slice(0, 5);

  return (
    <div className="pharmacy-dash">
      <div className="dash-page-header">
        <h1>Pharmacy Dashboard</h1>
        <p>Welcome back, {user?.name}</p>
      </div>

      <div className="stats-grid">
        <StatCard icon={<MdMedicalServices />} label="Total Medicines" value={stats.totalMedicines} color="#63b3ed" />
        <StatCard icon={<MdListAlt />} label="Pending Orders" value={stats.pendingOrders} color="#f59e0b" />
        <StatCard icon={<MdCheckCircle />} label="Completed" value={stats.completedOrders} color="#10b981" />
        <StatCard icon={<MdAttachMoney />} label="Revenue" value={formatCurrency(stats.totalRevenue)} color="#a78bfa" />
      </div>

      <div className="dash-section">
        <div className="dash-section-header">
          <h2>Recent Orders</h2>
          <Link to="/pharmacy/orders" className="see-all">View all <FiArrowRight /></Link>
        </div>
        {recentOrders.length === 0 ? (
          <p className="no-data">No orders yet.</p>
        ) : (
          <div className="simple-table-wrap">
            <table className="simple-table">
              <thead><tr><th>Order ID</th><th>Customer</th><th>Amount</th><th>Status</th></tr></thead>
              <tbody>
                {recentOrders.map((o) => (
                  <tr key={o._id}>
                    <td>#{o._id.slice(-6).toUpperCase()}</td>
                    <td>{o.customer?.name || 'Customer'}</td>
                    <td>{formatCurrency(o.totalAmount || 0)}</td>
                    <td><span className="status-pill">{o.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="dash-quick-actions" style={{ marginTop: '1.5rem' }}>
        <h2>Quick Actions</h2>
        <div className="quick-actions-grid">
          <Link to="/pharmacy/medicines" className="quick-action-card">
            <MdMedicalServices /><div><h3>Manage Medicines</h3><p>Add, edit or remove medicines</p></div><FiArrowRight className="quick-action-arrow" />
          </Link>
          <Link to="/pharmacy/orders" className="quick-action-card">
            <MdListAlt /><div><h3>Manage Orders</h3><p>Update order statuses</p></div><FiArrowRight className="quick-action-arrow" />
          </Link>
        </div>
      </div>
    </div>
  );
};
export default PharmacyDashboard;
