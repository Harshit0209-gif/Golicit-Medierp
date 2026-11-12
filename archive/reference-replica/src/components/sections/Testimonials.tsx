import { useCallback, useRef } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { testimonials, testimonialsSection } from '../../data/siteContent';
import { Lines } from '../ui/Lines';
import { Reveal } from '../ui/Reveal';
import './Testimonials.css';

function QuoteMark() {
  return (
    <svg className="testimonial__mark" viewBox="0 0 20 16" aria-hidden="true">
      <path
        fill="currentColor"
        d="M0 16V9.6C0 4.4 2.5 1.2 7.4 0l1 2.3C5.8 3.2 4.6 5 4.5 7.6h3.8V16H0Zm11.2 0V9.6c0-5.2 2.5-8.4 7.4-9.6l1 2.3c-2.6.9-3.8 2.7-3.9 5.3h3.8V16h-8.3Z"
      />
    </svg>
  );
}

export function Testimonials() {
  const trackRef = useRef<HTMLUListElement>(null);

  /** Scroll one card in the given direction, wrapping at either end. */
  const scrollByCard = useCallback((direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector<HTMLElement>('.testimonials__slide');
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    const step = (card?.offsetWidth ?? track.clientWidth) + gap;
    const maxScroll = track.scrollWidth - track.clientWidth;
    const atEnd = track.scrollLeft >= maxScroll - 4;
    const atStart = track.scrollLeft <= 4;

    if (direction === 1 && atEnd) track.scrollTo({ left: 0, behavior: 'smooth' });
    else if (direction === -1 && atStart) track.scrollTo({ left: maxScroll, behavior: 'smooth' });
    else track.scrollBy({ left: direction * step, behavior: 'smooth' });
  }, []);

  return (
    <section className="testimonials" aria-labelledby="testimonials-title">
      <div className="testimonials__inner container">
        <div className="testimonials__intro">
          <h2 id="testimonials-title" className="testimonials__title">
            <Lines lines={testimonialsSection.titleLines} />
          </h2>
          <div className="testimonials__controls">
            <button
              type="button"
              className="testimonials__arrow"
              aria-label="Previous testimonial"
              aria-controls="testimonials-track"
              onClick={() => scrollByCard(-1)}
            >
              <ArrowLeft aria-hidden="true" />
            </button>
            <button
              type="button"
              className="testimonials__arrow"
              aria-label="Next testimonial"
              aria-controls="testimonials-track"
              onClick={() => scrollByCard(1)}
            >
              <ArrowRight aria-hidden="true" />
            </button>
          </div>
        </div>

        <Reveal className="testimonials__viewport" delay={100}>
          <ul
            id="testimonials-track"
            ref={trackRef}
            className="testimonials__track"
            aria-roledescription="carousel"
            aria-label="Partner testimonials"
          >
            {testimonials.map((t, index) => (
              <li
                key={t.name}
                className="testimonials__slide"
                aria-roledescription="slide"
                aria-label={`${index + 1} of ${testimonials.length}`}
                data-placeholder={t.isPlaceholder || undefined}
              >
                <figure className="testimonial">
                  <QuoteMark />
                  <blockquote className="testimonial__quote">
                    <p>{t.quote}</p>
                  </blockquote>
                  <figcaption className="testimonial__author">
                    <img
                      className="testimonial__avatar"
                      src={t.avatar}
                      alt=""
                      width={52}
                      height={52}
                      loading="lazy"
                      decoding="async"
                    />
                    <span className="testimonial__meta">
                      <cite className="testimonial__name">{t.name}</cite>
                      <span className="testimonial__role">{t.role}</span>
                      {t.organisation && <span className="testimonial__role">{t.organisation}</span>}
                    </span>
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
