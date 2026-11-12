import { Suspense, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router';
import { SiteFooter } from './SiteFooter';
import { SiteHeader } from './SiteHeader';

/**
 * Scrolls to the top on navigation, or to the #hash target once it has rendered
 * (pages are lazy-loaded, so the target may appear a few frames later).
 */
function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: 'instant' });
      return;
    }
    let frame = 0;
    let tries = 0;
    const find = () => {
      const target = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (target) {
        target.scrollIntoView({ block: 'start' });
      } else if (tries++ < 60) {
        frame = requestAnimationFrame(find);
      }
    };
    find();
    return () => cancelAnimationFrame(frame);
  }, [pathname, hash]);

  return null;
}

export function Layout() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <ScrollManager />
      <SiteHeader />
      <main id="main" tabIndex={-1}>
        <Suspense fallback={<div style={{ minHeight: '100vh' }} aria-busy="true" />}>
          <Outlet />
        </Suspense>
      </main>
      <SiteFooter />
    </>
  );
}
