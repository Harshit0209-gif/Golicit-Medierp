import { institutions } from '../data/content';
import { ActionButton } from '../components/Action';
import { useEnquiry } from '../components/Enquiry';
import { Reveal } from '../components/Reveal';
import atrium from '../assets/photos/institution-atrium.jpg';
import styles from './Institutions.module.css';

export function Institutions() {
  const { open } = useEnquiry();

  return (
    <section id="institutions" className={`${styles.section} wm`} aria-labelledby="institutions-title">
      <Reveal variant="image" className={styles.media} as="figure">
        <img
          src={atrium}
          alt="The glass-roofed atrium of a large Indian institutional building"
          width={880}
          height={1100}
          loading="lazy"
          decoding="async"
        />
      </Reveal>

      <div className={styles.content}>
        <p className="marker">For healthcare institutions</p>
        <h2 id="institutions-title" className={styles.title}>
          {institutions.title}
        </h2>
        <p className={styles.lead}>{institutions.lead}</p>

        <ul role="list" className={styles.audiences} aria-label="Institutions we work with">
          {institutions.audiences.map((a) => (
            <li key={a}>{a}</li>
          ))}
        </ul>

        <ul role="list" className={styles.points}>
          {institutions.points.map((p) => (
            <li key={p.title}>
              <h3>{p.title}</h3>
              <p>{p.body}</p>
            </li>
          ))}
        </ul>

        <ActionButton onClick={() => open('institution')}>{institutions.cta}</ActionButton>
      </div>
    </section>
  );
}
