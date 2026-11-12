/**
 * Dismisses the stethoscope loading screen defined in index.html once the page
 * is ready to show: fonts loaded and the hero photograph decoded. It stays up
 * for a minimum time so the drawing completes, and never longer than a cap so a
 * slow image can't hold the page hostage.
 */
// Long enough for the stethoscope to finish drawing and pulse once.
const MIN_MS = 2100;
const MAX_MS = 4000;

const heroImageReady = () =>
  new Promise<void>((resolve) => {
    const img = document.querySelector<HTMLImageElement>('#top img');
    if (!img || img.complete) return resolve();
    img.addEventListener('load', () => resolve(), { once: true });
    img.addEventListener('error', () => resolve(), { once: true });
  });

export function dismissLoader() {
  const loader = document.getElementById('loader');
  const root = document.documentElement;
  const started = performance.now();
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const minimum = reduced ? 300 : MIN_MS;

  const finish = () => {
    window.scrollTo(0, 0);
    root.classList.remove('is-loading');
    if (!loader) return;
    loader.classList.add('is-done');
    loader.setAttribute('aria-hidden', 'true');
    loader.addEventListener('transitionend', () => loader.remove(), { once: true });
    window.setTimeout(() => loader.remove(), 1200); // in case transitionend never fires
  };

  let done = false;
  const once = () => {
    if (done) return;
    done = true;
    finish();
  };

  Promise.all([document.fonts?.ready ?? Promise.resolve(), heroImageReady()]).then(() => {
    const wait = Math.max(0, minimum - (performance.now() - started));
    window.setTimeout(once, wait);
  });
  window.setTimeout(once, MAX_MS);
}
