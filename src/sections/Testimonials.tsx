import { testimonials, type Testimonial } from '../data/content';
import { Reveal } from '../components/Reveal';
import styles from './Testimonials.module.css';

/** Initials from the role, e.g. "Medical Director" → "MD". Placeholder people get no photos. */
const initials = (role: string) =>
  role
    .split(' ')
    .filter((w) => /^[A-Z]/.test(w))
    .slice(0, 2)
    .map((w) => w[0])
    .join('');

function QuoteMark({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 36" aria-hidden="true">
      <path
        fill="currentColor"
        d="M0 36V22.4C0 9.6 6.2 2.1 18.6 0l1.9 4.6C13.7 6.5 10.3 10.6 10 17h9.2v19H0Zm27.5 0V22.4C27.5 9.6 33.7 2.1 46.1 0L48 4.6C41.2 6.5 37.8 10.6 37.5 17h9.2v19H27.5Z"
      />
    </svg>
  );
}

function Person({ t, inverse = false }: { t: Testimonial; inverse?: boolean }) {
  return (
    <figcaption className={`${styles.person} ${inverse ? styles.personInverse : ''}`}>
      <span className={styles.avatar} aria-hidden="true">
        {initials(t.role)}
      </span>
      <span className={styles.who}>
        <span className={styles.role}>{t.role}</span>
        <span className={styles.setting}>{t.setting}</span>
      </span>
      <span className={styles.tag}>{t.audience}</span>
    </figcaption>
  );
}

export function Testimonials() {
  const [featured, ...rest] = testimonials;

  return (
    <section id="testimonials" className={`${styles.section} wm`} aria-labelledby="testimonials-title">
      <div className="wrap">
        <header className={styles.head}>
          <div>
            <p className="marker">Testimonials</p>
            <h2 id="testimonials-title" className={styles.title}>
              What our clients and candidates say.
            </h2>
          </div>
          <p className={styles.intro}>
            Hospitals, medical colleges and clinicians on what it is like to recruit, and be recruited, with
            MedRecruit.
          </p>
        </header>

        <ul role="list" className={styles.grid}>
          <Reveal as="li" className={styles.featuredItem}>
            <figure className={styles.featured}>
              <QuoteMark className={styles.markLarge} />
              <blockquote className={styles.featuredQuote}>
                <p>{featured.quote}</p>
              </blockquote>
              <div className={styles.outcome}>
                <span className={styles.outcomeValue}>{featured.outcome.value}</span>
                <span className={styles.outcomeLabel}>{featured.outcome.label}</span>
              </div>
              <Person t={featured} inverse />
            </figure>
          </Reveal>

          {rest.map((t, i) => (
            <Reveal as="li" key={t.role} className={styles.item} delay={(i + 1) * 110}>
              <figure className={styles.card}>
                <QuoteMark className={styles.mark} />
                <blockquote className={styles.quote}>
                  <p>{t.quote}</p>
                </blockquote>
                <p className={styles.result}>
                  <span>{t.outcome.value}</span> {t.outcome.label}
                </p>
                <Person t={t} />
              </figure>
            </Reveal>
          ))}
        </ul>

        <p className={styles.note}>
          Placeholder testimonials shown for layout. They will be replaced with client-approved quotes and verified
          results.
        </p>
      </div>
    </section>
  );
}
