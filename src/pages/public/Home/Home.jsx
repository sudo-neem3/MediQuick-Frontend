import { Link } from 'react-router-dom';
import { MdLocalPharmacy, MdDeliveryDining, MdVerified, MdSupportAgent } from 'react-icons/md';
import { FiArrowRight } from 'react-icons/fi';
import './Home.css';

const features = [
  { icon: <MdLocalPharmacy />, title: 'Genuine Medicines', desc: 'All products sourced from licensed pharmacies with verified quality checks.' },
  { icon: <MdDeliveryDining />, title: 'Fast Delivery', desc: 'Same-day delivery available in major cities. Track your order live.' },
  { icon: <MdVerified />, title: 'Verified Pharmacies', desc: 'Every pharmacy on our platform is licensed and admin-verified.' },
  { icon: <MdSupportAgent />, title: '24/7 Support', desc: 'Our support team is available round the clock to assist you.' },
];

const categories = ['Antibiotics', 'Analgesics', 'Vitamins', 'Cardiovascular', 'Diabetes', 'Respiratory'];

const Home = () => (
  <div className="home">
    {/* Hero */}
    <section className="hero">
      <div className="hero__content">
        <div className="hero__badge">🏥 Trusted Online Pharmacy</div>
        <h1 className="hero__title">
          Medicines Delivered <br />
          <span className="gradient-text">Fast & Safely</span>
        </h1>
        <p className="hero__desc">
          Order from verified pharmacies across Pakistan. Genuine medicines,
          transparent pricing, and doorstep delivery.
        </p>
        <div className="hero__actions">
          <Link to="/medicines" className="btn btn--primary">
            Browse Medicines <FiArrowRight />
          </Link>
          <Link to="/register" className="btn btn--ghost">
            Get Started Free
          </Link>
        </div>
        <div className="hero__stats">
          <div><strong>500+</strong><span>Medicines</span></div>
          <div className="divider" />
          <div><strong>50+</strong><span>Pharmacies</span></div>
          <div className="divider" />
          <div><strong>10k+</strong><span>Happy Customers</span></div>
        </div>
      </div>
      <div className="hero__visual">
        <div className="hero__orb hero__orb--1" />
        <div className="hero__orb hero__orb--2" />
        <div className="hero__pill-card">
          <MdLocalPharmacy className="hero__pill-icon" />
          <p>MediQuick</p>
          <span>Your Health Partner</span>
        </div>
      </div>
    </section>

    {/* Categories */}
    <section className="section home__cats">
      <div className="section__header">
        <h2>Browse by Category</h2>
        <Link to="/medicines" className="see-all">See all <FiArrowRight /></Link>
      </div>
      <div className="cats__grid">
        {categories.map((c) => (
          <Link key={c} to={`/medicines?category=${c}`} className="cat-card">
            <MdLocalPharmacy />
            <span>{c}</span>
          </Link>
        ))}
      </div>
    </section>

    {/* Features */}
    <section className="section home__features">
      <div className="section__header centered">
        <h2>Why Choose MediQuick?</h2>
        <p>Everything you need from a pharmacy, now online.</p>
      </div>
      <div className="features__grid">
        {features.map((f) => (
          <div key={f.title} className="feature-card">
            <div className="feature-card__icon">{f.icon}</div>
            <h3>{f.title}</h3>
            <p>{f.desc}</p>
          </div>
        ))}
      </div>
    </section>

    {/* CTA */}
    <section className="section home__cta">
      <div className="cta-box">
        <h2>Ready to order your medicines?</h2>
        <p>Sign up in seconds. No prescription required for OTC medicines.</p>
        <Link to="/register" className="btn btn--primary">
          Create Free Account <FiArrowRight />
        </Link>
      </div>
    </section>
  </div>
);

export default Home;
