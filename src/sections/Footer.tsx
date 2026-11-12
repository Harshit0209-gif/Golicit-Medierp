import { brand, contact, footer } from '../data/content';
import { Logo } from '../components/Logo';
import styles from './Footer.module.css';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="wrap">
        <div className={styles.top}>
          <div className={styles.brand}>
            <Logo tone="light" />
            <p className={styles.statement}>
              Specialist recruitment for hospitals, medical colleges and the clinicians who work in them.
            </p>
          </div>

          {footer.columns.map((col) => (
            <nav key={col.title} className={styles.col} aria-label={col.title}>
              <h2 className={styles.colTitle}>{col.title}</h2>
              <ul role="list">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a href={l.href}>{l.label}</a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className={styles.contact}>
          <a href={contact.phoneHref}>{contact.phone}</a>
          <a href={`mailto:${contact.email}`}>{contact.email}</a>
          <span>{contact.address.join(', ')}</span>
        </div>

        <div className={styles.bottom}>
          <p>
            © {new Date().getFullYear()} {brand.name}. All rights reserved.
          </p>
          <p className={styles.powered}>Powered by GoLicit</p>
          <ul role="list" className={styles.inline}>
            {footer.legal.map((l) => (
              <li key={l.label}>
                <a href={l.href}>{l.label}</a>
              </li>
            ))}
          </ul>
          <ul role="list" className={styles.inline} aria-label="Social media">
            {footer.social.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noopener noreferrer">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
