import { useId, type InputHTMLAttributes, type ReactNode, type SelectHTMLAttributes, type TextareaHTMLAttributes } from 'react';
import styles from './Field.module.css';

interface ShellProps {
  label: string;
  error?: string;
  optional?: boolean;
  className?: string;
  children: (ids: { id: string; describedBy?: string }) => ReactNode;
}

function Shell({ label, error, optional, className = '', children }: ShellProps) {
  const id = useId();
  const errorId = error ? `${id}-error` : undefined;
  return (
    <div className={`${styles.field} ${error ? styles.invalid : ''} ${className}`}>
      <label htmlFor={id} className={styles.label}>
        {label}
        {optional && <span className={styles.optional}>Optional</span>}
      </label>
      {children({ id, describedBy: errorId })}
      {error && (
        <p id={errorId} className={styles.error}>
          {error}
        </p>
      )}
    </div>
  );
}

type Base = { label: string; error?: string; optional?: boolean; className?: string };

export function Input({ label, error, optional, className, ...rest }: Base & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <Shell {...{ label, error, optional, className }}>
      {({ id, describedBy }) => (
        <input id={id} className={styles.control} aria-invalid={error ? true : undefined} aria-describedby={describedBy} {...rest} />
      )}
    </Shell>
  );
}

export function Select({
  label,
  error,
  optional,
  className,
  children,
  ...rest
}: Base & SelectHTMLAttributes<HTMLSelectElement> & { children: ReactNode }) {
  return (
    <Shell {...{ label, error, optional, className }}>
      {({ id, describedBy }) => (
        <select
          id={id}
          className={`${styles.control} ${styles.select}`}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          {...rest}
        >
          {children}
        </select>
      )}
    </Shell>
  );
}

export function TextArea({ label, error, optional, className, ...rest }: Base & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <Shell {...{ label, error, optional, className }}>
      {({ id, describedBy }) => (
        <textarea
          id={id}
          rows={3}
          className={`${styles.control} ${styles.textarea}`}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          {...rest}
        />
      )}
    </Shell>
  );
}
