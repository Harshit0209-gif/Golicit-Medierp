import type { ButtonHTMLAttributes, ReactNode } from 'react';
import styles from './Action.module.css';

type Variant = 'solid' | 'outline' | 'text';
type Tone = 'dark' | 'light';

interface CommonProps {
  variant?: Variant;
  /** Which background the action sits on. */
  tone?: Tone;
  arrow?: boolean;
  className?: string;
  children: ReactNode;
}

export function Arrow() {
  return (
    <svg className={styles.arrow} viewBox="0 0 20 12" aria-hidden="true">
      <path d="M0 6h18M13 1l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

const classes = (variant: Variant, tone: Tone, className: string) =>
  [styles.action, styles[variant], styles[tone], className].filter(Boolean).join(' ');

/** Primary and secondary calls to action, as links. */
export function ActionLink({
  href,
  variant = 'solid',
  tone = 'dark',
  arrow = true,
  className = '',
  children,
  onClick,
}: CommonProps & { href: string; onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void }) {
  return (
    <a href={href} className={classes(variant, tone, className)} onClick={onClick}>
      <span className={styles.label}>{children}</span>
      {arrow && <Arrow />}
    </a>
  );
}

/** Same visual language for real buttons. */
export function ActionButton({
  variant = 'solid',
  tone = 'dark',
  arrow = true,
  className = '',
  children,
  ...rest
}: CommonProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button type="button" {...rest} className={classes(variant, tone, className)}>
      <span className={styles.label}>{children}</span>
      {arrow && <Arrow />}
    </button>
  );
}
