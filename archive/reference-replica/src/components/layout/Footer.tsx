import { Mail, MapPin, Phone } from 'lucide-react';
import { brand, footer } from '../../data/siteContent';
import { socialIconMap } from '../icons/SocialIcons';
import { Logo } from '../ui/Logo';
import './Footer.css';

export function Footer() {
  const year = new Date().getFullYear();
  const { contact } = footer;

  return (
    <footer id="contact" className="footer">
      <div className="footer__inner container">
        <div className="footer__grid">
          <div className="footer__brand">
            <Logo variant="light" className="footer__logo" />
            <p className="footer__about">{brand.description}</p>
            <ul className="footer__social" aria-label="Social media">
              {footer.social.map(({ network, label, href }) => {
                const Icon = socialIconMap[network];
                return (
                  <li key={network}>
                    <a href={href} aria-label={label} target="_blank" rel="noopener noreferrer">
                      <Icon />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          <span className="footer__divider" aria-hidden="true" />

          <nav className="footer__col footer__col--links" aria-labelledby="footer-quick-links">
            <h2 id="footer-quick-links" className="footer__heading">
              Quick Links
            </h2>
            <ul className="footer__list">
              {footer.quickLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </nav>

          <nav className="footer__col footer__col--services" aria-labelledby="footer-services">
            <h2 id="footer-services" className="footer__heading">
              Recruitment Services
            </h2>
            <ul className="footer__list">
              {footer.services.map((link) => (
                <li key={link.label}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </nav>

          <span className="footer__divider" aria-hidden="true" />

          <div className="footer__col footer__col--contact">
            <h2 className="footer__heading">Contact Us</h2>
            <address className="footer__contact">
              <p className="footer__contact-item">
                <MapPin aria-hidden="true" />
                <span>
                  {contact.addressLines.map((line) => (
                    <span key={line} className="footer__line">
                      {line}
                    </span>
                  ))}
                </span>
              </p>
              <a className="footer__contact-item" href={contact.phoneHref}>
                <Phone aria-hidden="true" />
                <span>{contact.phone}</span>
              </a>
              <a className="footer__contact-item" href={`mailto:${contact.email}`}>
                <Mail aria-hidden="true" />
                <span>{contact.email}</span>
              </a>
            </address>
          </div>
        </div>

        <div className="footer__bottom">
          <p>
            © {year} {brand.name}. All rights reserved.
          </p>
          <ul className="footer__legal">
            {footer.legal.map((link) => (
              <li key={link.label}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
