import { useCallback, useState, type ChangeEvent, type FormEvent } from 'react';

export type Rule<V> = (value: string, values: V) => string | undefined;
export type Rules<V> = Partial<Record<keyof V, Rule<V>[]>>;

export const required =
  (message: string) =>
  (value: string): string | undefined =>
    value.trim() ? undefined : message;

export const email = (value: string) =>
  !value.trim() || /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim())
    ? undefined
    : 'Enter an email address like name@hospital.in';

export const indianMobile = (value: string) => {
  if (!value.trim()) return undefined;
  let digits = value.replace(/\D/g, '');
  // Strip a +91 or leading 0 only when it is a prefix, not part of a 10-digit number.
  if (digits.length === 12 && digits.startsWith('91')) digits = digits.slice(2);
  else if (digits.length === 11 && digits.startsWith('0')) digits = digits.slice(1);
  return /^[6-9]\d{9}$/.test(digits) ? undefined : 'Enter a 10-digit mobile number, like 98765 43210';
};

/**
 * Minimal form state with per-field validation. Errors show after a field is
 * left (blur) or after a submit attempt, never while the person is typing.
 */
export function useForm<V extends Record<string, string>>(initial: V, rules: Rules<V>) {
  const [values, setValues] = useState<V>(initial);
  const [touched, setTouched] = useState<Partial<Record<keyof V, boolean>>>({});
  const [submitted, setSubmitted] = useState(false);

  const validateField = useCallback(
    (name: keyof V, all: V) => {
      for (const rule of rules[name] ?? []) {
        const message = rule(all[name] ?? '', all);
        if (message) return message;
      }
      return undefined;
    },
    [rules],
  );

  const errors = Object.keys(values).reduce<Partial<Record<keyof V, string>>>((acc, key) => {
    const name = key as keyof V;
    if (touched[name] || submitted) {
      const message = validateField(name, values);
      if (message) acc[name] = message;
    }
    return acc;
  }, {});

  const field = (name: keyof V) => ({
    name: name as string,
    value: values[name],
    error: errors[name],
    onChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setValues((prev) => ({ ...prev, [name]: e.target.value })),
    onBlur: () => setTouched((prev) => ({ ...prev, [name]: true })),
  });

  /** Validates the given fields (or all) and reports whether they pass. */
  const check = (names: (keyof V)[] = Object.keys(values) as (keyof V)[]) => {
    setTouched((prev) => ({ ...prev, ...Object.fromEntries(names.map((n) => [n, true])) }));
    return names.every((n) => !validateField(n, values));
  };

  const handleSubmit = (onValid: (values: V) => void) => (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    const names = Object.keys(values) as (keyof V)[];
    const firstInvalid = names.find((n) => validateField(n, values));
    if (firstInvalid) {
      // Move focus to the first problem so keyboard and screen-reader users land on it.
      requestAnimationFrame(() => {
        (document.querySelector(`[name="${String(firstInvalid)}"]`) as HTMLElement | null)?.focus();
      });
      return;
    }
    onValid(values);
  };

  const reset = () => {
    setValues(initial);
    setTouched({});
    setSubmitted(false);
  };

  return { values, setValues, errors, field, check, handleSubmit, reset };
}
