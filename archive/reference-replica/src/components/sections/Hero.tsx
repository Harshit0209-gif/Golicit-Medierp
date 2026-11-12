import { Users } from 'lucide-react';
import { hero } from '../../data/siteContent';
import heroImage from '../../assets/images/hero-medical-team.jpg';
import { ButtonLink } from '../ui/ButtonLink';
import { Lines } from '../ui/Lines';
import './Hero.css';

export function Hero() {
  return (
    <section id="home" className="hero" aria-labelledby="hero-title">
      <div className="hero__decor" aria-hidden="true" />
      <div className="hero__media">
        <img
          src={heroImage}
          alt="A senior doctor in a white coat standing with three smiling healthcare colleagues in a hospital"
          width={1600}
          height={766}
          fetchPriority="high"
          decoding="async"
        />
      </div>

      <div className="hero__inner container">
        <div className="hero__content">
          <h1 id="hero-title" className="hero__title">
            <Lines lines={hero.titleLines} />{' '}
            <span className="hero__title-accent">{hero.titleAccent}</span>
          </h1>
          <p className="hero__description">{hero.description}</p>
          <div className="hero__actions">
            <ButtonLink href={hero.primaryCta.href} variant="navy" arrow className="hero__btn hero__btn--primary">
              {hero.primaryCta.label}
            </ButtonLink>
            <ButtonLink
              href={hero.secondaryCta.href}
              variant="outline"
              leadingIcon={<Users strokeWidth={2.2} />}
              className="hero__btn hero__btn--secondary"
            >
              {hero.secondaryCta.label}
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
