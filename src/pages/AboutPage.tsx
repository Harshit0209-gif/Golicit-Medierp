import { Button } from '../components/ui/Button';
import { Outcomes } from '../components/ui/Outcomes';
import { PageIntro } from '../components/ui/PageIntro';
import { SectionHeader } from '../components/ui/SectionHeader';
import hospitalImage from '../assets/images/about-hospital.jpg';
import hospitalImageSmall from '../assets/images/about-hospital-720.jpg';
import styles from './InnerPages.module.css';

const principles = [
  {
    title: 'Verify before we introduce',
    body: 'No hospital sees a candidate whose registration, degrees and references we have not checked ourselves.',
  },
  {
    title: 'Salary on every post',
    body: 'Hospitals agree a salary band before a post goes live. Doctors should not have to interview to find out what a job pays.',
  },
  {
    title: 'Privacy is the default',
    body: 'A doctor’s search is confidential until they choose otherwise. We never send a CV without asking first.',
  },
];

export default function AboutPage() {
  return (
    <>
      <title>About MedRecruit</title>

      <PageIntro
        title="We started MedRecruit because hiring a consultant took six months."
        lead="Our founders ran hospital HR and medical staffing for fifteen years. They watched good doctors give up on slow, opaque hiring, and hospitals keep beds closed for want of a specialist. MedRecruit is the service they wished they could call."
        image={{
          src: hospitalImage,
          srcSet: `${hospitalImageSmall} 720w, ${hospitalImage} 1200w`,
          alt: 'A modern hospital building with a glass tower and a curved entrance',
          width: 1200,
          height: 648,
          position: '50% 70%',
        }}
      />

      <section className="section" aria-label="Our story">
        <div className={`wrap ${styles.prose}`}>
          <div>
            <h2>What we do</h2>
            <p>
              We recruit doctors, nurses, medical faculty and allied health professionals for hospitals and medical
              colleges across India. Each specialty has its own desk, run by recruiters who understand the training
              pathway, the registration rules and what a strong candidate looks like.
            </p>
            <p>
              For doctors, we are a job board that shows the salary on every post and verifies your documents once.
              For hospitals, we are a search partner that sends shortlists rather than piles of CVs.
            </p>
          </div>
          <div>
            <h2>How we are different</h2>
            <p>
              Most medical hiring still runs on forwarded CVs and unverified claims. We check council registration,
              degrees, experience letters and two clinical references before any introduction, and we share the
              results with the hospital.
            </p>
            <p>
              We are paid only when a candidate joins, and we replace anyone who leaves within 90 days at no cost. That
              keeps us honest about fit.
            </p>
          </div>
        </div>
      </section>

      <section className={`section ${styles.band}`} aria-labelledby="principles-title">
        <div className="wrap">
          <SectionHeader id="principles-title" title="Three things we will not compromise on" />
          <ul role="list" className={styles.principles}>
            {principles.map((p) => (
              <li key={p.title} className={styles.principle}>
                <h3>{p.title}</h3>
                <p>{p.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section" aria-labelledby="results-title">
        <div className="wrap">
          <SectionHeader id="results-title" title="Results so far" />
          <Outcomes />
        </div>
      </section>

      <section className={`section ${styles.band}`} aria-label="Get in touch">
        <div className="wrap">
          <SectionHeader
            title="Work with us"
            intro="Whether you are hiring or looking for your next post, the fastest way to start is a five-minute call with a recruiter."
            action={
              <Button to="/contact" size="lg">
                Contact us
              </Button>
            }
          />
        </div>
      </section>
    </>
  );
}
