import { useRef, useState } from 'react';
import { useSearchParams } from 'react-router';
import { Check, CircleCheck } from 'lucide-react';
import { contact } from '../../data/content';
import { specialties, specialtyById, type SpecialtyId } from '../../data/specialties';
import { email, indianMobile, required, useForm } from '../../lib/useForm';
import { Button } from '../ui/Button';
import { SelectField, TextArea, TextField } from '../ui/Field';
import formStyles from './Forms.module.css';
import styles from './RequirementForm.module.css';

const steps = [
  { title: 'The post', fields: ['specialty', 'role', 'posts', 'joining'] },
  { title: 'Your institution', fields: ['institution', 'city', 'institutionType'] },
  { title: 'Your details', fields: ['name', 'designation', 'email', 'phone'] },
] as const;

const postOptions = { '1': '1', '2-5': '2 to 5', '6-10': '6 to 10', '10+': 'More than 10' } as const;

export function RequirementForm() {
  const [params] = useSearchParams();
  const [step, setStep] = useState(0);
  const [sent, setSent] = useState(false);
  const headingRef = useRef<HTMLHeadingElement>(null);

  const prefSpecialty = params.get('specialty') ?? '';
  const prefPosts = params.get('posts') ?? '';

  const form = useForm(
    {
      specialty: prefSpecialty in specialtyById ? prefSpecialty : '',
      role: '',
      posts: prefPosts in postOptions ? prefPosts : '1',
      type: 'Full-time',
      salary: '',
      joining: '',
      institution: '',
      city: '',
      institutionType: '',
      name: '',
      designation: '',
      email: '',
      phone: '',
      notes: '',
    },
    {
      specialty: [required('Choose the department you are hiring for')],
      role: [required('Enter the post title, like Consultant Cardiologist')],
      joining: [required('Choose when the candidate should join')],
      institution: [required('Enter the name of your hospital or college')],
      city: [required('Enter the city where the post is based')],
      institutionType: [required('Choose the type of institution')],
      name: [required('Enter your name')],
      designation: [required('Enter your designation')],
      email: [required('Enter your work email'), email],
      phone: [required('Enter a phone number we can call today'), indianMobile],
    },
  );

  const goTo = (next: number) => {
    setStep(next);
    // Keep focus and the viewport on the form as the step changes.
    requestAnimationFrame(() => {
      headingRef.current?.focus();
      headingRef.current?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    });
  };

  const next = () => {
    if (form.check([...steps[step].fields])) goTo(step + 1);
  };

  if (sent) {
    const v = form.values;
    return (
      <div className={formStyles.success} role="status">
        <CircleCheck aria-hidden="true" />
        <h3>Requirement sent</h3>
        <p>
          Thank you, {v.name.split(' ')[0]}. A recruiter who specialises in{' '}
          {specialtyById[v.specialty as SpecialtyId]?.name.toLowerCase()} will call you on {v.phone} today to confirm
          the brief. If it is after 7 pm, expect the call by 11 am tomorrow.
        </p>
        <dl className={styles.summary}>
          <div>
            <dt>Post</dt>
            <dd>
              {v.role}, {postOptions[v.posts as keyof typeof postOptions]}{' '}
              {v.posts === '1' ? 'opening' : 'openings'}
            </dd>
          </div>
          <div>
            <dt>Institution</dt>
            <dd>
              {v.institution}, {v.city}
            </dd>
          </div>
          <div>
            <dt>Joining</dt>
            <dd>{v.joining}</dd>
          </div>
        </dl>
        <Button
          variant="outline"
          onClick={() => {
            form.reset();
            setSent(false);
            setStep(0);
          }}
        >
          Send another requirement
        </Button>
      </div>
    );
  }

  return (
    <div>
      <ol role="list" className={styles.stepper} aria-label="Progress">
        {steps.map((s, i) => (
          <li
            key={s.title}
            className={`${styles.stepItem} ${i === step ? styles.current : ''} ${i < step ? styles.done : ''}`}
            aria-current={i === step ? 'step' : undefined}
          >
            <span className={styles.stepDot} aria-hidden="true">
              {i < step ? <Check /> : i + 1}
            </span>
            <span className={styles.stepLabel}>
              <span className="visually-hidden">Step {i + 1} of 3: </span>
              {s.title}
              {i < step && <span className="visually-hidden"> (completed)</span>}
            </span>
          </li>
        ))}
      </ol>

      <form
        className={formStyles.form}
        noValidate
        onSubmit={
          step < 2
            ? (e) => {
                e.preventDefault();
                next();
              }
            : form.handleSubmit(() => setSent(true))
        }
      >
        <h3 ref={headingRef} tabIndex={-1} className={styles.stepTitle}>
          {steps[step].title}
        </h3>

        {step === 0 && (
          <>
            <div className={formStyles.row2}>
              <SelectField label="Department" {...form.field('specialty')}>
                <option value="">Choose a department</option>
                {specialties.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </SelectField>
              <TextField label="Post title" placeholder="Consultant Cardiologist" {...form.field('role')} />
            </div>
            <div className={formStyles.row2}>
              <SelectField label="Openings" {...form.field('posts')}>
                {Object.entries(postOptions).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </SelectField>
              <SelectField label="Job type" {...form.field('type')}>
                <option>Full-time</option>
                <option>Part-time</option>
                <option>Locum</option>
                <option>Contract</option>
              </SelectField>
            </div>
            <div className={formStyles.row2}>
              <TextField
                label="Salary band"
                optional
                placeholder="₹36–48 LPA"
                hint="Posts with a salary get three times as many applications."
                {...form.field('salary')}
              />
              <SelectField label="Joining" {...form.field('joining')}>
                <option value="">Choose a timeframe</option>
                <option>As soon as possible</option>
                <option>Within a month</option>
                <option>In 1 to 3 months</option>
                <option>Flexible</option>
              </SelectField>
            </div>
          </>
        )}

        {step === 1 && (
          <>
            <TextField label="Hospital or college name" autoComplete="organization" {...form.field('institution')} />
            <div className={formStyles.row2}>
              <TextField label="City" autoComplete="address-level2" {...form.field('city')} />
              <SelectField label="Type of institution" {...form.field('institutionType')}>
                <option value="">Choose a type</option>
                <option>Multispecialty hospital</option>
                <option>Single-specialty hospital</option>
                <option>Medical college</option>
                <option>Nursing home or clinic</option>
                <option>Diagnostic centre</option>
              </SelectField>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <div className={formStyles.row2}>
              <TextField label="Your name" autoComplete="name" {...form.field('name')} />
              <TextField label="Designation" placeholder="Medical Director" {...form.field('designation')} />
            </div>
            <div className={formStyles.row2}>
              <TextField label="Work email" type="email" autoComplete="email" {...form.field('email')} />
              <TextField label="Phone" type="tel" inputMode="tel" autoComplete="tel" {...form.field('phone')} />
            </div>
            <TextArea
              label="Anything else we should know?"
              optional
              placeholder="Rotas, accommodation, preferred qualifications…"
              {...form.field('notes')}
            />
          </>
        )}

        <div className={styles.nav}>
          {step > 0 && (
            <Button variant="ghost" onClick={() => goTo(step - 1)}>
              Back
            </Button>
          )}
          <Button type="submit" size="lg" className={styles.primary}>
            {step < 2 ? 'Continue' : 'Send requirement'}
          </Button>
        </div>
        <p className={styles.note}>
          Prefer to talk? Call <a href={contact.phoneHref}>{contact.phone}</a>.
        </p>
      </form>
    </div>
  );
}
