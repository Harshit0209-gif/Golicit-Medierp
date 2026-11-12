import { Clock, Mail, MapPin, Phone } from 'lucide-react';
import { ContactForm } from '../components/forms/ContactForm';
import { Accordion } from '../components/ui/Accordion';
import { PageIntro } from '../components/ui/PageIntro';
import { contact, faqs } from '../data/content';
import styles from './ContactPage.module.css';
import inner from './InnerPages.module.css';

const generalFaqs = [faqs.doctors[0], faqs.hospitals[0], faqs.doctors[1], faqs.hospitals[1]];

export default function ContactPage() {
  return (
    <>
      <title>Contact MedRecruit</title>

      <PageIntro
        title="Talk to a recruiter."
        lead="Call us for the fastest answer, or send a message and we will reply within one working day."
      />

      <section className="section" aria-label="Contact options">
        <div className={`wrap ${styles.grid}`}>
          <div className={inner.formPanel}>
            <h2 className={styles.formTitle}>Send a message</h2>
            <ContactForm />
          </div>

          <aside className={styles.details} aria-label="Contact details">
            <dl>
              <div className={styles.item}>
                <dt>
                  <Phone aria-hidden="true" />
                  Phone
                </dt>
                <dd>
                  <a href={contact.phoneHref}>{contact.phone}</a>
                </dd>
              </div>
              <div className={styles.item}>
                <dt>
                  <Clock aria-hidden="true" />
                  Hours
                </dt>
                <dd>{contact.hours}</dd>
              </div>
              <div className={styles.item}>
                <dt>
                  <Mail aria-hidden="true" />
                  Doctors and general questions
                </dt>
                <dd>
                  <a href={`mailto:${contact.email}`}>{contact.email}</a>
                </dd>
              </div>
              <div className={styles.item}>
                <dt>
                  <Mail aria-hidden="true" />
                  Hospitals and hiring
                </dt>
                <dd>
                  <a href={`mailto:${contact.hiringEmail}`}>{contact.hiringEmail}</a>
                </dd>
              </div>
              <div className={styles.item}>
                <dt>
                  <MapPin aria-hidden="true" />
                  Office
                </dt>
                <dd>
                  {contact.address.map((line) => (
                    <span key={line} className={styles.line}>
                      {line}
                    </span>
                  ))}
                </dd>
              </div>
            </dl>
          </aside>
        </div>
      </section>

      <section className={`section ${inner.band}`} aria-labelledby="contact-faq">
        <div className={`wrap ${inner.faq}`}>
          <div>
            <h2 id="contact-faq">Before you write</h2>
            <p>Most questions we receive are answered here.</p>
          </div>
          <Accordion items={generalFaqs} />
        </div>
      </section>
    </>
  );
}
