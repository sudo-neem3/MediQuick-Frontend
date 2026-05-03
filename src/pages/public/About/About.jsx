import { MdLocalPharmacy, MdVerified, MdGroup, MdStar } from 'react-icons/md';
import './About.css';

const team = [
  { name: 'Ahmed Ali', role: 'Full Stack Developer', initial: 'A' },
  { name: 'Sara Khan', role: 'UI/UX Designer', initial: 'S' },
  { name: 'Bilal Raza', role: 'Backend Engineer', initial: 'B' },
];

const About = () => (
  <div className="about-page">
    <section className="about-hero">
      <div className="about-hero__badge"><MdLocalPharmacy /> MediQuick</div>
      <h1>Reimagining Healthcare <br /><span className="gradient-text">Delivery in Pakistan</span></h1>
      <p>MediQuick is an academic MERN-stack project connecting patients with licensed pharmacies for safe, fast, and affordable medicine delivery.</p>
    </section>

    <section className="about-values">
      {[
        { icon: <MdVerified />, title: 'Verified Pharmacies', desc: 'Every pharmacy is manually reviewed and approved by our admin team before going live.' },
        { icon: <MdGroup />, title: 'Community Focused', desc: 'Built for Pakistan — understanding local healthcare needs, languages, and preferences.' },
        { icon: <MdStar />, title: 'Quality Assured', desc: 'We maintain strict quality standards ensuring only genuine medicines are listed.' },
      ].map((v) => (
        <div key={v.title} className="value-card">
          <div className="value-card__icon">{v.icon}</div>
          <h3>{v.title}</h3>
          <p>{v.desc}</p>
        </div>
      ))}
    </section>

    <section className="about-team">
      <h2>Our Team</h2>
      <div className="team-grid">
        {team.map((m) => (
          <div key={m.name} className="team-card">
            <div className="team-card__avatar">{m.initial}</div>
            <h3>{m.name}</h3>
            <p>{m.role}</p>
          </div>
        ))}
      </div>
    </section>
  </div>
);
export default About;
