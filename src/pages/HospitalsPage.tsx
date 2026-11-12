import { CircleCheck } from 'lucide-react';
import { RequirementForm } from '../components/forms/RequirementForm';
import { Accordion } from '../components/ui/Accordion';
import { Button } from '../components/ui/Button';
import { Outcomes } from '../components/ui/Outcomes';
import { PageIntro } from '../components/ui/PageIntro';
import { Quotes } from '../components/ui/Quotes';
import { SectionHeader } from '../components/ui/SectionHeader';
import { contact, faqs, hospitalServices, howItWorks, testimonials } from '../data/content';
import teamLarge from '../assets/images/hospital-team-1100.jpg';
import teamSmall from '../assets/images/hospital-team-760.jpg';
import styles from './InnerPages.module.css';

const hospitalVoices = testimonials.filter((t) => /Director|HR/.test(t.role));

export default function HospitalsPage() {
  return (
    <>
      <title>Hire doctors, nurses and faculty – MedRecruit for hospitals</title>

      <PageIntro
        title="Hire verified doctors, nurses and faculty."
        lead="Send us the post. A recruiter who knows the specialty calls you the same day, and you get a shortlist of credential-checked candidates, usually within 10 working days."
        actions={
          <>
            <Button href="#requirement" size="lg">
              Post a requirement
            </Button>
            <Button href={contact.phoneHref} variant="outline" size="lg">
              Call {contact.phone}
            </Button>
          </>
        }
        image={{
          src: teamLarge,
          srcSet: `${teamSmall} 760w, ${teamLarge} 1100w`,
          alt: 'A senior doctor with three colleagues in a hospital consultation room',
          width: 1100,
          height: 880,
        }}
      />

      <section className={styles.outcomesBand} aria-label="Results">
        <div className="wrap">
          <Outcomes />
        </div>
      </section>

      <section id="services" className="section" aria-labelledby="services-title">
        <div className="wrap">
          <SectionHeader
            id="services-title"
            title="Who we recruit"
            intro="Each desk is run by recruiters who have hired for that specialty for years, not generalists working from a keyword list."
          />
          <ul role="list" className={styles.ruled}>
            {hospitalServices.map((s) => (
              <li key={s.title} className={styles.ruledItem}>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
                <span className={styles.time}>{s.time}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className={`section ${styles.band}`} aria-labelledby="process-title">
        <div className="wrap">
          <SectionHeader id="process-title" title="From brief to joining day" />
          <ol role="list" className={styles.process}>
            {howItWorks.hospitals.map((step, i) => (
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

      <section id="requirement" className="section" aria-labelledby="requirement-title">
        <div className={`wrap ${styles.formSection}`}>
          <div className={styles.formAside}>
            <h2 id="requirement-title">Post a requirement</h2>
            <p>Three short steps. There is no charge unless you hire someone we introduce.</p>
            <ul role="list" className={styles.nextList}>
              <li>
                <CircleCheck aria-hidden="true" />
                <span>A specialist recruiter calls you the same working day.</span>
              </li>
              <li>
                <CircleCheck aria-hidden="true" />
                <span>You see verified candidates only, with references attached.</span>
              </li>
              <li>
                <CircleCheck aria-hidden="true" />
                <span>Free replacement if a hire leaves within 90 days.</span>
              </li>
            </ul>
          </div>
          <div className={styles.formPanel}>
            <RequirementForm />
          </div>
        </div>
      </section>

      <section className={`section ${styles.band}`} aria-labelledby="hospital-voices">
        <div className="wrap">
          <SectionHeader id="hospital-voices" title="What hospitals tell us" />
          <Quotes items={hospitalVoices} />
        </div>
      </section>

      <section id="faq" className="section" aria-labelledby="hospital-faq">
        <div className={`wrap ${styles.faq}`}>
          <div>
            <h2 id="hospital-faq">Fees and common questions</h2>
            <p>
              Something else? Email <a className="link" href={`mailto:${contact.hiringEmail}`}>{contact.hiringEmail}</a>
            </p>
          </div>
          <Accordion items={faqs.hospitals} />
        </div>
      </section>
    </>
  );
}
