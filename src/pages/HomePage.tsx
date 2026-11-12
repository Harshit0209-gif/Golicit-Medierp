import { BadgeCheck } from 'lucide-react';
import { Hero } from '../components/home/Hero';
import { JobList } from '../components/jobs/JobList';
import { Button } from '../components/ui/Button';
import { Quotes } from '../components/ui/Quotes';
import { SectionHeader } from '../components/ui/SectionHeader';
import { howItWorks, partnerNames, testimonials, verificationChecks } from '../data/content';
import { jobs } from '../data/jobs';
import styles from './HomePage.module.css';

export default function HomePage() {
  return (
    <>
      <title>MedRecruit – Hospital jobs for doctors, nurses and faculty</title>
      <Hero />

      {/* Trust */}
      <section className={styles.trust} aria-labelledby="trust-title">
        <div className={`wrap ${styles.trustInner}`}>
          <h2 id="trust-title" className={styles.trustTitle}>
            Hiring through MedRecruit this month
          </h2>
          <ul role="list" className={styles.partners}>
            {partnerNames.map((name) => (
              <li key={name}>{name}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* Latest openings */}
      <section className="section" aria-labelledby="latest-title">
        <div className="wrap">
          <SectionHeader
            id="latest-title"
            title="Latest openings"
            intro="Posted in the last few days by hospitals and medical colleges we have verified."
            action={
              <Button to="/jobs" variant="outline">
                Browse all {jobs.length} openings
              </Button>
            }
          />
          <JobList jobs={jobs.slice(0, 6)} label="Latest openings" />
        </div>
      </section>

      {/* How it works */}
      <section className={`section ${styles.how}`} aria-labelledby="how-title">
        <div className="wrap">
          <SectionHeader
            id="how-title"
            title="How MedRecruit works"
            intro="Two routes through the same building. Pick the one that matches why you are here."
          />
          <div className={styles.tracks}>
            {(
              [
                ['doctors', 'If you are looking for a post', howItWorks.doctors, '/doctors', 'Create your profile'],
                ['hospitals', 'If you are hiring', howItWorks.hospitals, '/hospitals#requirement', 'Post a requirement'],
              ] as const
            ).map(([key, heading, steps, to, cta]) => (
              <div key={key} className={`${styles.track} ${styles[key]}`}>
                <h3 className={styles.trackTitle}>{heading}</h3>
                <ol role="list" className={styles.steps}>
                  {steps.map((step, i) => (
                    <li key={step.title} className={styles.step}>
                      <span className={styles.stepNo} aria-hidden="true">
                        {i + 1}
                      </span>
                      <div>
                        <h4 className={styles.stepTitle}>{step.title}</h4>
                        <p className={styles.stepBody}>{step.body}</p>
                      </div>
                    </li>
                  ))}
                </ol>
                <Button to={to} variant={key === 'doctors' ? 'dark' : 'primary'}>
                  {cta}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Verification */}
      <section className="section" aria-labelledby="verify-title">
        <div className={`wrap ${styles.verify}`}>
          <div className={styles.verifyCopy}>
            <h2 id="verify-title">Every candidate is checked before you meet them.</h2>
            <p>
              Hospitals spend weeks chasing certificates. We do it once, properly, and share the results with every
              shortlist, so interviews can focus on clinical fit.
            </p>
            <Button to="/hospitals" variant="outline">
              How we recruit for hospitals
            </Button>
          </div>

          <figure className={styles.sheet}>
            <figcaption className={styles.sheetHead}>
              <span className={styles.sheetName}>Dr. A. Raghavan, MD, DM (Cardiology)</span>
              <span className={styles.sheetRef}>Sample candidate file</span>
            </figcaption>
            <ul role="list">
              {verificationChecks.map((check) => (
                <li key={check.title} className={styles.check}>
                  <BadgeCheck className={styles.checkIcon} aria-hidden="true" />
                  <div>
                    <p className={styles.checkTitle}>{check.title}</p>
                    <p className={styles.checkBody}>{check.body}</p>
                  </div>
                  <span className={styles.checkStatus}>Verified</span>
                </li>
              ))}
            </ul>
          </figure>
        </div>
      </section>

      {/* Testimonials */}
      <section className={`section ${styles.voices}`} aria-labelledby="voices-title">
        <div className="wrap">
          <SectionHeader id="voices-title" title="From hospitals and doctors we have worked with" />
          <Quotes items={testimonials} />
        </div>
      </section>

      {/* Closing routes */}
      <section className="section" aria-label="Get started">
        <div className={`wrap ${styles.routes}`}>
          <div className={`${styles.route} ${styles.routeDoctors}`}>
            <h2>Looking for your next post?</h2>
            <p>One verified profile, salaries on every listing, and a recruiter who knows your specialty.</p>
            <Button to="/jobs" variant="dark" size="lg">
              Search jobs
            </Button>
          </div>
          <div className={`${styles.route} ${styles.routeHospitals}`}>
            <h2>Hiring for your hospital or college?</h2>
            <p>Send us the post today and get a verified shortlist, usually within 10 working days.</p>
            <Button to="/hospitals#requirement" variant="dark" size="lg">
              Post a requirement
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
