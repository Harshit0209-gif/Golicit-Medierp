import { about } from '../../data/siteContent';
import hospitalImage from '../../assets/images/about-hospital.jpg';
import { ButtonLink } from '../ui/ButtonLink';
import { Lines } from '../ui/Lines';
import { Reveal } from '../ui/Reveal';
import './About.css';

export function About() {
  return (
    <section id="about" className="about" aria-labelledby="about-title">
      <div className="about__inner container">
        <Reveal className="about__media">
          <img
            src={hospitalImage}
            alt="Modern multi-storey hospital building with a glass facade"
            width={1200}
            height={648}
            loading="lazy"
            decoding="async"
          />
        </Reveal>

        <Reveal className="about__content" delay={120}>
          <p className="about__eyebrow">{about.eyebrow}</p>
          <h2 id="about-title" className="about__title">
            <Lines lines={about.titleLines} />
          </h2>
          <p className="about__description">{about.description}</p>
          <ButtonLink href={about.cta.href} variant="teal" arrow className="about__btn">
            {about.cta.label}
          </ButtonLink>
        </Reveal>
      </div>
    </section>
  );
}
