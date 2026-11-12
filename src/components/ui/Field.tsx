import { useId, type InputHTMLAttributes, type ReactNode, type SelectHTMLAttributes, type TextareaHTMLAttributes } from 'react';
import { ChevronDown, CircleAlert } from 'lucide-react';
import styles from './Field.module.css';

interface FieldShellProps {
  label: string;
  hint?: string;
  error?: string;
  optional?: boolean;
  hideLabel?: boolean;
  className?: string;
  children: (ids: { inputId: string; describedBy?: string }) => ReactNode;
}

/** Label, hint and error wiring shared by every form control. */
function FieldShell({ label, hint, error, optional, hideLabel, className = '', children }: FieldShellProps) {
  const inputId = useId();
  const hintId = hint && !error ? `${inputId}-hint` : undefined;
  const errorId = error ? `${inputId}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(' ') || undefined;

  return (
    <div className={`${styles.field} ${error ? styles.invalid : ''} ${className}`}>
      <label htmlFor={inputId} className={hideLabel ? 'visually-hidden' : styles.label}>
        {label}
        {optional && <span className={styles.optional}> (optional)</span>}
      </label>
      {children({ inputId, describedBy })}
      {/* Hints sit under the control so side-by-side fields keep their inputs aligned. */}
      {hint && !error && (
        <p id={hintId} className={styles.hint}>
          {hint}
        </p>
      )}
      {error && (
        <p id={errorId} className={styles.error}>
          <CircleAlert aria-hidden="true" />
          {error}
        </p>
      )}
    </div>
  );
}

type BaseProps = Omit<FieldShellProps, 'children'>;

export function TextField({
  label,
  hint,
  error,
  optional,
  hideLabel,
  className,
  ...input
}: BaseProps & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <FieldShell {...{ label, hint, error, optional, hideLabel, className }}>
      {({ inputId, describedBy }) => (
        <input
          id={inputId}
          className={styles.control}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          {...input}
        />
      )}
    </FieldShell>
  );
}

export function SelectField({
  label,
  hint,
  error,
  optional,
  hideLabel,
  className,
  children,
  ...select
}: BaseProps & SelectHTMLAttributes<HTMLSelectElement> & { children: ReactNode }) {
  return (
    <FieldShell {...{ label, hint, error, optional, hideLabel, className }}>
      {({ inputId, describedBy }) => (
        <div className={styles.selectWrap}>
          <select
            id={inputId}
            className={`${styles.control} ${styles.select}`}
            aria-invalid={error ? true : undefined}
            aria-describedby={describedBy}
            {...select}
          >
            {children}
          </select>
          <ChevronDown className={styles.chevron} aria-hidden="true" />
        </div>
      )}
    </FieldShell>
  );
}

export function TextArea({
  label,
  hint,
  error,
  optional,
  hideLabel,
  className,
  ...textarea
}: BaseProps & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <FieldShell {...{ label, hint, error, optional, hideLabel, className }}>
      {({ inputId, describedBy }) => (
        <textarea
          id={inputId}
          className={`${styles.control} ${styles.textarea}`}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          rows={4}
          {...textarea}
        />
      )}
    </FieldShell>
  );
}
