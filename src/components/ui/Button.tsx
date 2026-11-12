import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { Link } from 'react-router';
import styles from './Button.module.css';

type Variant = 'primary' | 'dark' | 'outline' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

interface CommonProps {
  variant?: Variant;
  size?: Size;
  icon?: ReactNode;
  iconAfter?: ReactNode;
  block?: boolean;
  className?: string;
  children: ReactNode;
}

type ButtonProps = CommonProps &
  (
    | ({ to: string; href?: never } & { onClick?: () => void })
    | ({ href: string; to?: never } & { onClick?: () => void })
    | ({ to?: never; href?: never } & ButtonHTMLAttributes<HTMLButtonElement>)
  );

/** One button component for in-app links, external links and real buttons. */
export function Button(props: ButtonProps) {
  const { variant = 'primary', size = 'md', icon, iconAfter, block, className = '', children, ...rest } = props;
  const cls = [styles.button, styles[variant], styles[size], block ? styles.block : '', className]
    .filter(Boolean)
    .join(' ');
  const content = (
    <>
      {icon && <span className={styles.icon}>{icon}</span>}
      <span>{children}</span>
      {iconAfter && <span className={styles.icon}>{iconAfter}</span>}
    </>
  );

  if ('to' in rest && rest.to) {
    const { to, onClick } = rest;
    return (
      <Link to={to} className={cls} onClick={onClick}>
        {content}
      </Link>
    );
  }
  if ('href' in rest && rest.href) {
    const { href, onClick } = rest;
    return (
      <a href={href} className={cls} onClick={onClick}>
        {content}
      </a>
    );
  }
  const buttonProps = rest as ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button type="button" {...buttonProps} className={cls}>
      {content}
    </button>
  );
}
