"use client";

import { motion } from "framer-motion";
import styles from "./Hero.module.scss";

interface HeroProps {
  heading: string;
  subheading: string;
}

const ACCENT_GLOW = "var(--accent-glow)";

export default function Hero({ heading, subheading }: HeroProps) {
  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.backdrop}>
        <span className={styles.pulse} />
        <span className={styles.ring} />
      </div>

      <div className={styles.inner}>
        <motion.div
          className={styles.content}
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: "easeOut" }}
        >
          <p className={styles.eyebrow}>High craft / Low noise</p>
          <h1 id="hero-title" className={styles.title}>
            {heading}
          </h1>
          <p className={styles.subheading}>{subheading}</p>

          <div className={styles.actions}>
            <motion.a
              href="#collections"
              className={styles.ctaPrimary}
              whileHover={{ y: -2, boxShadow: ACCENT_GLOW }}
              whileTap={{ scale: 0.98 }}
            >
              Explore the atelier
            </motion.a>
            <motion.a
              href="#services"
              className={styles.ctaGhost}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              Concierge styling
            </motion.a>
          </div>

          <div className={styles.stats}>
            {[
              { label: "Hand-finished pairs", value: "180 / wk" },
              { label: "Custom-lasted silhouettes", value: "27" },
              { label: "Avg. delivery", value: "48h EU" },
            ].map((item) => (
              <div key={item.label} className={styles.statItem}>
                <span>{item.value}</span>
                <small>{item.label}</small>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className={styles.mosaic}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className={styles.glassCard}>
            <p className={styles.cardLabel}>Atelier Line</p>
            <h3>Tailored silhouettes engineered for motion.</h3>
            <p className={styles.cardMeta}>Bio-based pebble leather · Graphite outsole</p>
          </div>
          <div className={styles.pillars}>
            <div>
              <span className={styles.pillarDot} />
              Balanced pressure mapping
            </div>
            <div>
              <span className={styles.pillarDot} />
              Micro-laser edge finishing
            </div>
            <div>
              <span className={styles.pillarDot} />
              Thermal-lined for climate shifts
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
