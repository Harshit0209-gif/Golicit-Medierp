import { useEffect, useState } from 'react';
import { Menu, UserRound, X } from 'lucide-react';
import { navLinks, routes } from '../../data/siteContent';
import { useScrollSpy } from '../../hooks/useScrollSpy';
import { Logo } from '../ui/Logo';
import './Navbar.css';

const sectionIds = navLinks.map((link) => link.sectionId);

/** Login / Register / Post a Requirement – shared by the desktop bar and the mobile menu. */
function NavActions({ className, onNavigate }: { className: string; onNavigate?: () => void }) {
  return (
    <div className={className}>
      <a href={routes.login} className="navbar__login" onClick={onNavigate}>
        <UserRound aria-hidden="true" />
        Login
      </a>
      <a href={routes.register} className="navbar__btn navbar__btn--outline" onClick={onNavigate}>
        Register
      </a>
      <a href={routes.postRequirement} className="navbar__btn navbar__btn--solid" onClick={onNavigate}>
        Post a Requirement
      </a>
    </div>
  );
}

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const activeId = useScrollSpy(sectionIds);

  // Subtle shadow once the page scrolls under the sticky bar.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // While the mobile menu is open: Escape closes it, resizing to desktop closes it, and the page is scroll-locked.
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMenuOpen(false);
    const desktop = window.matchMedia('(min-width: 1181px)');
    const onChange = () => desktop.matches && setMenuOpen(false);
    document.addEventListener('keydown', onKey);
    desktop.addEventListener('change', onChange);
    document.body.classList.add('nav-locked');
    return () => {
      document.removeEventListener('keydown', onKey);
      desktop.removeEventListener('change', onChange);
      document.body.classList.remove('nav-locked');
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);
  const linkState = (sectionId: string) => (activeId === sectionId ? 'is-active' : '');

  return (
    <>
      <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
        <div className="navbar__inner container">
          <Logo />

          <nav className="navbar__nav" aria-label="Primary">
            <ul className="navbar__links">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className={`navbar__link ${linkState(link.sectionId)}`}
                    aria-current={activeId === link.sectionId ? 'location' : undefined}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <NavActions className="navbar__actions" />

          <button
            type="button"
            className="navbar__toggle"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>

        {/* Tablet & mobile menu */}
        <div id="mobile-menu" className={`mobile-menu ${menuOpen ? 'is-open' : ''}`} hidden={!menuOpen}>
          <nav aria-label="Mobile">
            <ul className="mobile-menu__links">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className={`mobile-menu__link ${linkState(link.sectionId)}`}
                    onClick={closeMenu}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <NavActions className="mobile-menu__actions" onNavigate={closeMenu} />
        </div>
      </header>

      {/* Sibling of the header so it can sit beneath the sticky bar (z-index 49 vs 50). */}
      {menuOpen && <div className="mobile-menu__scrim" onClick={closeMenu} aria-hidden="true" />}
    </>
  );
}
