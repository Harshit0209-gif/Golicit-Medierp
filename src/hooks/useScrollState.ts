import { useEffect, useState } from 'react';

/**
 * Tracks whether the page has scrolled past `threshold` and which of the given
 * section ids is currently under the header.
 */
export function useScrollState(sectionIds: string[], threshold = 24) {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('');
  const key = sectionIds.join('|');

  useEffect(() => {
    const ids = key.split('|');
    let frame = 0;

    const update = () => {
      frame = 0;
      setScrolled(window.scrollY > threshold);
      const probe = window.innerHeight * 0.35;
      let current = '';
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= probe) current = id;
      }
      // At the very bottom the last section wins.
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) {
        current = ids[ids.length - 1];
      }
      setActive(current);
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [key, threshold]);

  return { scrolled, active };
}
