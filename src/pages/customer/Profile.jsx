import { useState } from 'react';
import useAuthStore from '../../store/useAuthStore';
import { FiUser, FiMail, FiPhone, FiSave } from 'react-icons/fi';
import toast from 'react-hot-toast';
import './Profile.css';

const Profile = () => {
  const { user } = useAuthStore();
  const [form, setForm] = useState({ name: user?.name || '', email: user?.email || '', phone: user?.phone || '' });
  const [saving, setSaving] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      toast.success('Profile updated! (Demo — connect backend to persist)');
    }, 800);
  };

  return (
    <div className="profile-page">
      <div className="dash-page-header">
        <h1>My Profile</h1>
        <p>Manage your account information</p>
      </div>
      <div className="profile-layout">
        <div className="profile-avatar-card">
          <div className="profile-avatar">{user?.name?.[0]?.toUpperCase()}</div>
          <h2>{user?.name}</h2>
          <p>{user?.email}</p>
          <span className="profile-role">{user?.role}</span>
        </div>
        <form className="profile-form" onSubmit={handleSave}>
          <h2>Edit Information</h2>
          {[
            { icon: <FiUser />, label: 'Full Name', name: 'name', type: 'text' },
            { icon: <FiMail />, label: 'Email', name: 'email', type: 'email' },
            { icon: <FiPhone />, label: 'Phone', name: 'phone', type: 'tel' },
          ].map((field) => (
            <div key={field.name} className="form-group">
              <label htmlFor={`profile-${field.name}`}>{field.label}</label>
              <div className="input-wrap">
                {field.icon}
                <input id={`profile-${field.name}`} name={field.name} type={field.type}
                  value={form[field.name]}
                  onChange={(e) => setForm({ ...form, [field.name]: e.target.value })} />
              </div>
            </div>
          ))}
          <button type="submit" className="btn btn--primary" disabled={saving}>
            <FiSave /> {saving ? 'Saving…' : 'Save Changes'}
          </button>
        </form>
      </div>
    </div>
  );
};
export default Profile;
