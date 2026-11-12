import { brand } from '../data/content';
import styles from './Logo.module.css';

/** Wordmark: a fine-ruled seal with a medical cross, beside the serif name. */
export function Logo({ tone = 'dark' }: { tone?: 'dark' | 'light' }) {
  return (
    <a href="#top" className={`${styles.logo} ${styles[tone]}`} aria-label={`${brand.name}, back to top`}>
      <svg className={styles.mark} viewBox="0 0 36 36" aria-hidden="true">
        <circle cx="18" cy="18" r="17" fill="none" stroke="currentColor" strokeWidth="1.2" />
        <circle cx="18" cy="18" r="13" fill="none" stroke="var(--champagne)" strokeWidth="0.8" />
        <path d="M16.2 10.5h3.6v5.7h5.7v3.6h-5.7v5.7h-3.6v-5.7h-5.7v-3.6h5.7z" fill="currentColor" />
      </svg>
      <span className={styles.text} aria-hidden="true">
        <span className={styles.name}>{brand.name}</span>
        <span className={styles.descriptor}>{brand.descriptor}</span>
      </span>
    </a>
  );
}
