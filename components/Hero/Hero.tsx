"use client";

import { motion } from "framer-motion";
import styles from "./Hero.module.scss";

interface HeroProps {
  heading: string;
  subheading: string;
}

export default function Hero({ heading, subheading }: HeroProps) {
  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <motion.div
        className={styles.content}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <p className={styles.eyebrow}>Boutique Luxury Footwear</p>
        <h1 id="hero-title" className={styles.title}>
          {heading}
        </h1>
        <p className={styles.subheading}>{subheading}</p>
      </motion.div>
    </section>
  );
}
