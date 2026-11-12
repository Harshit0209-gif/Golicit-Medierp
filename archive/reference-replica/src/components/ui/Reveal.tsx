import { createElement, type CSSProperties, type ElementType, type ReactNode } from 'react';
import { useReveal } from '../../hooks/useReveal';

interface RevealProps {
  as?: ElementType;
  className?: string;
  /** Stagger delay in milliseconds */
  delay?: number;
  children: ReactNode;
  [key: string]: unknown;
}

/** Fades and lifts its content into view the first time it enters the viewport. */
export function Reveal({ as = 'div', className = '', delay = 0, children, ...rest }: RevealProps) {
  const { ref, isVisible } = useReveal<HTMLElement>();
  const style = delay ? ({ '--reveal-delay': `${delay}ms` } as CSSProperties) : undefined;

  return createElement(
    as,
    {
      ref,
      className: `reveal ${isVisible ? 'is-visible' : ''} ${className}`.replace(/\s+/g, ' ').trim(),
      style,
      ...rest,
    },
    children,
  );
}
