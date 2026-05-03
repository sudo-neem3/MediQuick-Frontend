import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// Layouts
import PublicLayout from './layouts/PublicLayout';
import DashboardLayout from './layouts/DashboardLayout';

// Route Guards
import { GuestRoute } from './routes/Guards';

// Public Pages
import Home from './pages/public/Home/Home';
import Medicines from './pages/public/Medicines/Medicines';
import About from './pages/public/About/About';
import Contact from './pages/public/Contact/Contact';
import NotFound from './pages/public/NotFound/NotFound';

// Auth Pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

// Customer Pages
import CustomerDashboard from './pages/customer/CustomerDashboard';
import CustomerOrders from './pages/customer/CustomerOrders';
import Cart from './pages/customer/Cart';
import Profile from './pages/customer/Profile';

// Pharmacy Pages
import PharmacyDashboard from './pages/pharmacy/PharmacyDashboard';
import PharmacyMedicines from './pages/pharmacy/PharmacyMedicines';
import PharmacyOrders from './pages/pharmacy/PharmacyOrders';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminUsers from './pages/admin/AdminUsers';
import AdminPharmacies from './pages/admin/AdminPharmacies';
import AdminOrders from './pages/admin/AdminOrders';

const App = () => (
  <BrowserRouter>
    <Toaster
      position="top-right"
      toastOptions={{
        style: { background: '#1a1f30', color: '#fff', border: '1px solid rgba(255,255,255,0.1)' },
        success: { iconTheme: { primary: '#10b981', secondary: '#fff' } },
        error: { iconTheme: { primary: '#ef4444', secondary: '#fff' } },
      }}
    />
    <Routes>
      {/* ── Public Routes ─────────────────────────────────── */}
      <Route element={<PublicLayout />}>
        <Route index element={<Home />} />
        <Route path="medicines" element={<Medicines />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
      </Route>

      {/* ── Auth Routes (guests only) ─────────────────────── */}
      <Route path="login" element={<GuestRoute><Login /></GuestRoute>} />
      <Route path="register" element={<GuestRoute><Register /></GuestRoute>} />

      {/* ── Customer Dashboard ───────────────────────────── */}
      <Route path="customer" element={<DashboardLayout role="customer" />}>
        <Route index element={<CustomerDashboard />} />
        <Route path="orders" element={<CustomerOrders />} />
        <Route path="cart" element={<Cart />} />
        <Route path="medicines" element={<Medicines />} />
        <Route path="profile" element={<Profile />} />
      </Route>

      {/* ── Pharmacy Dashboard ───────────────────────────── */}
      <Route path="pharmacy" element={<DashboardLayout role="pharmacy" />}>
        <Route index element={<PharmacyDashboard />} />
        <Route path="medicines" element={<PharmacyMedicines />} />
        <Route path="orders" element={<PharmacyOrders />} />
        <Route path="profile" element={<Profile />} />
      </Route>

      {/* ── Admin Dashboard ───────────────────────────────── */}
      <Route path="admin" element={<DashboardLayout role="admin" />}>
        <Route index element={<AdminDashboard />} />
        <Route path="users" element={<AdminUsers />} />
        <Route path="pharmacies" element={<AdminPharmacies />} />
        <Route path="orders" element={<AdminOrders />} />
      </Route>

      {/* ── Fallback ──────────────────────────────────────── */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

export default App;
