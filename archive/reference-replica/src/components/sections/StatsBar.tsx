import { stats } from '../../data/siteContent';
import './StatsBar.css';

export function StatsBar() {
  return (
    <section className="stats" aria-label="MedRecruit in numbers">
      <ul className="stats__bar container">
        {stats.map(({ value, label, icon: Icon }) => (
          <li key={label} className="stats__item">
            <Icon className="stats__icon" strokeWidth={1.9} aria-hidden="true" />
            <div className="stats__text">
              <span className="stats__value">{value}</span>
              <span className="stats__label">{label}</span>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
