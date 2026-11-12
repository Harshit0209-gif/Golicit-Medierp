import { professionals } from '../data/content';
import { ActionButton } from '../components/Action';
import { useEnquiry } from '../components/Enquiry';
import { Reveal } from '../components/Reveal';
import corridor from '../assets/photos/doctor-corridor.jpg';
import styles from './Professionals.module.css';

export function Professionals() {
  const { open } = useEnquiry();

  return (
    <section id="professionals" className={`${styles.section} wm wm-left`} aria-labelledby="professionals-title">
      <div className="wrap">
        <Reveal variant="image" className={styles.media} as="figure">
          <img
            src={corridor}
            alt="A doctor in a white coat walking away down a bright hospital corridor"
            width={1400}
            height={935}
            loading="lazy"
            decoding="async"
          />
        </Reveal>

        <div className={styles.layout}>
          <div className={styles.side}>
            <p className="marker">For medical professionals</p>
            <p className={styles.sideTitle}>We place</p>
            <ul role="list" className={styles.audiences}>
              {professionals.audiences.map((a) => (
                <li key={a}>{a}</li>
              ))}
            </ul>
          </div>

          <div className={styles.panel}>
            <h2 id="professionals-title" className={styles.title}>
              {professionals.title}
            </h2>
            <p className={styles.lead}>{professionals.lead}</p>
            <ul role="list" className={styles.promises}>
              {professionals.promises.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
            <ActionButton onClick={() => open('professional')}>{professionals.cta}</ActionButton>
          </div>
        </div>
      </div>
    </section>
  );
}
