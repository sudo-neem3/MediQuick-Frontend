import { Navigate } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';

// Redirects to login if not authenticated
export const ProtectedRoute = ({ children, role }) => {
  const { user, token } = useAuthStore();
  if (!token) return <Navigate to="/login" replace />;
  if (role && user?.role !== role) return <Navigate to="/" replace />;
  return children;
};

// Redirects logged-in users away from /login and /register
export const GuestRoute = ({ children }) => {
  const { token, user } = useAuthStore();
  if (!token) return children;
  if (user?.role === 'admin') return <Navigate to="/admin" replace />;
  if (user?.role === 'pharmacy') return <Navigate to="/pharmacy" replace />;
  return <Navigate to="/customer" replace />;
};
