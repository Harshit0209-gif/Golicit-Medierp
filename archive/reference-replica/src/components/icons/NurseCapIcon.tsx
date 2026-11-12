import type { SVGProps } from 'react';

interface NurseCapIconProps extends SVGProps<SVGSVGElement> {
  size?: number | string;
  strokeWidth?: number | string;
}

/** Nurse cap with a cross, drawn on Lucide's 24px grid so it matches the rest of the icon set. */
export function NurseCapIcon({ size = 24, strokeWidth = 2, ...props }: NurseCapIconProps) {
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
