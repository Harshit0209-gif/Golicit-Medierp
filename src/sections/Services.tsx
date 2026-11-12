import { useCallback, useEffect, useRef, useState } from 'react';
import { services } from '../data/content';
import { Arrow } from '../components/Action';
import { useEnquiry } from '../components/Enquiry';
import styles from './Services.module.css';

export function Services() {
  const track = useRef<HTMLUListElement>(null);
  const [progress, setProgress] = useState(0);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const [current, setCurrent] = useState(0);
  const { open } = useEnquiry();

  // Keep arrows, counter and progress bar in step with the scroll position.
  const sync = useCallback(() => {
    const el = track.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setProgress(max > 0 ? el.scrollLeft / max : 1);
    setAtStart(el.scrollLeft <= 2);
    setAtEnd(el.scrollLeft >= max - 2);
    const card = el.querySelector<HTMLElement>('li');
    const step = card ? card.offsetWidth + parseFloat(getComputedStyle(el).columnGap || '0') : el.clientWidth;
    // At the end several cards are visible at once; count the last one as current.
    const end = el.scrollLeft >= max - 2;
    setCurrent(end ? services.length - 1 : Math.min(services.length - 1, Math.round(el.scrollLeft / step)));
  }, []);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    sync();
    el.addEventListener('scroll', sync, { passive: true });
    window.addEventListener('resize', sync);
    return () => {
      el.removeEventListener('scroll', sync);
      window.removeEventListener('resize', sync);
    };
  }, [sync]);

  const move = (dir: 1 | -1) => {
    const el = track.current;
    const card = el?.querySelector<HTMLElement>('li');
    if (!el || !card) return;
    const step = card.offsetWidth + parseFloat(getComputedStyle(el).columnGap || '0');
    el.scrollBy({ left: dir * step, behavior: 'smooth' });
  };

  // Drag to scroll with a mouse; touch and trackpads scroll natively.
  const drag = useRef<{ x: number; left: number; moved: boolean } | null>(null);
  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType !== 'mouse' || !track.current) return;
    drag.current = { x: e.clientX, left: track.current.scrollLeft, moved: false };
  };
  const onPointerMove = (e: React.PointerEvent) => {
    const d = drag.current;
    if (!d || !track.current) return;
    const dx = e.clientX - d.x;
    if (Math.abs(dx) > 4) {
      d.moved = true;
      track.current.classList.add(styles.dragging);
    }
    track.current.scrollLeft = d.left - dx;
  };
  const endDrag = () => {
    track.current?.classList.remove(styles.dragging);
    // Let the click that ends a drag be swallowed, then reset.
    setTimeout(() => (drag.current = null), 0);
  };

  return (
    <section id="services" className={`${styles.section} on-dark`} aria-labelledby="services-title">
      <div className="wrap">
        <header className={styles.head}>
          <p className="marker">Recruitment services</p>
          <h2 id="services-title" className={styles.title}>
            Eight practices, each run by consultants who know the work.
          </h2>
          <div className={styles.controls}>
            <p className={styles.counter} aria-live="polite">
              <span>{String(current + 1).padStart(2, '0')}</span>
              <span className={styles.of}> / {String(services.length).padStart(2, '0')}</span>
            </p>
            <button type="button" className={styles.arrow} onClick={() => move(-1)} disabled={atStart} aria-label="Previous services">
              <Arrow />
            </button>
            <button type="button" className={styles.arrow} onClick={() => move(1)} disabled={atEnd} aria-label="Next services">
              <Arrow />
            </button>
          </div>
        </header>
      </div>

      <ul
        ref={track}
        role="list"
        className={styles.track}
        aria-label="Recruitment services"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'ArrowRight') (e.preventDefault(), move(1));
          if (e.key === 'ArrowLeft') (e.preventDefault(), move(-1));
        }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
        onClickCapture={(e) => {
          if (drag.current?.moved) e.preventDefault(), e.stopPropagation();
        }}
      >
        {services.map((s, i) => (
          <li key={s.id} className={styles.card}>
            <article className={styles.cardInner} aria-labelledby={`svc-${s.id}`}>
              <div className={styles.cardTop}>
                <span className={styles.number} aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className={styles.engagement}>{s.engagement}</span>
              </div>
              <h3 id={`svc-${s.id}`} className={styles.cardTitle}>
                {s.title}
              </h3>
              <p className={styles.summary}>{s.summary}</p>
              <div className={styles.roles}>
                <p className={styles.rolesTitle}>Typical roles</p>
                <ul role="list">
                  {s.roles.map((r) => (
                    <li key={r}>{r}</li>
                  ))}
                </ul>
              </div>
              <button type="button" className={styles.cta} onClick={() => open('institution')}>
                <span>Discuss this service</span>
                <Arrow />
              </button>
            </article>
          </li>
        ))}
      </ul>

      <div className="wrap">
        <div className={styles.progress} aria-hidden="true">
          <span style={{ transform: `scaleX(${Math.max(0.08, progress)})` }} />
        </div>
      </div>
    </section>
  );
}
