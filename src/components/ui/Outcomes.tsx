import { outcomes } from '../../data/content';
import styles from './Outcomes.module.css';

/** Three outcome figures (SAMPLE data) set as a ruled row. */
export function Outcomes({ inverse = false }: { inverse?: boolean }) {
  return (
    <dl className={`${styles.list} ${inverse ? styles.inverse : ''}`}>
      {outcomes.map((o) => (
        <div key={o.label} className={styles.item}>
          <dt className={styles.label}>{o.label}</dt>
          <dd className={styles.value}>{o.value}</dd>
        </div>
      ))}
    </dl>
  );
}
