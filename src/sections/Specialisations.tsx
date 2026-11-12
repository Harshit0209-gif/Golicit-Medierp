import { useState } from 'react';
import { specialtyGroups } from '../data/content';
import { Arrow } from '../components/Action';
import { useEnquiry } from '../components/Enquiry';
import styles from './Specialisations.module.css';

const all = specialtyGroups.flatMap((g) => g.items.map((name) => ({ name, group: g.title })));

export function Specialisations() {
  const { open, audience } = useEnquiry();
  const [filter, setFilter] = useState('All');
  const shown = filter === 'All' ? all : all.filter((s) => s.group === filter);
  const tabs = [{ title: 'All', count: all.length }, ...specialtyGroups.map((g) => ({ title: g.title, count: g.items.length }))];

  return (
    <section id="specialisations" className={`${styles.section} wm wm-left`} aria-labelledby="specialisations-title">
      <div className="wrap">
        <header className={styles.head}>
          <div>
            <p className="marker">Specialisations</p>
            <h2 id="specialisations-title" className={styles.title}>
              Specialties we recruit for
            </h2>
          </div>
          <p className={styles.intro}>
            {all.length} disciplines, from residents to heads of department. Select a specialty to start an enquiry.
          </p>
        </header>

        <div className={styles.tabs} role="group" aria-label="Filter by practice area">
          {tabs.map((t) => (
            <button key={t.title} type="button" aria-pressed={filter === t.title} onClick={() => setFilter(t.title)}>
              {t.title}
              <span className={styles.count}>{t.count}</span>
            </button>
          ))}
        </div>

        {/* Re-keyed on the filter so the grid fades in with the new set. */}
        <ul role="list" className={styles.grid} key={filter} aria-live="polite">
          {shown.map((s, i) => (
            <li key={s.name} style={{ '--i': i } as React.CSSProperties}>
              <button type="button" className={styles.cell} onClick={() => open(audience, s.name)}>
                <span className={styles.text}>
                  <span className={styles.name}>{s.name}</span>
                  <span className={styles.group}>{s.group}</span>
                </span>
                <Arrow />
                <span className="visually-hidden">, start an enquiry</span>
              </button>
            </li>
          ))}
        </ul>

        <p className={styles.note}>
          Looking for a sub-specialty?{' '}
          <button type="button" className={styles.link} onClick={() => open(audience)}>
            Tell us what you need
          </button>
        </p>
      </div>
    </section>
  );
}
