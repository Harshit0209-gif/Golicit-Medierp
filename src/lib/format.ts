import type { Job } from '../data/jobs';

const inr = new Intl.NumberFormat('en-IN');

/** "₹36–54 LPA" or "₹12,000–18,000 per shift" */
export function formatSalary(salary: Job['salary']): string {
  if (salary.unit === 'shift') {
    return `₹${inr.format(salary.min)}–${inr.format(salary.max)} per shift`;
  }
  const fmt = (value: number) => (Number.isInteger(value) ? String(value) : value.toFixed(1));
  return `₹${fmt(salary.min)}–${fmt(salary.max)} LPA`;
}

export function formatExperience({ min, max }: Job['experience']): string {
  if (min === 0) return max <= 1 ? 'Freshers welcome' : `Up to ${max} years`;
  return `${min}–${max} years`;
}

export function formatPosted(daysAgo: number): string {
  if (daysAgo === 0) return 'Posted today';
  if (daysAgo === 1) return 'Posted yesterday';
  if (daysAgo < 7) return `Posted ${daysAgo} days ago`;
  const weeks = Math.floor(daysAgo / 7);
  return `Posted ${weeks} week${weeks > 1 ? 's' : ''} ago`;
}

export function pluralise(count: number, singular: string, plural = `${singular}s`) {
  return `${count.toLocaleString('en-IN')} ${count === 1 ? singular : plural}`;
}

/** Two-letter monogram for an institution, used where no logo is available. */
export function monogram(name: string): string {
  const words = name.replace(/[^A-Za-z ]/g, '').split(' ').filter(Boolean);
  return (words[0][0] + (words[1]?.[0] ?? '')).toUpperCase();
}
