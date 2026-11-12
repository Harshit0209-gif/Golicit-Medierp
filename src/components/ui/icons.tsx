import type { SVGProps } from 'react';
import type { LucideIcon } from 'lucide-react';

export type IconComponent = LucideIcon | ((props: IconProps) => React.JSX.Element);

interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number | string;
  strokeWidth?: number | string;
}

/** Nurse cap with a cross, drawn on Lucide's 24px grid. */
export function NurseCapIcon({ size = 24, strokeWidth = 2, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M2.5 8.2C8.6 4.6 15.4 4.6 21.5 8.2L19 16.5C14.4 14.6 9.6 14.6 5 16.5Z" />
      <path d="M12 8.4v4.6M9.7 10.7h4.6" />
    </svg>
  );
}

const brand = (size: number, props: SVGProps<SVGSVGElement>) => ({
  xmlns: 'http://www.w3.org/2000/svg',
  width: size,
  height: size,
  viewBox: '0 0 24 24',
  fill: 'currentColor',
  'aria-hidden': true as const,
  ...props,
});

type BrandProps = SVGProps<SVGSVGElement> & { size?: number };

export function LinkedInIcon({ size = 18, ...props }: BrandProps) {
  return (
    <svg {...brand(size, props)}>
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.75h3.96V21H3V9.75Zm6.46 0h3.8v1.54h.05c.53-1 1.82-2.05 3.75-2.05 4 0 4.74 2.63 4.74 6.06V21h-3.96v-5.06c0-1.2-.02-2.76-1.68-2.76-1.69 0-1.95 1.32-1.95 2.67V21H9.46V9.75Z" />
    </svg>
  );
}

export function InstagramIcon({ size = 18, ...props }: BrandProps) {
  return (
    <svg {...brand(size, { ...props, fill: 'none', stroke: 'currentColor', strokeWidth: 2.2 })}>
      <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" />
      <circle cx="12" cy="12" r="4.3" />
      <circle cx="17.6" cy="6.4" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function YouTubeIcon({ size = 18, ...props }: BrandProps) {
  return (
    <svg {...brand(size, props)}>
      <path d="M23.5 6.2a3.02 3.02 0 0 0-2.12-2.14C19.5 3.55 12 3.55 12 3.55s-7.5 0-9.38.5A3.02 3.02 0 0 0 .5 6.2C0 8.08 0 12 0 12s0 3.92.5 5.8a3.02 3.02 0 0 0 2.12 2.14c1.88.5 9.38.5 9.38.5s7.5 0 9.38-.5a3.02 3.02 0 0 0 2.12-2.14c.5-1.88.5-5.8.5-5.8s0-3.92-.5-5.8ZM9.6 15.57V8.43L15.82 12 9.6 15.57Z" />
    </svg>
  );
}
