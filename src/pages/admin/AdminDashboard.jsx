import { useEffect } from 'react';
import useAdminStore from '../../store/useAdminStore';
import StatCard from '../../components/StatCard/StatCard';
import Spinner from '../../components/Spinner/Spinner';
import { MdGroup, MdLocalPharmacy, MdShoppingBag, MdAttachMoney } from 'react-icons/md';
import { formatCurrency } from '../../utils/validators';
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const { stats, users, pharmacies, orders, isLoading, fetchStats, fetchUsers, fetchPharmacies, fetchOrders } = useAdminStore();

  useEffect(() => {
    fetchStats();
    fetchUsers();
    fetchPharmacies();
    fetchOrders();
  }, []);

  if (isLoading && !stats.totalUsers) return <Spinner text="Loading admin panel..." />;

  const pendingPharmacies = pharmacies.filter((p) => !p.isApproved);

  return (
    <div className="admin-dash">
      <div className="dash-page-header">
        <h1>Admin Dashboard</h1>
        <p>Platform overview and management</p>
      </div>

      <div className="stats-grid">
        <StatCard icon={<MdGroup />} label="Total Users" value={users.length || stats.totalUsers} color="#63b3ed" />
        <StatCard icon={<MdLocalPharmacy />} label="Pharmacies" value={pharmacies.length || stats.totalPharmacies} color="#10b981" />
        <StatCard icon={<MdShoppingBag />} label="Total Orders" value={orders.length || stats.totalOrders} color="#a78bfa" />
        <StatCard icon={<MdAttachMoney />} label="Revenue" value={formatCurrency(stats.totalRevenue || 0)} color="#f59e0b" />
      </div>

      {pendingPharmacies.length > 0 && (
        <div className="admin-alert">
          <span>⚠️ {pendingPharmacies.length} pharmacy awaiting approval</span>
          <Link to="/admin/pharmacies" className="see-all">Review <FiArrowRight /></Link>
        </div>
      )}

      <div className="admin-grid">
        <div className="dash-section">
          <div className="dash-section-header">
            <h2>Recent Users</h2>
            <Link to="/admin/users" className="see-all">View all <FiArrowRight /></Link>
          </div>
          <div className="simple-table-wrap">
            <table className="simple-table">
              <thead><tr><th>Name</th><th>Email</th><th>Role</th></tr></thead>
              <tbody>
                {users.slice(0, 5).map((u) => (
                  <tr key={u._id}>
                    <td>{u.name}</td>
                    <td>{u.email}</td>
                    <td><span className="status-pill">{u.role}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="dash-section">
          <div className="dash-section-header">
            <h2>Recent Orders</h2>
            <Link to="/admin/orders" className="see-all">View all <FiArrowRight /></Link>
          </div>
          <div className="simple-table-wrap">
            <table className="simple-table">
              <thead><tr><th>Order ID</th><th>Amount</th><th>Status</th></tr></thead>
              <tbody>
                {orders.slice(0, 5).map((o) => (
                  <tr key={o._id}>
                    <td>#{o._id.slice(-6).toUpperCase()}</td>
                    <td>{formatCurrency(o.totalAmount || 0)}</td>
                    <td><span className="status-pill">{o.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AdminDashboard;
