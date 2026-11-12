import { Link } from 'react-router';
import { brand } from '../../data/content';
import styles from './Logo.module.css';

/**
 * A wayfinding sign: a medical cross whose right arm points the way.
 */
export function LogoMark({ inverse = false, size = 40 }: { inverse?: boolean; size?: number }) {
  const plate = inverse ? 'var(--signal)' : 'var(--theatre)';
  const mark = inverse ? 'var(--theatre)' : 'var(--signal)';
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" aria-hidden="true" className={styles.mark}>
      <rect width="40" height="40" rx="10" fill={plate} />
      <rect x="15.5" y="8" width="9" height="24" rx="1.5" fill={mark} />
      <rect x="7" y="15.5" width="11" height="9" rx="1.5" fill={mark} />
      <path d="M23 15.5h3.2V11l8 9-8 9v-4.5H23z" fill={mark} />
    </svg>
  );
}

export function Logo({ inverse = false }: { inverse?: boolean }) {
  return (
    <Link to="/" className={`${styles.logo} ${inverse ? styles.inverse : ''}`} aria-label={`${brand.name} home`}>
      <LogoMark inverse={inverse} />
      <span className={styles.word} aria-hidden="true">
        {brand.name}
      </span>
    </Link>
  );
}
