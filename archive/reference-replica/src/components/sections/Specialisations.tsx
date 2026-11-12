import { specialisations, specialisationsSection } from '../../data/siteContent';
import { ButtonLink } from '../ui/ButtonLink';
import { Reveal } from '../ui/Reveal';
import { SectionHeading } from '../ui/SectionHeading';
import './Specialisations.css';

export function Specialisations() {
  return (
    <section id="specialisations" className="specs" aria-labelledby="specs-title">
      <SectionHeading
        id="specs-title"
        className="container"
        title={specialisationsSection.title}
        subtitle={specialisationsSection.subtitle}
      />

      <ul className="specs__grid container">
        {specialisations.map((spec, index) => {
          const Icon = spec.icon;
          return (
            <Reveal as="li" key={spec.name} className="specs__item" delay={index * 50}>
              <article className="spec-card">
                <div className="spec-card__media">
                  <img
                    src={spec.image}
                    alt={spec.imageAlt}
                    width={480}
                    height={320}
                    loading="lazy"
                    decoding="async"
                    style={spec.focus ? { objectPosition: spec.focus } : undefined}
                  />
                </div>
                <div className="spec-card__body">
                  <Icon className="spec-card__icon" strokeWidth={1.8} aria-hidden="true" />
                  <div className="spec-card__text">
                    <h3 className="spec-card__name">{spec.name}</h3>
                    <p className="spec-card__jobs">{spec.jobs}</p>
                  </div>
                </div>
              </article>
            </Reveal>
          );
        })}
      </ul>

      <div className="specs__cta">
        <ButtonLink href={specialisationsSection.cta.href} variant="outline" arrow className="specs__btn">
          {specialisationsSection.cta.label}
        </ButtonLink>
      </div>
    </section>
  );
}
