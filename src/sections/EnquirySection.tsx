import { useEffect, useState } from 'react';
import { closing, contact, specialtyGroups } from '../data/content';
import { ActionButton } from '../components/Action';
import { useEnquiry, type Audience } from '../components/Enquiry';
import { Input, Select, TextArea } from '../components/Field';
import { email, indianMobile, required, useForm } from '../lib/useForm';
import texture from '../assets/photos/theatre-texture.jpg';
import styles from './EnquirySection.module.css';

const allSpecialties = specialtyGroups.flatMap((g) => g.items);

const audiences: { id: Audience; label: string }[] = [
  { id: 'institution', label: 'I am hiring' },
  { id: 'professional', label: 'I am a medical professional' },
];

function EnquiryForm() {
  const { audience, setAudience, specialty } = useEnquiry();
  const [sent, setSent] = useState(false);
  const hiring = audience === 'institution';

  const form = useForm(
    { name: '', organisation: '', email: '', phone: '', specialty: '', message: '' },
    {
      name: [required('Enter your name')],
      organisation: [(v) => (hiring && !v.trim() ? 'Enter your hospital or institution' : undefined)],
      email: [required('Enter your email address'), email],
      phone: [required('Enter a phone number'), indianMobile],
      specialty: [required(hiring ? 'Choose the specialty you are hiring for' : 'Choose your specialty')],
    },
  );

  // A specialty chosen elsewhere on the page arrives pre-filled.
  useEffect(() => {
    if (specialty) form.setValues((prev) => ({ ...prev, specialty }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [specialty]);

  if (sent) {
    return (
      <div className={styles.done} role="status">
        <p className={styles.doneTitle}>Thank you, {form.values.name.split(' ')[0]}.</p>
        <p>
          A consultant who specialises in {form.values.specialty.toLowerCase()} will reply to {form.values.email} within
          one working day.
        </p>
        <ActionButton
          variant="text"
          onClick={() => {
            form.reset();
            setSent(false);
          }}
        >
          Send another enquiry
        </ActionButton>
      </div>
    );
  }

  return (
    <form className={styles.form} noValidate onSubmit={form.handleSubmit(() => setSent(true))}>
      <fieldset className={styles.audience}>
        <legend className="visually-hidden">Who is the enquiry from?</legend>
        {audiences.map((a) => (
          <label key={a.id} className={audience === a.id ? styles.picked : undefined}>
            <input
              type="radio"
              name="audience"
              value={a.id}
              checked={audience === a.id}
              onChange={() => setAudience(a.id)}
            />
            {a.label}
          </label>
        ))}
      </fieldset>

      <div className={styles.row}>
        <Input label="Full name" autoComplete="name" {...form.field('name')} />
        {hiring ? (
          <Input label="Hospital or institution" autoComplete="organization" {...form.field('organisation')} />
        ) : (
          <Input label="Current role" optional placeholder="e.g. Senior resident, cardiology" {...form.field('organisation')} />
        )}
      </div>
      <div className={styles.row}>
        <Input label="Email" type="email" autoComplete="email" {...form.field('email')} />
        <Input label="Phone" type="tel" inputMode="tel" autoComplete="tel" {...form.field('phone')} />
      </div>
      <Select label={hiring ? 'Specialty you are hiring for' : 'Your specialty'} {...form.field('specialty')}>
        <option value="">Choose a specialty</option>
        {allSpecialties.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </Select>
      <TextArea
        label={hiring ? 'About the role' : 'What are you looking for?'}
        optional
        placeholder={hiring ? 'Number of posts, location, joining timeline' : 'Preferred cities, type of role, timing'}
        {...form.field('message')}
      />
      <div className={styles.submit}>
        <ActionButton type="submit">{hiring ? 'Send hiring enquiry' : 'Send my details'}</ActionButton>
        <p className={styles.privacy}>We use your details only to respond to this enquiry.</p>
      </div>
    </form>
  );
}

export function EnquirySection() {
  return (
    <section id="enquiry" className={`${styles.section} on-dark`} aria-labelledby="enquiry-title">
      <img className={styles.texture} src={texture} alt="" width={1600} height={900} loading="lazy" decoding="async" />
      <div className={`wrap ${styles.grid}`}>
        <div className={styles.copy}>
          <p className="marker">Contact</p>
          <h2 id="enquiry-title" className={styles.title}>
            {closing.title}
          </h2>
          <p className={styles.lead}>{closing.lead}</p>

          <dl className={styles.contact}>
            <div>
              <dt>Call</dt>
              <dd>
                <a href={contact.phoneHref}>{contact.phone}</a>
              </dd>
            </div>
            <div>
              <dt>Write</dt>
              <dd>
                <a href={`mailto:${contact.email}`}>{contact.email}</a>
              </dd>
            </div>
            <div>
              <dt>Visit</dt>
              <dd>{contact.address.join(', ')}</dd>
            </div>
            <div>
              <dt>Hours</dt>
              <dd>{contact.hours}</dd>
            </div>
          </dl>
        </div>

        <div className={styles.panel}>
          <EnquiryForm />
        </div>
      </div>
    </section>
  );
}
