import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import type { CountrySnapshot, WireItem } from '../../data/market';
import styles from './Hero.module.css';

const fmt = new Intl.NumberFormat('en-US');
const ROWS = 3;
const TICK_MS = 3200;
const STAMPS_LIVE = ['now', '1m', '3m', '6m', '9m'];
const STAMPS_COUNTRY = ['12m', '47m', '2h', '5h', '9h'];

interface WireProps {
  items: WireItem[];
  /** The country the hero is showing, or null for Worldwide. */
  country: CountrySnapshot | null;
  onClear: () => void;
}

/** Live feed of the newest openings; filters to the selected country. */
export function Wire({ items, country, onClear }: WireProps) {
  const reduced = useReducedMotion();
  const [offset, setOffset] = useState(0);
  const [paused, setPaused] = useState(false);
  const [engaged, setEngaged] = useState(false); // pointer or focus inside the feed
  const n = items.length;

  const running = !country && !paused && !engaged && !reduced && n > ROWS;

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => setOffset((o) => (o - 1 + n) % n), TICK_MS);
    return () => clearInterval(id);
  }, [running, n]);

  const feed = country
    ? items.filter((i) => i.countryCode === country.code).slice(0, ROWS)
    : Array.from({ length: Math.min(ROWS, n) }, (_, i) => items[(offset + i) % n]);
  const stamps = country ? STAMPS_COUNTRY : STAMPS_LIVE;

  return (
    <section className={styles.wire} aria-labelledby="wire-title">
      <header className={styles.wireHead}>
        <h2 id="wire-title" className={styles.wireTitle}>
          The wire
        </h2>
        {country ? (
          <button type="button" className={styles.chip} onClick={onClear} aria-label="Clear country filter">
            {country.name} <span aria-hidden="true">×</span>
          </button>
        ) : (
          !reduced && (
            <button type="button" className={styles.ghost} onClick={() => setPaused((p) => !p)} aria-pressed={paused}>
              {paused ? 'Resume' : 'Pause'}
            </button>
          )
        )}
      </header>

      <div
        className={styles.feed}
        onMouseEnter={() => setEngaged(true)}
        onMouseLeave={() => setEngaged(false)}
        onFocus={() => setEngaged(true)}
        onBlur={(e) => !e.currentTarget.contains(e.relatedTarget as Node) && setEngaged(false)}
      >
        {feed.length === 0 && country ? (
          <p className={styles.empty}>
            Nothing new from {country.name} in the last hour. {fmt.format(country.live)} jobs are listed there.{' '}
            <a href={`/openings?country=${encodeURIComponent(country.name)}`}>See them</a>
          </p>
        ) : (
          <ul role="list" className={styles.rows}>
            <AnimatePresence mode="popLayout" initial={false}>
              {feed.map((item, i) => (
                <motion.li
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: -12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35 }}
                >
                  <a className={styles.row} href={`/openings/${item.id}`}>
                    <span className={styles.stamp}>{stamps[i]}</span>
                    <span className={styles.rowMain}>
                      <span className={styles.rowTitle}>{item.title}</span>
                      <span className={styles.rowEmployer}>{item.employer}</span>
                    </span>
                    <span className={styles.rowMeta}>
                      <span className={styles.rowCode}>{item.countryCode}</span>
                    </span>
                  </a>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        )}
      </div>
    </section>
  );
}
