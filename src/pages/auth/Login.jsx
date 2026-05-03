import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../../store/useAuthStore';
import { validateLoginForm } from '../../utils/validators';
import { MdLocalPharmacy } from 'react-icons/md';
import { FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import toast from 'react-hot-toast';
import './Auth.css';

const Login = () => {
  const { login, isLoading } = useAuthStore();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [showPass, setShowPass] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validateLoginForm(form);
    if (Object.keys(errs).length) { setErrors(errs); return; }
    const result = await login(form);
    if (result.success) {
      toast.success('Welcome back!');
      if (result.role === 'admin') navigate('/admin');
      else if (result.role === 'pharmacy') navigate('/pharmacy');
      else navigate('/customer');
    } else {
      toast.error(result.message);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-card__header">
          <Link to="/" className="auth-logo"><MdLocalPharmacy /> MediQuick</Link>
          <h1>Welcome back</h1>
          <p>Sign in to your account</p>
        </div>
        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <div className="input-wrap">
              <FiMail className="input-icon" />
              <input id="email" name="email" type="email" placeholder="you@example.com"
                value={form.email} onChange={handleChange} className={errors.email ? 'error' : ''} />
            </div>
            {errors.email && <span className="form-error">{errors.email}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="input-wrap">
              <FiLock className="input-icon" />
              <input id="password" name="password" type={showPass ? 'text' : 'password'}
                placeholder="••••••••" value={form.password} onChange={handleChange}
                className={errors.password ? 'error' : ''} />
              <button type="button" className="input-toggle" onClick={() => setShowPass((s) => !s)}>
                {showPass ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
            {errors.password && <span className="form-error">{errors.password}</span>}
          </div>
          <button type="submit" className="btn btn--primary btn--full" disabled={isLoading}>
            {isLoading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>
        <p className="auth-card__footer">
          Don't have an account? <Link to="/register">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
