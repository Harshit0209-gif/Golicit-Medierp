import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router';
import { Search } from 'lucide-react';
import { cities, jobs } from '../../data/jobs';
import { specialties } from '../../data/specialties';
import { formatSalary } from '../../lib/format';
import { Button } from '../ui/Button';
import { SelectField } from '../ui/Field';
import { Directory, type Audience } from './Directory';
import styles from './Hero.module.css';

const popularSearches = [
  { label: 'ICU nursing', to: '/jobs?specialty=nursing&q=ICU' },
  { label: 'Consultant radiologist', to: '/jobs?specialty=radiology' },
  { label: 'Locum shifts', to: '/jobs?type=Locum' },
  { label: 'Jobs in Bengaluru', to: '/jobs?city=Bengaluru' },
  { label: 'Medical college faculty', to: '/jobs?specialty=medical-faculty' },
];

const copy = {
  doctors: {
    title: 'Find your next hospital post.',
    lead: `${jobs.length} openings for doctors, nurses and medical faculty. Every post shows the salary, and every employer is verified.`,
  },
  hospitals: {
    title: 'Hire verified doctors, faster.',
    lead: 'Tell us the post. We send a shortlist of credential-checked candidates, usually within 10 working days.',
  },
};

// Newest urgent post, shown on the floating card.
const featured = jobs.find((job) => job.urgent) ?? jobs[0];

function JobSearch() {
  const navigate = useNavigate();
  const [specialty, setSpecialty] = useState('');
  const [city, setCity] = useState('');

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (specialty) params.set('specialty', specialty);
    if (city) params.set('city', city);
    navigate(`/jobs${params.size ? `?${params}` : ''}`);
  };

  return (
    <form className={styles.form} onSubmit={submit} role="search" aria-label="Search jobs">
      <SelectField label="Department" value={specialty} onChange={(e) => setSpecialty(e.target.value)}>
        <option value="">Any department</option>
        {specialties.map((s) => (
          <option key={s.id} value={s.id}>
            {s.name}
          </option>
        ))}
      </SelectField>
      <SelectField label="City" value={city} onChange={(e) => setCity(e.target.value)}>
        <option value="">Any city</option>
        {cities.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </SelectField>
      <Button type="submit" size="lg" icon={<Search aria-hidden="true" />} className={styles.submit}>
        Search jobs
      </Button>
    </form>
  );
}

function HireStart() {
  const navigate = useNavigate();
  const [specialty, setSpecialty] = useState('');
  const [posts, setPosts] = useState('1');

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams({ posts });
    if (specialty) params.set('specialty', specialty);
    navigate(`/hospitals?${params}#requirement`);
  };

  return (
    <form className={styles.form} onSubmit={submit} aria-label="Start a hiring requirement">
      <SelectField label="Who do you need?" value={specialty} onChange={(e) => setSpecialty(e.target.value)}>
        <option value="">Choose a department</option>
        {specialties.map((s) => (
          <option key={s.id} value={s.id}>
            {s.name}
          </option>
        ))}
      </SelectField>
      <SelectField label="Posts to fill" value={posts} onChange={(e) => setPosts(e.target.value)}>
        <option value="1">1</option>
        <option value="2-5">2 to 5</option>
        <option value="6-10">6 to 10</option>
        <option value="10+">More than 10</option>
      </SelectField>
      <Button type="submit" size="lg" className={styles.submit}>
        Start a requirement
      </Button>
    </form>
  );
}

export function Hero() {
  const [audience, setAudience] = useState<Audience>('doctors');
  const { title, lead } = copy[audience];

  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <div className={`wrap ${styles.grid}`}>
        <div className={styles.copy}>
          <div className={styles.switch} role="group" aria-label="I want to">
            <button type="button" aria-pressed={audience === 'doctors'} onClick={() => setAudience('doctors')}>
              Find a job
            </button>
            <button type="button" aria-pressed={audience === 'hospitals'} onClick={() => setAudience('hospitals')}>
              Hire staff
            </button>
          </div>

          <h1 id="hero-title" className={styles.title}>
            {title}
          </h1>
          <p className={styles.lead}>{lead}</p>

          {audience === 'doctors' ? <JobSearch /> : <HireStart />}

          {audience === 'doctors' ? (
            <div className={styles.popular}>
              <span className={styles.popularLabel}>Popular:</span>
              <ul role="list">
                {popularSearches.map((p) => (
                  <li key={p.label}>
                    <Link to={p.to}>{p.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p className={styles.reassure}>No fee unless you hire. Free replacement if a hire leaves within 90 days.</p>
          )}
        </div>

        <div className={styles.visual}>
          {/* Floor tape leading out from under the directory board. */}
          <div className={styles.floor} aria-hidden="true">
            <span className={styles.lineSignal} />
            <span className={styles.lineCeil} />
          </div>

          <Directory audience={audience} />

          {audience === 'doctors' ? (
            <Link to={`/jobs/${featured.slug}`} className={styles.ticket}>
              <span className={styles.ticketTag}>{featured.urgent ? 'Urgent' : 'New today'}</span>
              <span className={styles.ticketTitle}>{featured.title}</span>
              <span className={styles.ticketMeta}>
                {featured.institution.name}, {featured.city}
              </span>
              <span className={styles.ticketSalary}>{formatSalary(featured.salary)}</span>
            </Link>
          ) : (
            <div className={styles.ticket}>
              <span className={styles.ticketTag}>Shortlist sent</span>
              <span className={styles.ticketTitle}>6 verified cardiologists</span>
              <span className={styles.ticketMeta}>for Lakeview Care Hospital, Bhopal</span>
              <span className={styles.ticketSalary}>9 days after the brief</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
