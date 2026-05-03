import './StatCard.css';

const StatCard = ({ icon, label, value, color = 'var(--primary)', trend }) => (
  <div className="stat-card" style={{ '--card-color': color }}>
    <div className="stat-card__icon">{icon}</div>
    <div className="stat-card__body">
      <span className="stat-card__label">{label}</span>
      <span className="stat-card__value">{value}</span>
      {trend !== undefined && (
        <span className={`stat-card__trend ${trend >= 0 ? 'up' : 'down'}`}>
          {trend >= 0 ? '▲' : '▼'} {Math.abs(trend)}%
        </span>
      )}
    </div>
  </div>
);

export default StatCard;
