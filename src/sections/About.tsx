import { about } from '../data/content';
import { Reveal } from '../components/Reveal';
import teamImage from '../assets/photos/surgical-team.jpg';
import nursesImage from '../assets/photos/nurses-corridor.jpg';
import styles from './About.module.css';

export function About() {
  return (
    <section id="about" className={`${styles.section} wm`} aria-labelledby="about-title">
      <div className={`wrap ${styles.grid}`}>
        <p className={`marker ${styles.marker}`}>About MedRecruit</p>

        <Reveal className={styles.statementWrap}>
          <h2 id="about-title" className={styles.statement}>
            {about.statement}
          </h2>
        </Reveal>

        <div className={styles.images}>
          <Reveal variant="image" className={styles.imageMain} as="figure">
            <img src={teamImage} alt="A surgical team operating under theatre lights" width={900} height={1125} loading="lazy" decoding="async" />
          </Reveal>
          <Reveal variant="image" className={styles.imageInset} as="figure" delay={250}>
            <img src={nursesImage} alt="Two nurses reviewing notes in a hospital corridor" width={640} height={800} loading="lazy" decoding="async" />
          </Reveal>
        </div>

        <div className={styles.body}>
          {about.body.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}

          <dl className={styles.facts}>
            {about.facts.map((f) => (
              <div key={f.term}>
                <dt>{f.term}</dt>
                <dd>{f.detail}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
