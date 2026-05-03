import { Outlet, Navigate, NavLink, useNavigate } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';
import { MdLocalPharmacy, MdDashboard, MdMedicalServices, MdListAlt, MdLogout } from 'react-icons/md';
import { FiUser } from 'react-icons/fi';
import './DashboardLayout.css';

const DashboardLayout = ({ role }) => {
  const { user, logout, isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  if (!isAuthenticated()) return <Navigate to="/login" replace />;
  if (role && user?.role !== role) return <Navigate to="/" replace />;

  const navItems = {
    customer: [
      { to: '/customer', label: 'Dashboard', icon: <MdDashboard /> },
      { to: '/customer/medicines', label: 'Browse Medicines', icon: <MdMedicalServices /> },
      { to: '/customer/orders', label: 'My Orders', icon: <MdListAlt /> },
      { to: '/customer/profile', label: 'Profile', icon: <FiUser /> },
    ],
    pharmacy: [
      { to: '/pharmacy', label: 'Dashboard', icon: <MdDashboard /> },
      { to: '/pharmacy/medicines', label: 'Medicines', icon: <MdMedicalServices /> },
      { to: '/pharmacy/orders', label: 'Orders', icon: <MdListAlt /> },
      { to: '/pharmacy/profile', label: 'Profile', icon: <FiUser /> },
    ],
    admin: [
      { to: '/admin', label: 'Dashboard', icon: <MdDashboard /> },
      { to: '/admin/users', label: 'Users', icon: <FiUser /> },
      { to: '/admin/pharmacies', label: 'Pharmacies', icon: <MdLocalPharmacy /> },
      { to: '/admin/orders', label: 'All Orders', icon: <MdListAlt /> },
    ],
  };

  const items = navItems[user?.role] || [];

  const handleLogout = () => { logout(); navigate('/login'); };

  return (
    <div className="dash-layout">
      <aside className="dash-sidebar">
        <div className="dash-sidebar__logo">
          <MdLocalPharmacy />
          <span>Medi<b>Quick</b></span>
        </div>
        <nav className="dash-sidebar__nav">
          {items.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.to.split('/').length === 2} className="dash-sidebar__link">
              {item.icon}
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
        <div className="dash-sidebar__footer">
          <div className="dash-sidebar__user">
            <div className="dash-sidebar__avatar">{user?.name?.[0]?.toUpperCase()}</div>
            <div>
              <p className="dash-sidebar__uname">{user?.name}</p>
              <p className="dash-sidebar__urole">{user?.role}</p>
            </div>
          </div>
          <button className="dash-sidebar__logout" onClick={handleLogout}><MdLogout /></button>
        </div>
      </aside>
      <div className="dash-content">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
