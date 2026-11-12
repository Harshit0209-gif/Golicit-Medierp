import { Link } from 'react-router';
import { Mail, MapPin, Phone } from 'lucide-react';
import { contact } from '../../data/content';
import { InstagramIcon, LinkedInIcon, YouTubeIcon } from '../ui/icons';
import { Logo } from '../ui/Logo';
import styles from './SiteFooter.module.css';

const columns = [
  {
    title: 'For doctors',
    links: [
      { label: 'Search jobs', to: '/jobs' },
      { label: 'Locum and part-time posts', to: '/jobs?type=Locum' },
      { label: 'Create your profile', to: '/doctors#register' },
      { label: 'How verification works', to: '/doctors#how-it-works' },
    ],
  },
  {
    title: 'For hospitals',
    links: [
      { label: 'Post a requirement', to: '/hospitals#requirement' },
      { label: 'What we recruit for', to: '/hospitals#services' },
      { label: 'Fees and guarantee', to: '/hospitals#faq' },
    ],
  },
  {
    title: 'MedRecruit',
    links: [
      { label: 'About us', to: '/about' },
      { label: 'Contact', to: '/contact' },
    ],
  },
];

/** PLACEHOLDER social profile URLs. */
const social = [
  { label: 'MedRecruit on LinkedIn', href: 'https://www.linkedin.com/', Icon: LinkedInIcon },
  { label: 'MedRecruit on Instagram', href: 'https://www.instagram.com/', Icon: InstagramIcon },
  { label: 'MedRecruit on YouTube', href: 'https://www.youtube.com/', Icon: YouTubeIcon },
];

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={`wrap ${styles.grid}`}>
        <div className={styles.brand}>
          <Logo inverse />
          <p className={styles.blurb}>
            Recruitment for hospitals and medical colleges across India, run by people who know the difference between
            a DNB and a fellowship.
          </p>
          <ul role="list" className={styles.contact}>
            <li>
              <Phone aria-hidden="true" />
              <a href={contact.phoneHref}>{contact.phone}</a>
            </li>
            <li>
              <Mail aria-hidden="true" />
              <a href={`mailto:${contact.email}`}>{contact.email}</a>
            </li>
            <li>
              <MapPin aria-hidden="true" />
              <span>{contact.address.join(', ')}</span>
            </li>
          </ul>
        </div>

        {columns.map((col) => (
          <nav key={col.title} className={styles.col} aria-label={col.title}>
            <h2 className={styles.colTitle}>{col.title}</h2>
            <ul role="list">
              {col.links.map((link) => (
                <li key={link.label}>
                  <Link to={link.to}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <div className={`wrap ${styles.bottom}`}>
        <p>© {new Date().getFullYear()} MedRecruit. Job listings, institutions and figures shown are sample data.</p>
        <ul role="list" className={styles.social}>
          {social.map(({ label, href, Icon }) => (
            <li key={label}>
              <a href={href} aria-label={label} target="_blank" rel="noopener noreferrer">
                <Icon />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
