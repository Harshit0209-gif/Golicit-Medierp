import { useRef, useState } from 'react';
import { CircleCheck, Upload } from 'lucide-react';
import type { Job } from '../../data/jobs';
import { email, indianMobile, required, useForm } from '../../lib/useForm';
import { Button } from '../ui/Button';
import { TextField } from '../ui/Field';
import fieldStyles from '../ui/Field.module.css';
import styles from './Forms.module.css';

const MAX_MB = 5;

export function ApplyForm({ job }: { job: Job }) {
  const [sent, setSent] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const form = useForm(
    { name: '', email: '', phone: '', registration: '', cv: '', consent: '' },
    {
      name: [required('Enter your full name')],
      email: [required('Enter your email address'), email],
      phone: [required('Enter your mobile number'), indianMobile],
      registration: [required('Enter your council registration number')],
      cv: [
        required('Attach your CV'),
        (v) => (v === 'too-large' ? `Attach a file smaller than ${MAX_MB} MB` : undefined),
      ],
      consent: [required('Confirm that we can share your profile with this hospital')],
    },
  );

  if (sent) {
    return (
      <div className={styles.success} role="status">
        <CircleCheck aria-hidden="true" />
        <h3>Application sent</h3>
        <p>
          {job.institution.name} has your profile. A MedRecruit recruiter will call you within two working days to
          talk through next steps.
        </p>
        <Button to="/jobs" variant="outline" block>
          Browse more posts
        </Button>
      </div>
    );
  }

  const cvError = form.errors.cv;
  const fileName = form.values.cv && form.values.cv !== 'too-large' ? form.values.cv : '';

  return (
    <form className={styles.form} noValidate onSubmit={form.handleSubmit(() => setSent(true))}>
      <TextField label="Full name" autoComplete="name" {...form.field('name')} />
      <TextField label="Email" type="email" autoComplete="email" {...form.field('email')} />
      <TextField label="Mobile number" type="tel" autoComplete="tel" inputMode="tel" {...form.field('phone')} />
      <TextField
        label="Council registration number"
        hint="NMC, state medical council or nursing council"
        {...form.field('registration')}
      />

      <div className={`${fieldStyles.field} ${cvError ? fieldStyles.invalid : ''}`}>
        <span className={fieldStyles.label} id="cv-label">
          CV
        </span>
        <label className={`${styles.file} ${cvError ? styles.fileInvalid : ''}`}>
          <Upload aria-hidden="true" />
          <span>{fileName || 'Choose a PDF or Word file'}</span>
          <input
            ref={fileRef}
            type="file"
            name="cv"
            accept=".pdf,.doc,.docx"
            aria-labelledby="cv-label"
            aria-invalid={cvError ? true : undefined}
            aria-describedby={cvError ? 'cv-error' : 'cv-hint'}
            className="visually-hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              const value = !file ? '' : file.size > MAX_MB * 1024 * 1024 ? 'too-large' : file.name;
              form.setValues((prev) => ({ ...prev, cv: value }));
            }}
            onBlur={form.field('cv').onBlur}
          />
        </label>
        {cvError ? (
          <p id="cv-error" className={fieldStyles.error}>
            {cvError}
          </p>
        ) : (
          <p id="cv-hint" className={fieldStyles.hint}>
            Up to {MAX_MB} MB
          </p>
        )}
      </div>

      <div className={styles.consent}>
        <label>
          <input
            type="checkbox"
            name="consent"
            checked={form.values.consent === 'yes'}
            aria-invalid={form.errors.consent ? true : undefined}
            onChange={(e) => form.setValues((prev) => ({ ...prev, consent: e.target.checked ? 'yes' : '' }))}
          />
          <span>Share my profile with {job.institution.name} for this post only.</span>
        </label>
        {form.errors.consent && <p className={fieldStyles.error}>{form.errors.consent}</p>}
      </div>

      <Button type="submit" size="lg" block>
        Send application
      </Button>
    </form>
  );
}
