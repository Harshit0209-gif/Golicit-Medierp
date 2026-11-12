import { useId } from 'react';
import { brand, routes } from '../../data/siteContent';
import './Logo.css';

interface LogoMarkProps {
  variant?: 'colour' | 'light';
  className?: string;
}

/** Medical cross with an orbiting swoosh. */
export function LogoMark({ variant = 'colour', className }: LogoMarkProps) {
  const gradientId = useId();
  const isLight = variant === 'light';
  const crossFill = isLight ? '#ffffff' : `url(#${gradientId})`;
  const swoosh = isLight ? '#0c263a' : '#ffffff';
  const orbit = isLight ? '#ffffff' : '#18a29b';

  return (
    <svg
      className={className}
      viewBox="0 0 54 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={gradientId} x1="10" y1="2" x2="44" y2="42" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#1fa59c" />
          <stop offset="1" stopColor="#0a7f80" />
        </linearGradient>
      </defs>
      {/* cross */}
      <path
        d="M20 6.5A3.5 3.5 0 0 1 23.5 3h7A3.5 3.5 0 0 1 34 6.5V14h7.5a3.5 3.5 0 0 1 3.5 3.5v7a3.5 3.5 0 0 1-3.5 3.5H34v8.5a3.5 3.5 0 0 1-3.5 3.5h-7a3.5 3.5 0 0 1-3.5-3.5V28h-7.5A3.5 3.5 0 0 1 9 24.5v-7A3.5 3.5 0 0 1 12.5 14H20V6.5Z"
        fill={crossFill}
      />
      {/* orbit under the cross */}
      <path
        d="M10.5 22.6C4.6 25.6 2.4 28.9 4.8 30.6c3.5 2.5 15.6.4 27.7-5.1"
        stroke={orbit}
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      {/* swoosh across the cross */}
      <path
        d="M7.2 29.6c9.8.8 22-4.2 31.6-11.6 3.1-2.4 6.6-3.6 9.2-2.4-2.4-.1-5 1.1-7.9 3.5C30.4 27.2 17.6 31.4 7.2 29.6Z"
        fill={swoosh}
      />
      <path
        d="M41.5 16.2c3.3-2.3 7-3 8.6-1.5 1.3 1.3-.5 4-4 6.6"
        stroke={orbit}
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

interface LogoProps {
  variant?: 'colour' | 'light';
  className?: string;
}

/** Full lock-up: mark + wordmark + tagline, linking home. */
export function Logo({ variant = 'colour', className = '' }: LogoProps) {
  return (
    <a
      href={routes.home}
      className={`logo logo--${variant} ${className}`.trim()}
      aria-label={`${brand.name} – ${brand.tagline}, home`}
    >
      <LogoMark variant={variant} className="logo__mark" />
      <span className="logo__text" aria-hidden="true">
        <span className="logo__name">{brand.name}</span>
        <span className="logo__tagline">{brand.tagline}</span>
      </span>
    </a>
  );
}
