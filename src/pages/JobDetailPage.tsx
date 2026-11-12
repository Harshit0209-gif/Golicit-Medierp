import { Link, useParams } from 'react-router';
import { Building2, ChevronRight } from 'lucide-react';
import { ApplyForm } from '../components/forms/ApplyForm';
import { JobList } from '../components/jobs/JobList';
import { Button } from '../components/ui/Button';
import { jobBySlug, jobs } from '../data/jobs';
import { specialtyById } from '../data/specialties';
import { formatExperience, formatPosted, formatSalary, monogram } from '../lib/format';
import styles from './JobDetailPage.module.css';

export default function JobDetailPage() {
  const { slug = '' } = useParams();
  const job = jobBySlug.get(slug);

  if (!job) {
    return (
      <section className={`wrap ${styles.missing}`}>
        <title>Post not found – MedRecruit</title>
        <h1>This post is no longer listed.</h1>
        <p>It may have been filled or withdrawn by the hospital. There are {jobs.length} other posts open now.</p>
        <Button to="/jobs">Search open posts</Button>
      </section>
    );
  }

  const specialty = specialtyById[job.specialtyId];
  const similar = jobs.filter((j) => j.specialtyId === job.specialtyId && j.id !== job.id).slice(0, 3);
  const facts = [
    ['Salary', formatSalary(job.salary)],
    ['Experience', formatExperience(job.experience)],
    ['Qualification', job.qualification],
    ['Job type', job.type],
    ['Shifts', job.shift],
    ['Location', job.city],
  ];

  return (
    <>
      <title>{`${job.title}, ${job.institution.name} – MedRecruit`}</title>

      <section className={styles.head}>
        <div className="wrap">
          <nav aria-label="Breadcrumb">
            <ol role="list" className={styles.crumbs}>
              <li>
                <Link to="/jobs">Jobs</Link>
                <ChevronRight aria-hidden="true" />
              </li>
              <li>
                <Link to={`/jobs?specialty=${job.specialtyId}`}>{specialty.name}</Link>
                <ChevronRight aria-hidden="true" />
              </li>
              <li aria-current="page">{job.title}</li>
            </ol>
          </nav>

          <div className={styles.titleRow}>
            <span className={styles.monogram} aria-hidden="true">
              {monogram(job.institution.name)}
            </span>
            <div>
              <h1 className={styles.title}>{job.title}</h1>
              <p className={styles.employer}>
                {job.institution.name}, {job.city}
              </p>
            </div>
          </div>

          <dl className={styles.facts}>
            {facts.map(([label, value]) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
          <p className={styles.posted}>
            {formatPosted(job.postedDaysAgo)}
            {job.urgent && <span className={styles.urgent}>Urgent: hospital wants to interview this week</span>}
          </p>
        </div>
      </section>

      <div className={`wrap ${styles.body}`}>
        <article className={styles.content}>
          <section>
            <h2>About the role</h2>
            <p>{job.summary}</p>
          </section>
          <section>
            <h2>What you will do</h2>
            <ul>
              {job.duties.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>
          </section>
          <section>
            <h2>What you need</h2>
            <ul>
              {job.requirements.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>
          </section>
          <section>
            <h2>What the hospital offers</h2>
            <ul>
              {job.benefits.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </section>
          <section className={styles.employerCard}>
            <h2>
              <Building2 aria-hidden="true" />
              About {job.institution.name}
            </h2>
            <p>{job.institution.about}</p>
            <dl className={styles.employerFacts}>
              <div>
                <dt>Type</dt>
                <dd>{job.institution.type}</dd>
              </div>
              {job.institution.beds && (
                <div>
                  <dt>Beds</dt>
                  <dd>{job.institution.beds.toLocaleString('en-IN')}</dd>
                </div>
              )}
              <div>
                <dt>Since</dt>
                <dd>{job.institution.founded}</dd>
              </div>
              <div>
                <dt>Standards</dt>
                <dd>{job.institution.accreditation}</dd>
              </div>
            </dl>
          </section>
        </article>

        <aside className={styles.apply} aria-labelledby="apply-title">
          <h2 id="apply-title">Apply for this post</h2>
          <p className={styles.applyNote}>
            Takes about two minutes. Your details go to this hospital only.
          </p>
          <ApplyForm job={job} />
        </aside>
      </div>

      {similar.length > 0 && (
        <section className={styles.similar} aria-labelledby="similar-title">
          <div className="wrap">
            <h2 id="similar-title">More {specialty.name.toLowerCase()} posts</h2>
            <JobList jobs={similar} label={`More ${specialty.name} posts`} />
          </div>
        </section>
      )}
    </>
  );
}
