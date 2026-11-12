import { useEffect, useState } from 'react';

/**
 * Tracks which of the given section ids is currently in view, so the matching
 * navigation link can be highlighted. The first id is the default.
 */
export function useScrollSpy(sectionIds: string[], offset = 120) {
  const [activeId, setActiveId] = useState(sectionIds[0] ?? '');
  const key = sectionIds.join('|');

  useEffect(() => {
    const ids = key.split('|');
    let frame = 0;

    const update = () => {
      frame = 0;
      const scrollBottom = window.scrollY + window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;

      // At the very bottom, the last section wins even if it is short.
      if (docHeight - scrollBottom < 4) {
        setActiveId(ids[ids.length - 1]);
        return;
      }

      let current = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top - offset <= 0) current = id;
      }
      setActiveId(current);
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
  }, [key, offset]);

  return activeId;
}
