import type { AnchorHTMLAttributes, ReactNode } from 'react';
import { ArrowRight } from 'lucide-react';
import './ButtonLink.css';

export type ButtonVariant = 'teal' | 'navy' | 'outline' | 'white' | 'outline-light';

interface ButtonLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  variant?: ButtonVariant;
  /** Icon rendered before the label */
  leadingIcon?: ReactNode;
  /** Show the trailing arrow (→) used across the design */
  arrow?: boolean;
  children: ReactNode;
}

/**
 * Call-to-action rendered as a link (all CTAs navigate; none submit forms).
 * Size is controlled per placement via `className`.
 */
export function ButtonLink({
  href,
  variant = 'teal',
  leadingIcon,
  arrow = false,
  className = '',
  children,
  ...rest
}: ButtonLinkProps) {
  return (
    <a href={href} className={`btn btn--${variant} ${className}`.trim()} {...rest}>
      {leadingIcon && <span className="btn__icon">{leadingIcon}</span>}
      <span className="btn__label">{children}</span>
      {arrow && <ArrowRight className="btn__arrow" aria-hidden="true" />}
    </a>
  );
}
