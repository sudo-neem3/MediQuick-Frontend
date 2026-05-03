import { FiMail, FiPhone, FiMapPin, FiClock } from 'react-icons/fi';
import './Contact.css';
import { useState } from 'react';
import toast from 'react-hot-toast';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) { toast.error('Please fill all fields'); return; }
    setSent(true);
    toast.success('Message sent! We\'ll reply within 24 hours.');
    setForm({ name: '', email: '', message: '' });
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <div className="contact-page">
      <div className="contact-page__header">
        <h1>Get in Touch</h1>
        <p>Have questions? We're here to help 24/7.</p>
      </div>
      <div className="contact-grid">
        <div className="contact-info">
          {[
            { icon: <FiMail />, label: 'Email', value: 'support@mediquick.pk' },
            { icon: <FiPhone />, label: 'Phone', value: '+92 300 1234567' },
            { icon: <FiMapPin />, label: 'Address', value: 'Model Town, Lahore, Pakistan' },
            { icon: <FiClock />, label: 'Hours', value: '24/7 Online Support' },
          ].map((item) => (
            <div key={item.label} className="contact-info__item">
              <div className="contact-info__icon">{item.icon}</div>
              <div>
                <p className="contact-info__label">{item.label}</p>
                <p className="contact-info__value">{item.value}</p>
              </div>
            </div>
          ))}
        </div>
        <form className="contact-form" onSubmit={handleSubmit}>
          <h2>Send a Message</h2>
          <div className="form-group">
            <label>Name</label>
            <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Your full name" id="contact-name" />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="you@example.com" id="contact-email" />
          </div>
          <div className="form-group">
            <label>Message</label>
            <textarea rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
              placeholder="How can we help?" id="contact-message" />
          </div>
          <button type="submit" className="btn btn--primary btn--full" disabled={sent}>
            {sent ? '✓ Message Sent!' : 'Send Message'}
          </button>
        </form>
      </div>
    </div>
  );
};
export default Contact;
