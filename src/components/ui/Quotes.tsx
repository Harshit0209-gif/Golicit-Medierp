import type { Testimonial } from '../../data/content';
import styles from './Quotes.module.css';

/** Testimonials set as quotations under a heavy rule, not boxed in cards. */
export function Quotes({ items }: { items: Testimonial[] }) {
  return (
    <ul role="list" className={styles.quotes}>
      {items.map((t) => (
        <li key={t.name}>
          <figure className={styles.quote}>
            <p className={styles.outcome}>{t.outcome}</p>
            <blockquote>
              <p>{t.quote}</p>
            </blockquote>
            <figcaption className={styles.person}>
              <img src={t.avatar} alt="" width={56} height={56} loading="lazy" decoding="async" />
              <span>
                <span className={styles.name}>{t.name}</span>
                <span className={styles.role}>{t.role}</span>
              </span>
            </figcaption>
          </figure>
        </li>
      ))}
    </ul>
  );
}
