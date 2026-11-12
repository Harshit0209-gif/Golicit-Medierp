import { Handshake, Hospital, Stethoscope, Users, type LucideIcon } from 'lucide-react';
import { figures, institutionTypes } from '../data/content';
import { useCountUp } from '../hooks/useCountUp';
import { useInView } from '../hooks/useInView';
import styles from './Credentials.module.css';

// One icon per figure, in the same order as `figures` in content.ts.
const icons: LucideIcon[] = [Hospital, Users, Handshake, Stethoscope];

function Figure({
  value,
  suffix,
  label,
  start,
  Icon,
}: {
  value: number;
  suffix: string;
  label: string;
  start: boolean;
  Icon: LucideIcon;
}) {
  const current = useCountUp(value, start);
  return (
    <div className={styles.figure}>
      <dt className={styles.label}>{label}</dt>
      <dd className={styles.value}>
        <Icon className={styles.icon} strokeWidth={1.5} aria-hidden="true" />
        <span aria-hidden="true">
          {current.toLocaleString('en-IN')}
          {suffix}
        </span>
        <span className="visually-hidden">
          {value.toLocaleString('en-IN')}
          {suffix}
        </span>
      </dd>
    </div>
  );
}

export function Credentials() {
  const { ref, inView } = useInView<HTMLDListElement>({ rootMargin: '0px 0px -20% 0px' });

  return (
    <section className={styles.section} aria-labelledby="credentials-title">
      <div className="wrap">
        <h2 id="credentials-title" className="visually-hidden">
          MedRecruit at a glance
        </h2>
        <div className={styles.panel}>
          <dl ref={ref} className={styles.figures}>
            {figures.map((f, i) => (
              <Figure key={f.label} {...f} Icon={icons[i]} start={inView} />
            ))}
          </dl>
          <p className={styles.footnote}>
            Figures are illustrative placeholders and will be replaced with verified data.
          </p>
        </div>

        <div className={styles.serve}>
          <p className={styles.serveTitle}>We recruit for</p>
          <ul role="list" className={styles.types}>
            {institutionTypes.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
