import { Link } from 'react-router';
import { BadgeCheck, CircleCheck, EyeOff, Headset, IndianRupee } from 'lucide-react';
import { RegisterForm } from '../components/forms/RegisterForm';
import { Accordion } from '../components/ui/Accordion';
import { Button } from '../components/ui/Button';
import { PageIntro } from '../components/ui/PageIntro';
import { Quotes } from '../components/ui/Quotes';
import { SectionHeader } from '../components/ui/SectionHeader';
import { contact, doctorBenefits, faqs, howItWorks, testimonials } from '../data/content';
import { jobCountBySpecialty, jobs } from '../data/jobs';
import { specialties } from '../data/specialties';
import doctorImage from '../assets/images/doctor-radiology.jpg';
import doctorImageSmall from '../assets/images/doctor-radiology-420.jpg';
import styles from './InnerPages.module.css';

const benefitIcons = [IndianRupee, BadgeCheck, EyeOff, Headset];
const doctorVoices = testimonials.filter((t) => t.role.startsWith('Consultant'));

export default function DoctorsPage() {
  return (
    <>
      <title>Jobs for doctors, nurses and faculty – MedRecruit</title>

      <PageIntro
        tone="ceil"
        title="One verified profile for every hospital you apply to."
        lead="Add your qualifications once. We verify them, show you the salary on every post, and keep your search private from your current employer."
        actions={
          <>
            <Button href="#register" size="lg" variant="dark">
              Create your profile
            </Button>
            <Button to="/jobs" size="lg" variant="outline">
              Search {jobs.length} posts
            </Button>
          </>
        }
        image={{
          src: doctorImage,
          srcSet: `${doctorImageSmall} 420w, ${doctorImage} 720w`,
          alt: 'A consultant radiologist in a white coat standing in a CT control room',
          width: 720,
          height: 875,
          position: '50% 30%',
          aspect: '4 / 4.2',
        }}
      />

      <section className="section" aria-labelledby="benefits-title">
        <div className="wrap">
          <SectionHeader id="benefits-title" title="What changes when you search with us" />
          <ul role="list" className={styles.benefits}>
            {doctorBenefits.map((b, i) => {
              const Icon = benefitIcons[i];
              return (
                <li key={b.title} className={styles.benefit}>
                  <span className={styles.benefitIcon}>
                    <Icon aria-hidden="true" />
                  </span>
                  <div>
                    <h3>{b.title}</h3>
                    <p>{b.body}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section
        id="how-it-works"
        className={`section ${styles.band}`}
        aria-labelledby="doctor-how"
        style={{ '--tape': 'var(--ceil)' } as React.CSSProperties}
      >
        <div className="wrap">
          <SectionHeader
            id="doctor-how"
            title="How it works"
            intro="Verification happens once. After that, every application takes about two minutes."
          />
          <ol role="list" className={styles.process}>
            {howItWorks.doctors.map((step, i) => (
              <li key={step.title} className={styles.processStep}>
                <span className={styles.processNo} aria-hidden="true">
                  {i + 1}
                </span>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section" aria-labelledby="departments-title">
        <div className="wrap">
          <SectionHeader
            id="departments-title"
            title="Open posts by department"
            action={
              <Button to="/jobs" variant="outline">
                Search all posts
              </Button>
            }
          />
          <ul role="list" className={styles.departments}>
            {specialties.map(({ id, name, icon: Icon }) => (
              <li key={id}>
                <Link to={`/jobs?specialty=${id}`} className={styles.department}>
                  <span className={styles.departmentIcon}>
                    <Icon aria-hidden="true" strokeWidth={2.2} />
                  </span>
                  {name}
                  <span className={styles.departmentCount}>
                    {jobCountBySpecialty[id] ?? 0}
                    <span className="visually-hidden"> posts</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        id="register"
        className={`section ${styles.band}`}
        aria-labelledby="register-title"
        style={{ '--tape': 'var(--ceil)' } as React.CSSProperties}
      >
        <div className={`wrap ${styles.formSection}`}>
          <div className={styles.formAside}>
            <h2 id="register-title">Create your profile</h2>
            <p>It takes about five minutes. You never pay to use MedRecruit.</p>
            <ul role="list" className={styles.nextList}>
              <li>
                <CircleCheck aria-hidden="true" />
                <span>We email you a secure link to upload your certificates.</span>
              </li>
              <li>
                <CircleCheck aria-hidden="true" />
                <span>Verification usually takes two working days.</span>
              </li>
              <li>
                <CircleCheck aria-hidden="true" />
                <span>Hospitals only see your details when you apply or agree to be introduced.</span>
              </li>
            </ul>
          </div>
          <div className={styles.formPanel}>
            <RegisterForm />
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="doctor-voices">
        <div className="wrap">
          <SectionHeader id="doctor-voices" title="From doctors who moved with us" />
          <Quotes items={doctorVoices} />
        </div>
      </section>

      <section className={`section ${styles.band}`} aria-labelledby="doctor-faq">
        <div className={`wrap ${styles.faq}`}>
          <div>
            <h2 id="doctor-faq">Questions doctors ask us</h2>
            <p>
              Talk to a recruiter on <a className="link" href={contact.phoneHref}>{contact.phone}</a>,{' '}
              {contact.hours.toLowerCase()}.
            </p>
          </div>
          <Accordion items={faqs.doctors} />
        </div>
      </section>
    </>
  );
}
