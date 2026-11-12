import type { CSSProperties, ReactNode } from 'react';
import { useInView } from '../hooks/useInView';

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** 'text' fades and lifts; 'image' unveils from the bottom edge. */
  variant?: 'text' | 'image';
  delay?: number;
  as?: 'div' | 'figure' | 'li';
}

/** Plays its entrance once, the first time it scrolls into view. */
export function Reveal({ children, className = '', variant = 'text', delay = 0, as: Tag = 'div' }: RevealProps) {
  const { ref, inView } = useInView<HTMLElement>();
  const style = delay ? ({ '--delay': `${delay}ms` } as CSSProperties) : undefined;
  const base = variant === 'image' ? 'reveal-image' : 'reveal';

  return (
    <Tag
      ref={ref as never}
      className={`${base} ${inView ? 'is-in' : ''} ${className}`.trim()}
      style={style}
    >
      {children}
    </Tag>
  );
}
