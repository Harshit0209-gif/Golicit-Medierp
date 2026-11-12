import { useEffect, useState } from 'react';
import { links, nav } from '../data/content';

import { useEnquiry } from '../components/Enquiry';
import { Logo } from '../components/Logo';
import { useScrollState } from '../hooks/useScrollState';
import styles from './Header.module.css';

// Every landmark section in page order, so a nav item is only marked while its own section is on screen.
const sectionIds = ['top', 'about', 'services', 'specialisations', 'process', 'institutions', 'professionals', 'testimonials', 'enquiry'];

export function Header() {
  const { scrolled, active } = useScrollState(sectionIds);
  const [menuOpen, setMenuOpen] = useState(false);
  const { open } = useEnquiry();
  const solid = scrolled || menuOpen;

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMenuOpen(false);
    const wide = window.matchMedia('(min-width: 1100px)');
    const onWide = () => wide.matches && setMenuOpen(false);
    document.addEventListener('keydown', onKey);
    wide.addEventListener('change', onWide);
    document.documentElement.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      wide.removeEventListener('change', onWide);
      document.documentElement.style.overflow = '';
    };
  }, [menuOpen]);

  const enquire = (e: React.MouseEvent) => {
    e.preventDefault();
    setMenuOpen(false);
    open('institution');
  };

  const signIn = (e: React.MouseEvent) => {
    e.preventDefault();
    setMenuOpen(false);
    open('professional');
  };

  return (
    <header className={`${styles.header} ${solid ? styles.solid : ''} ${menuOpen ? styles.menuOpen : ''}`}>
      <div className={`wrap ${styles.bar}`}>
        <Logo tone={solid && !menuOpen ? 'dark' : 'light'} />

        <nav className={styles.nav} aria-label="Main">
          <ul role="list">
            {nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className={active === item.section ? styles.current : undefined}
                  aria-current={active === item.section ? 'true' : undefined}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.actions}>
          <a href={links.login} className={styles.account} onClick={signIn}>
            Login / Register
          </a>
          <a href={links.contact} className={styles.enquiry} onClick={enquire}>
            Recruitment enquiry
          </a>
        </div>

        <button
          type="button"
          className={styles.toggle}
          aria-expanded={menuOpen}
          aria-controls="menu"
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span className="visually-hidden">{menuOpen ? 'Close menu' : 'Open menu'}</span>
          <span className={styles.burger} aria-hidden="true" />
        </button>
      </div>

      <div id="menu" className={styles.menu} hidden={!menuOpen}>
        <nav aria-label="Menu" className="wrap">
          <ul role="list" className={styles.menuList}>
            {nav.map((item, i) => (
              <li key={item.href} style={{ '--i': i } as React.CSSProperties}>
                <a href={item.href} onClick={() => setMenuOpen(false)}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <div className={styles.menuActions}>
            <a href={links.contact} className={styles.enquiry} onClick={enquire}>
              Recruitment enquiry
            </a>
            <a href={links.login} className={styles.account} onClick={signIn}>
              Login / Register
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
