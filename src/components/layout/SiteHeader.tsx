import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router';
import { Menu, X } from 'lucide-react';
import { navLinks } from '../../data/content';
import { Button } from '../ui/Button';
import { Logo } from '../ui/Logo';
import styles from './SiteHeader.module.css';

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  // Close the menu whenever the route changes.
  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    const desktop = window.matchMedia('(min-width: 1024px)');
    const onResize = () => desktop.matches && setOpen(false);
    document.addEventListener('keydown', onKey);
    desktop.addEventListener('change', onResize);
    document.documentElement.classList.add('scroll-locked');
    return () => {
      document.removeEventListener('keydown', onKey);
      desktop.removeEventListener('change', onResize);
      document.documentElement.classList.remove('scroll-locked');
    };
  }, [open]);

  return (
    <>
      <header className={styles.header}>
        <div className={`wrap ${styles.inner}`}>
          <Logo />

          <nav className={styles.nav} aria-label="Main">
            <ul role="list" className={styles.links}>
              {navLinks.map((link) => (
                <li key={link.to}>
                  <NavLink to={link.to} className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ''}`}>
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className={styles.actions}>
            <Button to="/hospitals#requirement" size="sm">
              Post a requirement
            </Button>
          </div>

          <button
            type="button"
            className={styles.toggle}
            aria-expanded={open}
            aria-controls="site-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>

        <div id="site-menu" className={styles.menu} hidden={!open}>
          <nav aria-label="Main">
            <ul role="list">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    className={({ isActive }) => `${styles.menuLink} ${isActive ? styles.menuActive : ''}`}
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
          <Button to="/hospitals#requirement" block>
            Post a requirement
          </Button>
        </div>
      </header>
      {open && <div className={styles.scrim} onClick={() => setOpen(false)} aria-hidden="true" />}
    </>
  );
}
