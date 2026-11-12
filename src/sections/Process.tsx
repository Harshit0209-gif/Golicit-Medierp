import { useState } from 'react';
import { process } from '../data/content';
import { useInView } from '../hooks/useInView';
import styles from './Process.module.css';

type Track = keyof typeof process;

const tracks: { id: Track; label: string }[] = [
  { id: 'professionals', label: 'For medical professionals' },
  { id: 'institutions', label: 'For healthcare institutions' },
];

export function Process() {
  const [track, setTrack] = useState<Track>('professionals');
  const steps = process[track];
  const { ref, inView } = useInView<HTMLOListElement>({ rootMargin: '0px 0px -25% 0px' });

  return (
    <section id="process" className={`${styles.section} wm`} aria-labelledby="process-title">
      <div className="wrap">
        <header className={styles.head}>
          <p className="marker">How we work</p>
          <h2 id="process-title" className={styles.title}>
            One process, seen from both sides of the interview table.
          </h2>
          <div className={styles.switch} role="group" aria-label="Show the process for">
            {tracks.map((t) => (
              <button key={t.id} type="button" aria-pressed={track === t.id} onClick={() => setTrack(t.id)}>
                {t.label}
              </button>
            ))}
          </div>
        </header>

        {/* Re-keyed so the line redraws and the steps re-enter when the track changes. */}
        <ol
          ref={ref}
          role="list"
          className={`${styles.timeline} ${inView ? styles.in : ''}`}
          key={track}
          aria-live="polite"
        >
          {steps.map((step, i) => (
            <li key={step.title} className={styles.step} style={{ '--i': i } as React.CSSProperties}>
              <span className={styles.number} aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className={styles.node} aria-hidden="true" />
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.stepBody}>{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
