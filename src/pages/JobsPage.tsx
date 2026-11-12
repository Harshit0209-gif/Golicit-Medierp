import { useEffect, useId, useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'react-router';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { JobList } from '../components/jobs/JobList';
import { Button } from '../components/ui/Button';
import { SelectField } from '../components/ui/Field';
import { cities, experienceBands, jobs, jobTypes, type Job, type JobType } from '../data/jobs';
import { specialties, specialtyById, type SpecialtyId } from '../data/specialties';
import { pluralise } from '../lib/format';
import styles from './JobsPage.module.css';

const PAGE_SIZE = 12;

/** Annualised salary in lakh for sorting; locum shifts assume ~200 shifts a year. */
const annualLakh = (job: Job) => (job.salary.unit === 'shift' ? (job.salary.max * 200) / 100000 : job.salary.max);

const KEYS = ['q', 'specialty', 'city', 'type', 'exp', 'sort'] as const;
type FilterKey = (typeof KEYS)[number];
type RawFilters = Record<FilterKey, string>;

const readParams = (params: URLSearchParams): RawFilters =>
  Object.fromEntries(KEYS.map((key) => [key, params.get(key) ?? ''])) as RawFilters;

const toParams = (raw: RawFilters) => {
  const params = new URLSearchParams();
  for (const key of KEYS) if (raw[key]) params.set(key, raw[key]);
  return params;
};

/**
 * Filter state lives in the URL so searches can be shared and bookmarked.
 * React Router applies URL updates in a transition, so inputs bound straight to
 * the URL would lag a frame (and drop fast keystrokes). Instead the inputs read
 * local state that updates synchronously, and the URL follows it. URL changes
 * that did not come from this page (links, back button) are adopted.
 */
function useFilters() {
  const [params, setParams] = useSearchParams();
  const [raw, setRaw] = useState<RawFilters>(() => readParams(params));
  const written = useRef(new Set<string>());
  const search = params.toString();

  useEffect(() => {
    if (written.current.has(search)) return;
    written.current.clear();
    setRaw(readParams(new URLSearchParams(search)));
  }, [search]);

  const commit = (next: RawFilters) => {
    setRaw(next);
    const nextParams = toParams(next);
    written.current.add(nextParams.toString());
    setParams(nextParams, { replace: true, preventScrollReset: true });
  };

  const update = (patch: Partial<RawFilters>) => commit({ ...raw, ...patch });
  const clear = () => commit(readParams(new URLSearchParams()));

  const filters = {
    q: raw.q,
    specialty: raw.specialty as SpecialtyId | '',
    city: raw.city,
    types: raw.type.split(',').filter(Boolean) as JobType[],
    exp: raw.exp,
    sort: raw.sort === 'salary' ? 'salary' : 'newest',
  };

  return { filters, update, clear };
}

export default function JobsPage() {
  const { filters, update, clear } = useFilters();
  const [visible, setVisible] = useState(PAGE_SIZE);
  const [panelOpen, setPanelOpen] = useState(false);
  const panelId = useId();

  const results = useMemo(() => {
    const q = filters.q.trim().toLowerCase();
    const band = experienceBands.find((b) => b.id === filters.exp);
    const list = jobs.filter((job) => {
      if (filters.specialty && job.specialtyId !== filters.specialty) return false;
      if (filters.city && job.city !== filters.city) return false;
      if (filters.types.length && !filters.types.includes(job.type)) return false;
      if (band && (job.experience.max < band.min || job.experience.min > band.max)) return false;
      if (q) {
        const haystack = `${job.title} ${job.institution.name} ${job.qualification} ${job.city}`.toLowerCase();
        if (!q.split(/\s+/).every((word) => haystack.includes(word))) return false;
      }
      return true;
    });
    return filters.sort === 'salary' ? [...list].sort((a, b) => annualLakh(b) - annualLakh(a)) : list;
  }, [filters.q, filters.specialty, filters.city, filters.types.join(','), filters.exp, filters.sort]);

  // Start from the first page whenever the result set changes.
  useEffect(() => setVisible(PAGE_SIZE), [results]);

  const active = [
    filters.q && { key: 'q', label: `“${filters.q}”` },
    filters.specialty && { key: 'specialty', label: specialtyById[filters.specialty]?.name },
    filters.city && { key: 'city', label: filters.city },
    ...filters.types.map((t) => ({ key: `type:${t}`, label: t })),
    filters.exp && { key: 'exp', label: experienceBands.find((b) => b.id === filters.exp)?.label },
  ].filter(Boolean) as { key: string; label: string }[];

  const removeFilter = (key: string) => {
    if (key.startsWith('type:')) {
      update({ type: filters.types.filter((t) => t !== key.slice(5)).join(',') });
    } else {
      update({ [key as FilterKey]: '' });
    }
  };

  const toggleType = (type: JobType) => {
    const next = filters.types.includes(type) ? filters.types.filter((t) => t !== type) : [...filters.types, type];
    update({ type: next.join(',') });
  };

  const heading = filters.specialty
    ? `${specialtyById[filters.specialty]?.name} jobs${filters.city ? ` in ${filters.city}` : ''}`
    : filters.city
      ? `Hospital jobs in ${filters.city}`
      : 'Hospital jobs across India';

  return (
    <>
      <title>{`${heading} – MedRecruit`}</title>

      <section className={styles.head}>
        <div className="wrap">
          <h1 className={styles.title}>{heading}</h1>
          <form className={styles.search} role="search" onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="job-keyword" className="visually-hidden">
              Search by role, hospital or qualification
            </label>
            <Search className={styles.searchIcon} aria-hidden="true" />
            <input
              id="job-keyword"
              type="search"
              placeholder="Role, hospital or qualification"
              value={filters.q}
              onChange={(e) => update({ q: e.target.value })}
              autoComplete="off"
            />
          </form>
        </div>
      </section>

      <div className={`wrap ${styles.layout}`}>
        <aside className={styles.sidebar} aria-label="Filters">
          <button
            type="button"
            className={styles.panelToggle}
            aria-expanded={panelOpen}
            aria-controls={panelId}
            onClick={() => setPanelOpen((v) => !v)}
          >
            <SlidersHorizontal aria-hidden="true" />
            Filters
            {active.length > 0 && <span className={styles.badge}>{active.length}</span>}
          </button>

          <div id={panelId} className={`${styles.panel} ${panelOpen ? styles.panelOpen : ''}`}>
            <SelectField label="Department" value={filters.specialty} onChange={(e) => update({ specialty: e.target.value })}>
              <option value="">Any department</option>
              {specialties.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </SelectField>

            <SelectField label="City" value={filters.city} onChange={(e) => update({ city: e.target.value })}>
              <option value="">Any city</option>
              {cities.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </SelectField>

            <fieldset className={styles.group}>
              <legend>Job type</legend>
              {jobTypes.map((type) => (
                <label key={type} className={styles.option}>
                  <input type="checkbox" checked={filters.types.includes(type)} onChange={() => toggleType(type)} />
                  <span>{type}</span>
                </label>
              ))}
            </fieldset>

            <fieldset className={styles.group}>
              <legend>Experience</legend>
              {[{ id: '', label: 'Any experience' }, ...experienceBands].map((band) => (
                <label key={band.id || 'any'} className={styles.option}>
                  <input
                    type="radio"
                    name="experience"
                    checked={filters.exp === band.id}
                    onChange={() => update({ exp: band.id })}
                  />
                  <span>{band.label}</span>
                </label>
              ))}
            </fieldset>

            {active.length > 0 && (
              <Button variant="ghost" onClick={clear} className={styles.clear}>
                Clear all filters
              </Button>
            )}
          </div>
        </aside>

        <section className={styles.results} aria-labelledby="results-count">
          <div className={styles.toolbar}>
            <h2 id="results-count" className={styles.count} aria-live="polite">
              {pluralise(results.length, 'post')}
              {results.length > 0 && results.length > visible && (
                <span className={styles.countMuted}>, showing {Math.min(visible, results.length)}</span>
              )}
            </h2>
            <div className={styles.sort}>
              <SelectField
                label="Sort by"
                value={filters.sort}
                onChange={(e) => update({ sort: e.target.value === 'salary' ? 'salary' : '' })}
              >
                <option value="newest">Newest first</option>
                <option value="salary">Highest salary</option>
              </SelectField>
            </div>
          </div>

          {active.length > 0 && (
            <ul role="list" className={styles.chips} aria-label="Active filters">
              {active.map((chip) => (
                <li key={chip.key}>
                  <button type="button" className={styles.chip} onClick={() => removeFilter(chip.key)}>
                    {chip.label}
                    <X aria-hidden="true" />
                    <span className="visually-hidden">Remove filter</span>
                  </button>
                </li>
              ))}
            </ul>
          )}

          {results.length > 0 ? (
            <>
              <JobList jobs={results.slice(0, visible)} label="Job results" />
              {visible < results.length && (
                <div className={styles.more}>
                  <Button variant="outline" onClick={() => setVisible((v) => v + PAGE_SIZE)}>
                    Show {Math.min(PAGE_SIZE, results.length - visible)} more posts
                  </Button>
                </div>
              )}
            </>
          ) : (
            <div className={styles.empty}>
              <h2>No posts match these filters.</h2>
              <p>
                Try a nearby city or a broader department. Or create a profile and our recruiters will tell you when a
                matching post opens.
              </p>
              <div className={styles.emptyActions}>
                <Button onClick={clear} variant="dark">
                  Clear all filters
                </Button>
                <Button to="/doctors#register" variant="outline">
                  Create your profile
                </Button>
              </div>
            </div>
          )}
        </section>
      </div>
    </>
  );
}
