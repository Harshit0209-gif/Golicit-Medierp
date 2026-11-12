import type { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

const base = (size: number, props: SVGProps<SVGSVGElement>) => ({
  xmlns: 'http://www.w3.org/2000/svg',
  width: size,
  height: size,
  viewBox: '0 0 24 24',
  fill: 'currentColor',
  'aria-hidden': true as const,
  ...props,
});

export function LinkedInIcon({ size = 16, ...props }: IconProps) {
  return (
    <svg {...base(size, props)}>
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.75h3.96V21H3V9.75Zm6.46 0h3.8v1.54h.05c.53-1 1.82-2.05 3.75-2.05 4 0 4.74 2.63 4.74 6.06V21h-3.96v-5.06c0-1.2-.02-2.76-1.68-2.76-1.69 0-1.95 1.32-1.95 2.67V21H9.46V9.75Z" />
    </svg>
  );
}

export function YouTubeIcon({ size = 16, ...props }: IconProps) {
  return (
    <svg {...base(size, props)}>
      <path d="M23.5 6.2a3.02 3.02 0 0 0-2.12-2.14C19.5 3.55 12 3.55 12 3.55s-7.5 0-9.38.5A3.02 3.02 0 0 0 .5 6.2C0 8.08 0 12 0 12s0 3.92.5 5.8a3.02 3.02 0 0 0 2.12 2.14c1.88.5 9.38.5 9.38.5s7.5 0 9.38-.5a3.02 3.02 0 0 0 2.12-2.14c.5-1.88.5-5.8.5-5.8s0-3.92-.5-5.8ZM9.6 15.57V8.43L15.82 12 9.6 15.57Z" />
    </svg>
  );
}

export function InstagramIcon({ size = 16, ...props }: IconProps) {
  return (
    <svg {...base(size, { ...props, fill: 'none', stroke: 'currentColor', strokeWidth: 2.2 })}>
      <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" />
      <circle cx="12" cy="12" r="4.3" />
      <circle cx="17.6" cy="6.4" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function FacebookIcon({ size = 16, ...props }: IconProps) {
  return (
    <svg {...base(size, props)}>
      <path d="M12 1.5C6.2 1.5 1.5 6.2 1.5 12c0 5.24 3.84 9.58 8.86 10.37v-7.33H7.69V12h2.67V9.69c0-2.63 1.57-4.09 3.97-4.09 1.15 0 2.35.21 2.35.21v2.59h-1.32c-1.31 0-1.71.81-1.71 1.64V12h2.91l-.47 3.04h-2.44v7.33C18.66 21.58 22.5 17.24 22.5 12 22.5 6.2 17.8 1.5 12 1.5Z" />
    </svg>
  );
}

export const socialIconMap = {
  linkedin: LinkedInIcon,
  youtube: YouTubeIcon,
  instagram: InstagramIcon,
  facebook: FacebookIcon,
} as const;
