import type { ReactNode } from 'react';
import styles from './SectionHeader.module.css';

interface SectionHeaderProps {
  id?: string;
  title: ReactNode;
  intro?: ReactNode;
  action?: ReactNode;
  className?: string;
}

/** Left-aligned section title with optional intro and a trailing action. */
export function SectionHeader({ id, title, intro, action, className = '' }: SectionHeaderProps) {
  return (
    <header className={`${styles.header} ${className}`}>
      <div className={styles.text}>
        <h2 id={id} className={styles.title}>
          {title}
        </h2>
        {intro && <p className={styles.intro}>{intro}</p>}
      </div>
      {action && <div className={styles.action}>{action}</div>}
    </header>
  );
}
