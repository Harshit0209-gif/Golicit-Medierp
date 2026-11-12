import type { ReactNode } from 'react';
import styles from './PageIntro.module.css';

interface PageIntroProps {
  title: string;
  lead: ReactNode;
  actions?: ReactNode;
  image?: {
    src: string;
    srcSet?: string;
    alt: string;
    width: number;
    height: number;
    position?: string;
    aspect?: string;
  };
  /** Colour of the floor-tape strip: doctors are ceil blue, hospitals signal yellow. */
  tone?: 'ceil' | 'signal';
  children?: ReactNode;
}

/** Opening block for inner pages: headline, lead, actions and an optional photo. */
export function PageIntro({ title, lead, actions, image, tone = 'signal', children }: PageIntroProps) {
  return (
    <section className={`${styles.intro} ${styles[tone]} ${image ? styles.withImage : ''}`}>
      <div className={`wrap ${styles.grid}`}>
        <div className={styles.copy}>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.lead}>{lead}</p>
          {actions && <div className={styles.actions}>{actions}</div>}
          {children}
        </div>
        {image && (
          <div className={styles.media} style={image.aspect ? { aspectRatio: image.aspect } : undefined}>
            <img
              src={image.src}
              srcSet={image.srcSet}
              sizes={image.srcSet ? '(max-width: 1023px) calc(100vw - 48px), 480px' : undefined}
              alt={image.alt}
              width={image.width}
              height={image.height}
              style={image.position ? { objectPosition: image.position } : undefined}
              fetchPriority="high"
              decoding="async"
            />
          </div>
        )}
      </div>
    </section>
  );
}
