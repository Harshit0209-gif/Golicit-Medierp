import { solutions, solutionsSection } from '../../data/siteContent';
import { Reveal } from '../ui/Reveal';
import { SectionHeading } from '../ui/SectionHeading';
import './Solutions.css';

export function Solutions() {
  return (
    <section className="solutions" aria-labelledby="solutions-title">
      <div className="solutions__inner container">
        <SectionHeading
          id="solutions-title"
          title={solutionsSection.title}
          subtitle={solutionsSection.subtitle}
        />

        <ul className="solutions__grid">
          {solutions.map(({ title, description, icon: Icon }, index) => (
            <Reveal as="li" key={title} className="solutions__item" delay={index * 80}>
              <article className="solution-card">
                <Icon className="solution-card__icon" strokeWidth={1.7} aria-hidden="true" />
                <h3 className="solution-card__title">{title}</h3>
                <p className="solution-card__text">{description}</p>
              </article>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
