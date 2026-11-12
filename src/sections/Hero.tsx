import { lazy, Suspense, useEffect, useMemo, useState, type FormEvent } from 'react';
import { AnimatePresence, MotionConfig, motion } from 'framer-motion';
import { marketSnapshot, wireItems, type MarketSnapshot, type WireItem } from '../data/market';
import { Wire } from './hero/Wire';
import styles from './hero/Hero.module.css';

// The map geometry is the heaviest part of the hero, so it loads as its own chunk.
const WorldMap = lazy(() => import('./hero/WorldMap').then((m) => ({ default: m.WorldMap })));

const fmt = new Intl.NumberFormat('en-US');

const go = (url: string) => window.location.assign(url);
const openCountry = (name: string) => go(`/openings?country=${encodeURIComponent(name)}`);

interface HeroProps {
  /** Server-fetched market data. Defaults to the sample data. */
  snapshot?: MarketSnapshot;
  wire?: WireItem[];
}

/** Ticking UTC clock for the status line. */
function Clock() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  return <time dateTime={now.toISOString()}>{now.toISOString().slice(11, 19)} UTC</time>;
}

export function Hero({ snapshot = marketSnapshot, wire = wireItems }: HeroProps) {
  // The only two pieces of selection state; everything else is derived.
  const [pinned, setPinned] = useState<string | null>(null); // dropdown, keyboard focus, or first tap
  const [hovered, setHovered] = useState<string | null>(null); // mouse/pen currently over a country

  const selected = hovered ?? pinned;
  const showingPinned = hovered === null && pinned !== null;
  const country = snapshot.countries.find((c) => c.code === selected) ?? null;
  const jobCount = country ? country.live : snapshot.liveOpenings;

  const pin = (code: string | null) => {
    setPinned(code);
    setHovered(null);
  };

  const sorted = useMemo(
    () => [...snapshot.countries].sort((a, b) => a.name.localeCompare(b.name)),
    [snapshot.countries],
  );

  const [query, setQuery] = useState('');
  const search = (e: FormEvent) => {
    e.preventDefault();
    go(`/openings?keyword=${encodeURIComponent(query.trim())}`);
  };

  const place = country?.name ?? 'Worldwide';
  const hint = selected === null ? 'Hover or pick a country' : 'Click to open';

  return (
    <MotionConfig reducedMotion="user">
      <section id="top" className={styles.hero} aria-labelledby="hero-title">
        <div className="wrap">
          {/* Status line */}
          <div className={styles.status}>
            <span className={styles.clock}>
              <Clock />
            </span>
          </div>

          <div className={styles.grid}>
            {/* Headline + search */}
            <div className={styles.copy}>
              <p className={styles.eyebrow}>Jobs · {place}</p>
              <h1 id="hero-title" className={styles.headline}>
                <span className={styles.number}>
                  <AnimatePresence mode="popLayout" initial={false}>
                    <motion.span
                      key={jobCount}
                      className={styles.numberValue}
                      initial={{ y: '60%', opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: '-60%', opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
                    >
                      {fmt.format(jobCount)}
                    </motion.span>
                  </AnimatePresence>
                </span>
                <span className={styles.unit}>jobs</span>
              </h1>
              <p className={styles.sub}>
                medical jobs {country ? `in ${country.name}` : 'worldwide'}.
              </p>

              <form className={styles.search} onSubmit={search} role="search">
                <label htmlFor="hero-search" className="visually-hidden">
                  Search jobs
                </label>
                <span className={styles.prompt} aria-hidden="true">
                  &gt;
                </span>
                <input
                  id="hero-search"
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={`Search ${fmt.format(snapshot.liveOpenings)} jobs`}
                  autoComplete="off"
                />
                <button type="submit">Search</button>
              </form>
            </div>

            {/* Map block */}
            <div className={styles.mapBlock}>
              <div className={styles.mapHead}>
                <label className={styles.jump}>
                  <span className="visually-hidden">Jump to a country</span>
                  <select value={pinned ?? ''} onChange={(e) => pin(e.target.value || null)}>
                    <option value="">All {snapshot.countries.length} countries</option>
                    {sorted.map((c) => (
                      <option key={c.code} value={c.code}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <Suspense fallback={<div className={styles.mapSkeleton} aria-hidden="true" />}>
                <WorldMap
                  countries={snapshot.countries}
                  selected={selected}
                  pinned={pinned}
                  onHover={setHovered}
                  onPin={pin}
                  onOpen={(c) => openCountry(c.name)}
                />
              </Suspense>

              <div className={styles.readout} aria-live="polite">
                <div className={styles.readoutTop}>
                  <p className={styles.readoutName}>{place}</p>
                  {showingPinned && country ? (
                    <a className={styles.viewLink} href={`/openings?country=${encodeURIComponent(country.name)}`}>
                      View jobs <span aria-hidden="true">↗</span>
                    </a>
                  ) : (
                    <p className={styles.hint}>{hint}</p>
                  )}
                </div>
              </div>
            </div>

            {/* The wire */}
            <Wire items={wire} country={country} onClear={() => pin(null)} />
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}
