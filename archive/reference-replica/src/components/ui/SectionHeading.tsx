interface SectionHeadingProps {
  id?: string;
  title: string;
  subtitle?: string;
  className?: string;
}

/** Centred section title with an optional one-line subtitle. */
export function SectionHeading({ id, title, subtitle, className = '' }: SectionHeadingProps) {
  return (
    <header className={`section-heading ${className}`.trim()}>
      <h2 id={id} className="section-heading__title">
        {title}
      </h2>
      {subtitle && <p className="section-heading__subtitle">{subtitle}</p>}
    </header>
  );
}
