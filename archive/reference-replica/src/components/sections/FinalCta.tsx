import { Users } from 'lucide-react';
import { finalCta } from '../../data/siteContent';
import stethoscopeImage from '../../assets/images/cta-stethoscope.jpg';
import { ButtonLink } from '../ui/ButtonLink';
import './FinalCta.css';

export function FinalCta() {
  return (
    <section className="final-cta" aria-labelledby="final-cta-title">
      <div className="final-cta__dots" aria-hidden="true" />
      <img
        className="final-cta__art"
        src={stethoscopeImage}
        alt=""
        width={900}
        height={600}
        loading="lazy"
        decoding="async"
      />
      <div className="final-cta__inner container">
        <div className="final-cta__copy">
          <h2 id="final-cta-title" className="final-cta__title">
            {finalCta.title}
          </h2>
          <p className="final-cta__text">{finalCta.description}</p>
        </div>
        <div className="final-cta__actions">
          <ButtonLink href={finalCta.primary.href} variant="white" arrow className="final-cta__btn">
            {finalCta.primary.label}
          </ButtonLink>
          <ButtonLink
            href={finalCta.secondary.href}
            variant="outline-light"
            leadingIcon={<Users strokeWidth={2.1} />}
            className="final-cta__btn"
          >
            {finalCta.secondary.label}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
