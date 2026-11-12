import { Link } from 'react-router';
import { Briefcase, Clock, MapPin } from 'lucide-react';
import type { Job } from '../../data/jobs';
import { formatExperience, formatPosted, formatSalary, monogram } from '../../lib/format';
import styles from './JobList.module.css';

export function JobRow({ job }: { job: Job }) {
  return (
    <li className={styles.row}>
      <span className={styles.monogram} aria-hidden="true">
        {monogram(job.institution.name)}
      </span>

      <div className={styles.role}>
        <h3 className={styles.title}>
          {/* Stretched link: the whole row is clickable, the accessible name stays the job title. */}
          <Link to={`/jobs/${job.slug}`} className={styles.link}>
            {job.title}
          </Link>
        </h3>
        <p className={styles.employer}>{job.institution.name}</p>
        <p className={styles.tags}>
          {job.urgent && <span className={`${styles.tag} ${styles.urgent}`}>Urgent</span>}
          {job.type !== 'Full-time' && <span className={styles.tag}>{job.type}</span>}
          {job.shift !== 'Day' && <span className={styles.tag}>{job.shift} shifts</span>}
        </p>
      </div>

      <div className={styles.facts}>
        <p className={styles.fact}>
          <MapPin aria-hidden="true" />
          <span className="visually-hidden">Location: </span>
          {job.city}
        </p>
        <p className={styles.fact}>
          <Briefcase aria-hidden="true" />
          <span className="visually-hidden">Experience: </span>
          {formatExperience(job.experience)}
        </p>
        <p className={styles.salary}>
          <span className="visually-hidden">Salary: </span>
          {formatSalary(job.salary)}
        </p>
      </div>
      <p className={styles.posted}>
        <Clock aria-hidden="true" />
        {formatPosted(job.postedDaysAgo).replace('Posted ', '')}
      </p>
    </li>
  );
}

interface JobListProps {
  jobs: Job[];
  label: string;
}

export function JobList({ jobs, label }: JobListProps) {
  return (
    <div className={styles.panel}>
      <div className={styles.columns} aria-hidden="true">
        <span />
        <span>Role and employer</span>
        <span>Location</span>
        <span>Experience</span>
        <span>Salary</span>
        <span>Posted</span>
      </div>
      <ul role="list" aria-label={label} className={styles.list}>
        {jobs.map((job) => (
          <JobRow key={job.id} job={job} />
        ))}
      </ul>
    </div>
  );
}
