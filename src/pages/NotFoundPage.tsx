import { Button } from '../components/ui/Button';

export default function NotFoundPage() {
  return (
    <section className="wrap section" style={{ display: 'grid', justifyItems: 'start', gap: 'var(--s-4)' }}>
      <title>Page not found – MedRecruit</title>
      <h1 style={{ fontSize: 'var(--fs-4xl)', maxWidth: '16ch' }}>We could not find that page.</h1>
      <p style={{ maxWidth: '48ch', color: 'var(--ink-2)', fontSize: 'var(--fs-lg)' }}>
        The link may be old, or the page may have moved. These will get you back on track.
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--s-3)', marginTop: 'var(--s-3)' }}>
        <Button to="/jobs">Search jobs</Button>
        <Button to="/hospitals#requirement" variant="outline">
          Post a requirement
        </Button>
        <Button to="/" variant="ghost">
          Go to the home page
        </Button>
      </div>
    </section>
  );
}
