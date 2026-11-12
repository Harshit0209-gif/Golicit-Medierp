import { Link } from 'react-router';
import { ChevronRight } from 'lucide-react';
import { jobCountBySpecialty, jobs } from '../../data/jobs';
import { specialties } from '../../data/specialties';

// `specialties` is ordered by clinical grouping; the board ranks by count.
import styles from './Directory.module.css';

export type Audience = 'doctors' | 'hospitals';

const ROWS = 8;

/**
 * The hospital lobby directory board, used as the home page's primary navigation
 * into the job board (doctors) or the requirement form (hospitals).
 */
export function Directory({ audience }: { audience: Audience }) {
  const isDoctors = audience === 'doctors';

  const rows = [...specialties]
    .map((s) => ({
      ...s,
      count: isDoctors ? (jobCountBySpecialty[s.id] ?? 0) : s.availableSpecialists,
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, ROWS);

  return (
    <section className={styles.board} aria-labelledby="directory-title">
      <header className={styles.head}>
        <h2 id="directory-title" className={styles.title}>
          {isDoctors ? 'Openings by department' : 'Specialists ready to interview'}
        </h2>
        <Link className={styles.meta} to={isDoctors ? '/jobs' : '/hospitals#services'}>
          {isDoctors ? `All ${jobs.length} posts` : 'All roles we fill'}
        </Link>
      </header>

      {/* Re-keyed on audience so the rows animate in when the switch changes them. */}
      <ul role="list" className={styles.rows} key={audience}>
        {rows.map(({ id, name, icon: Icon, count }, index) => (
          <li key={id} style={{ '--i': index } as React.CSSProperties}>
            <Link
              className={styles.row}
              to={isDoctors ? `/jobs?specialty=${id}` : `/hospitals?specialty=${id}#requirement`}
            >
              <span className={styles.pictogram}>
                <Icon strokeWidth={2.2} aria-hidden="true" />
              </span>
              <span className={styles.name}>{name}</span>
              <span className={styles.count}>
                {count}
                <span className="visually-hidden">{isDoctors ? ' openings' : ' specialists available'}</span>
              </span>
              <ChevronRight className={styles.chevron} aria-hidden="true" />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
