import { useState } from 'react';
import { CircleCheck } from 'lucide-react';
import { specialties } from '../../data/specialties';
import { email, indianMobile, required, useForm } from '../../lib/useForm';
import { Button } from '../ui/Button';
import { SelectField, TextField } from '../ui/Field';
import styles from './Forms.module.css';

export function RegisterForm() {
  const [done, setDone] = useState(false);
  const form = useForm(
    {
      name: '',
      email: '',
      phone: '',
      specialty: '',
      qualification: '',
      experience: '',
      cities: '',
      registration: '',
      hidden: 'yes',
    },
    {
      name: [required('Enter your full name')],
      email: [required('Enter your email address'), email],
      phone: [required('Enter your mobile number'), indianMobile],
      specialty: [required('Choose your department')],
      qualification: [required('Choose your highest qualification')],
      experience: [required('Choose your years of experience')],
    },
  );

  if (done) {
    return (
      <div className={styles.success} role="status">
        <CircleCheck aria-hidden="true" />
        <h3>Profile created</h3>
        <p>
          Welcome, {form.values.name.split(' ')[0]}. We will email you a link to upload your registration and degree
          certificates. Once they are verified, you can apply to any post in two minutes.
        </p>
        <Button to={`/jobs?specialty=${form.values.specialty}`} variant="dark">
          See posts in your department
        </Button>
      </div>
    );
  }

  return (
    <form className={styles.form} noValidate onSubmit={form.handleSubmit(() => setDone(true))}>
      <div className={styles.row2}>
        <TextField label="Full name" autoComplete="name" {...form.field('name')} />
        <TextField label="Mobile number" type="tel" inputMode="tel" autoComplete="tel" {...form.field('phone')} />
      </div>
      <TextField label="Email" type="email" autoComplete="email" {...form.field('email')} />
      <div className={styles.row2}>
        <SelectField label="Department" {...form.field('specialty')}>
          <option value="">Choose a department</option>
          {specialties.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
        </SelectField>
        <SelectField label="Highest qualification" {...form.field('qualification')}>
          <option value="">Choose a qualification</option>
          <option>MBBS</option>
          <option>MD, MS or DNB</option>
          <option>DM, MCh or DrNB</option>
          <option>Fellowship</option>
          <option>B.Sc, GNM or M.Sc Nursing</option>
          <option>Allied health degree or diploma</option>
        </SelectField>
      </div>
      <div className={styles.row2}>
        <SelectField label="Experience after qualification" {...form.field('experience')}>
          <option value="">Choose a range</option>
          <option>Less than 2 years</option>
          <option>2 to 5 years</option>
          <option>5 to 10 years</option>
          <option>More than 10 years</option>
        </SelectField>
        <TextField
          label="Cities you would work in"
          optional
          placeholder="Pune, Mumbai, Bengaluru"
          {...form.field('cities')}
        />
      </div>
      <TextField
        label="Council registration number"
        optional
        hint="You can add this later. We need it before your first application."
        {...form.field('registration')}
      />
      <div className={styles.consent}>
        <label>
          <input
            type="checkbox"
            checked={form.values.hidden === 'yes'}
            onChange={(e) => form.setValues((prev) => ({ ...prev, hidden: e.target.checked ? 'yes' : '' }))}
          />
          <span>Hide my profile from my current employer</span>
        </label>
      </div>
      <Button type="submit" size="lg" variant="dark">
        Create profile
      </Button>
    </form>
  );
}
