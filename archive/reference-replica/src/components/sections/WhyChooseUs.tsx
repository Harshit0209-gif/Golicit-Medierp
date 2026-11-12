import { whyChooseUs } from '../../data/siteContent';
import { Reveal } from '../ui/Reveal';
import './WhyChooseUs.css';

export function WhyChooseUs() {
  return (
    <section className="why" aria-labelledby="why-title">
      <Reveal className="why__panel container">
        <div className="why__intro">
          <h2 id="why-title" className="why__title">
            {whyChooseUs.title}
          </h2>
          <p className="why__description">{whyChooseUs.description}</p>
        </div>

        <ul className="why__list">
          {whyChooseUs.benefits.map(({ lines, icon: Icon }) => (
            <li key={lines.join(' ')} className="why__item">
              <Icon className="why__icon" strokeWidth={1.6} aria-hidden="true" />
              <span className="why__label">
                {lines[0]}
                <br />
                {lines[1]}
              </span>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
