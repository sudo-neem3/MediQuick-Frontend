import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../../store/useAuthStore';
import { validateRegisterForm } from '../../utils/validators';
import { MdLocalPharmacy } from 'react-icons/md';
import { FiUser, FiMail, FiLock, FiPhone, FiEye, FiEyeOff } from 'react-icons/fi';
import toast from 'react-hot-toast';
import './Auth.css';

const ROLES = [
  { value: 'customer', label: '🛒 Customer', desc: 'Order medicines' },
  { value: 'pharmacy', label: '💊 Pharmacy', desc: 'Sell medicines' },
];

const Register = () => {
  const { register, isLoading } = useAuthStore();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', phone: '', role: 'customer' });
  const [errors, setErrors] = useState({});
  const [showPass, setShowPass] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validateRegisterForm(form);
    if (Object.keys(errs).length) { setErrors(errs); return; }
    const result = await register(form);
    if (result.success) {
      toast.success('Account created! Welcome 🎉');
      if (result.role === 'admin') navigate('/admin');
      else if (result.role === 'pharmacy') navigate('/pharmacy');
      else navigate('/customer');
    } else {
      toast.error(result.message);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card auth-card--wide">
        <div className="auth-card__header">
          <Link to="/" className="auth-logo"><MdLocalPharmacy /> MediQuick</Link>
          <h1>Create account</h1>
          <p>Join thousands of happy customers</p>
        </div>

        {/* Role selector */}
        <div className="role-selector">
          {ROLES.map((r) => (
            <button key={r.value} type="button"
              className={`role-btn ${form.role === r.value ? 'active' : ''}`}
              onClick={() => setForm({ ...form, role: r.value })}>
              <span>{r.label}</span>
              <small>{r.desc}</small>
            </button>
          ))}
        </div>

        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <div className="input-wrap">
                <FiUser className="input-icon" />
                <input id="name" name="name" type="text" placeholder="Ahmed Ali"
                  value={form.name} onChange={handleChange} className={errors.name ? 'error' : ''} />
              </div>
              {errors.name && <span className="form-error">{errors.name}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone (optional)</label>
              <div className="input-wrap">
                <FiPhone className="input-icon" />
                <input id="phone" name="phone" type="tel" placeholder="03001234567"
                  value={form.phone} onChange={handleChange} className={errors.phone ? 'error' : ''} />
              </div>
              {errors.phone && <span className="form-error">{errors.phone}</span>}
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="reg-email">Email</label>
            <div className="input-wrap">
              <FiMail className="input-icon" />
              <input id="reg-email" name="email" type="email" placeholder="you@example.com"
                value={form.email} onChange={handleChange} className={errors.email ? 'error' : ''} />
            </div>
            {errors.email && <span className="form-error">{errors.email}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="reg-password">Password</label>
            <div className="input-wrap">
              <FiLock className="input-icon" />
              <input id="reg-password" name="password" type={showPass ? 'text' : 'password'}
                placeholder="At least 6 characters" value={form.password} onChange={handleChange}
                className={errors.password ? 'error' : ''} />
              <button type="button" className="input-toggle" onClick={() => setShowPass((s) => !s)}>
                {showPass ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
            {errors.password && <span className="form-error">{errors.password}</span>}
          </div>
          <button type="submit" className="btn btn--primary btn--full" disabled={isLoading}>
            {isLoading ? 'Creating account…' : 'Create Account'}
          </button>
        </form>
        <p className="auth-card__footer">
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
