import { audienceCards } from '../../data/siteContent';
import institutionImage from '../../assets/images/institutions-hospital.jpg';
import doctorImage from '../../assets/images/professional-doctor.jpg';
import { ButtonLink } from '../ui/ButtonLink';
import { Lines } from '../ui/Lines';
import { Reveal } from '../ui/Reveal';
import './AudienceCards.css';

export function AudienceCards() {
  const { institutions, professionals } = audienceCards;

  return (
    <section className="audience" aria-label="Who we work with">
      <div className="audience__grid container">
        <Reveal
          as="article"
          id={institutions.id}
          className="audience-card audience-card--institutions"
          aria-labelledby="audience-institutions-title"
        >
          <div className="audience-card__media">
            <img
              src={institutionImage}
              alt="Modern glass and brick hospital building surrounded by trees"
              width={540}
              height={388}
              loading="lazy"
              decoding="async"
            />
          </div>
          <div className="audience-card__content">
            <p className="audience-card__eyebrow">{institutions.eyebrow}</p>
            <h2 id="audience-institutions-title" className="audience-card__title">
              <Lines lines={institutions.titleLines} />
            </h2>
            <p className="audience-card__text">{institutions.description}</p>
            <ButtonLink href={institutions.cta.href} variant="teal" arrow className="audience-card__btn">
              {institutions.cta.label}
            </ButtonLink>
          </div>
        </Reveal>

        <Reveal
          as="article"
          id={professionals.id}
          className="audience-card audience-card--professionals"
          aria-labelledby="audience-professionals-title"
          delay={120}
        >
          <div className="audience-card__content">
            <p className="audience-card__eyebrow">{professionals.eyebrow}</p>
            <h2 id="audience-professionals-title" className="audience-card__title">
              <Lines lines={professionals.titleLines} />
            </h2>
            <p className="audience-card__text">{professionals.description}</p>
            <ButtonLink href={professionals.cta.href} variant="teal" arrow className="audience-card__btn">
              {professionals.cta.label}
            </ButtonLink>
          </div>
          <div className="audience-card__media">
            <img
              src={doctorImage}
              alt="Smiling female doctor in a white coat with a stethoscope"
              width={640}
              height={960}
              loading="lazy"
              decoding="async"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
