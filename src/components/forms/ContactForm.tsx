import { useState } from 'react';
import { CircleCheck } from 'lucide-react';
import { email, indianMobile, required, useForm } from '../../lib/useForm';
import { Button } from '../ui/Button';
import { SelectField, TextArea, TextField } from '../ui/Field';
import styles from './Forms.module.css';

export function ContactForm() {
  const [sent, setSent] = useState(false);
  const form = useForm(
    { name: '', email: '', phone: '', topic: '', message: '' },
    {
      name: [required('Enter your name')],
      email: [required('Enter your email address'), email],
      phone: [indianMobile],
      topic: [required('Choose what your message is about')],
      message: [
        required('Enter your message'),
        (v) => (v.trim().length < 10 ? 'Add a little more detail so we can route your message' : undefined),
      ],
    },
  );

  if (sent) {
    return (
      <div className={styles.success} role="status">
        <CircleCheck aria-hidden="true" />
        <h3>Message sent</h3>
        <p>Thanks, {form.values.name.split(' ')[0]}. We reply to every message within one working day.</p>
        <Button
          variant="outline"
          onClick={() => {
            form.reset();
            setSent(false);
          }}
        >
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <form className={styles.form} noValidate onSubmit={form.handleSubmit(() => setSent(true))}>
      <div className={styles.row2}>
        <TextField label="Name" autoComplete="name" {...form.field('name')} />
        <TextField label="Email" type="email" autoComplete="email" {...form.field('email')} />
      </div>
      <div className={styles.row2}>
        <TextField label="Phone" type="tel" inputMode="tel" autoComplete="tel" optional {...form.field('phone')} />
        <SelectField label="This is about" {...form.field('topic')}>
          <option value="">Choose a topic</option>
          <option>Finding a job</option>
          <option>Hiring for my hospital or college</option>
          <option>My application or profile</option>
          <option>Partnerships and press</option>
          <option>Something else</option>
        </SelectField>
      </div>
      <TextArea label="Message" rows={6} {...form.field('message')} />
      <Button type="submit" size="lg" variant="dark">
        Send message
      </Button>
    </form>
  );
}
