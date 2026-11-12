import { useId, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import styles from './Accordion.module.css';

interface AccordionProps {
  items: { q: string; a: string }[];
}

/** Disclosure list: each question toggles its own answer. */
export function Accordion({ items }: AccordionProps) {
  const baseId = useId();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className={styles.list}>
      {items.map((item, index) => {
        const isOpen = open === index;
        const buttonId = `${baseId}-q${index}`;
        const panelId = `${baseId}-a${index}`;
        return (
          <div key={item.q} className={`${styles.item} ${isOpen ? styles.open : ''}`}>
            <h3 className={styles.heading}>
              <button
                id={buttonId}
                type="button"
                className={styles.trigger}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : index)}
              >
                <span>{item.q}</span>
                <ChevronDown className={styles.chevron} aria-hidden="true" />
              </button>
            </h3>
            <div id={panelId} role="region" aria-labelledby={buttonId} className={styles.panel} inert={!isOpen}>
              <div className={styles.panelInner}>
                <p>{item.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
