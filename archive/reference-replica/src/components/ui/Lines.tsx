import { Fragment } from 'react';

/**
 * Renders a heading as fixed lines on tablet/desktop (matching the design's
 * line breaks) while letting the text wrap naturally on small screens.
 */
export function Lines({ lines }: { lines: readonly string[] }) {
  return (
    <>
      {lines.map((line, index) => (
        <Fragment key={line}>
          {index > 0 && ' '}
          <span className="ln">{line}</span>
        </Fragment>
      ))}
    </>
  );
}
