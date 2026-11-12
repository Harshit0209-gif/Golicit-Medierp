import { useMemo, useRef, useState, type KeyboardEvent, type PointerEvent } from 'react';
import { WORLD_VIEWBOX, worldCountries, type CountryGeometry } from '../../lib/geo/world';
import type { CountrySnapshot } from '../../data/market';
import styles from './Hero.module.css';

const fmt = new Intl.NumberFormat('en-US');

/** Live-openings thresholds for the five fill levels (and the legend). */
export const LEVELS = [0, 50, 200, 500, 1000];
const FILL_PCT = [13, 26, 44, 66, 90];
export const levelOf = (live: number) => LEVELS.reduce((lvl, min, i) => (live >= min ? i : lvl), 0);
export const fillFor = (level: number) => `color-mix(in srgb, var(--map-primary) ${FILL_PCT[level]}%, transparent)`;

/** Countries whose outline is too small to click get a dot marker with a bigger hit area. */
const MARKER_AREA = 40;
/** Only the largest countries carry an inline label (hidden below sm in CSS). */
const LABEL_AREA = 3000;

type Dir = 'ArrowLeft' | 'ArrowRight' | 'ArrowUp' | 'ArrowDown';

interface WorldMapProps {
  countries: CountrySnapshot[];
  /** What the whole hero is showing: hovered ?? pinned. */
  selected: string | null;
  pinned: string | null;
  onHover: (code: string | null) => void;
  onPin: (code: string) => void;
  onOpen: (country: CountrySnapshot) => void;
}

/** True when a focus event came from the keyboard (not a mouse click). */
const isFocusVisible = (el: Element) => {
  try {
    return el.matches(':focus-visible');
  } catch {
    return true;
  }
};

export function WorldMap({ countries, selected, pinned, onHover, onPin, onOpen }: WorldMapProps) {
  const byCode = useMemo(() => new Map(countries.map((c) => [c.code, c])), [countries]);

  // Countries with data are interactive. Big ones first so small ones sit on top and stay clickable.
  const live = useMemo(
    () => worldCountries.filter((g) => byCode.has(g.code)).sort((a, b) => b.area - a.area),
    [byCode],
  );
  // Everything else is one flat, non-focusable base layer.
  const baseD = useMemo(
    () =>
      worldCountries
        .filter((g) => !byCode.has(g.code))
        .map((g) => g.d)
        .join(''),
    [byCode],
  );

  const busiest = useMemo(() => [...countries].sort((a, b) => b.live - a.live)[0]?.code ?? null, [countries]);
  const [tabStop, setTabStop] = useState<string | null>(null);
  const tabCode = tabStop && byCode.has(tabStop) ? tabStop : busiest;

  const nodes = useRef(new Map<string, SVGGElement>());
  const pointerType = useRef<string>('mouse');

  const isMarker = (g: CountryGeometry) => g.area < MARKER_AREA;
  const selectedGeo = selected ? live.find((g) => g.code === selected) : undefined;

  /** Nearest country in the arrow's direction: distance along it + 1.5 × sideways, ignoring anything >2× off-axis. */
  const neighbour = (from: CountryGeometry, key: Dir) => {
    let best: { g: CountryGeometry; score: number } | null = null;
    for (const g of live) {
      if (g.code === from.code) continue;
      const dx = g.labelX - from.labelX;
      const dy = g.labelY - from.labelY;
      const along = key === 'ArrowRight' ? dx : key === 'ArrowLeft' ? -dx : key === 'ArrowDown' ? dy : -dy;
      const side = key === 'ArrowLeft' || key === 'ArrowRight' ? Math.abs(dy) : Math.abs(dx);
      if (along <= 0 || side > 2 * along) continue;
      const score = along + 1.5 * side;
      if (!best || score < best.score) best = { g, score };
    }
    return best?.g ?? null;
  };

  const onKeyDown = (e: KeyboardEvent<SVGGElement>, g: CountryGeometry, c: CountrySnapshot) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onOpen(c);
      return;
    }
    if (e.key.startsWith('Arrow')) {
      e.preventDefault();
      const next = neighbour(g, e.key as Dir);
      if (next) nodes.current.get(next.code)?.focus();
    }
  };

  const onClick = (c: CountrySnapshot) => {
    // Touch needs two taps: the first previews and pins, the second opens.
    if (pointerType.current === 'touch' && pinned !== c.code) onPin(c.code);
    else onOpen(c);
  };

  const hoverable = (e: PointerEvent) => e.pointerType === 'mouse' || e.pointerType === 'pen';

  return (
    <div className={styles.mapWrap}>
      <svg
        viewBox={WORLD_VIEWBOX}
        className={styles.map}
        role="group"
        aria-label="Jobs by country. Use arrow keys to move between countries, Enter to open."
        onPointerLeave={() => onHover(null)}
      >
        <path d={baseD} className={styles.base} />

        {live.map((g) => {
          const c = byCode.get(g.code)!;
          const dim = selected !== null && selected !== g.code;
          return (
            <g
              key={g.code}
              ref={(el) => {
                if (el) nodes.current.set(g.code, el);
                else nodes.current.delete(g.code);
              }}
              role="button"
              tabIndex={tabCode === g.code ? 0 : -1}
              aria-label={`${c.name}: ${fmt.format(c.live)} jobs`}
              className={styles.country}
              style={{ opacity: dim ? 0.4 : 1 }}
              onPointerDown={(e) => (pointerType.current = e.pointerType)}
              onPointerEnter={(e) => hoverable(e) && onHover(g.code)}
              onPointerLeave={(e) => hoverable(e) && onHover(null)}
              onClick={() => onClick(c)}
              onKeyDown={(e) => onKeyDown(e, g, c)}
              onFocus={(e) => {
                setTabStop(g.code);
                if (isFocusVisible(e.currentTarget)) onPin(g.code);
              }}
            >
              <path d={g.d} style={{ fill: fillFor(levelOf(c.live)) }} />
              {isMarker(g) && <circle cx={g.labelX} cy={g.labelY} r={12} className={styles.hit} />}
            </g>
          );
        })}

        {/* Markers for the small countries, drawn above everything and inert. */}
        <g pointerEvents="none">
          {live.filter(isMarker).map((g) => (
            <circle
              key={g.code}
              cx={g.labelX}
              cy={g.labelY}
              r={5.5}
              className={styles.marker}
              style={{
                fill: fillFor(4),
                opacity: selected !== null && selected !== g.code ? 0.4 : 1,
              }}
            />
          ))}
          {live
            .filter((g) => g.area >= LABEL_AREA)
            .map((g) => (
              <text key={g.code} x={g.labelX} y={g.labelY} className={styles.code}>
                {g.code}
              </text>
            ))}
        </g>

        {/* The selection outline is its own layer so it always sits above neighbours. */}
        {selectedGeo && (
          <g pointerEvents="none">
            {isMarker(selectedGeo) ? (
              <circle cx={selectedGeo.labelX} cy={selectedGeo.labelY} r={9} className={styles.ring} />
            ) : (
              <path d={selectedGeo.d} className={styles.outline} vectorEffect="non-scaling-stroke" />
            )}
          </g>
        )}
      </svg>

      <div className={styles.legend} aria-hidden="true">
        <span>&lt;{LEVELS[1]}</span>
        <span className={styles.swatches}>
          {FILL_PCT.map((_, i) => (
            <i key={i} style={{ background: fillFor(i) }} />
          ))}
        </span>
        <span>{LEVELS[4] / 1000}k+</span>
      </div>
    </div>
  );
}
