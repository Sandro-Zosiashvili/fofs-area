"use client";

import { motion } from "framer-motion";
import styles from "./Footer.module.scss";

export default function Footer() {
  return (
    <footer className={styles.footer} id="journal">
      <div className={styles.inner}>
        <motion.div
          className={styles.branding}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <p className={styles.kicker}>FOFS AREA</p>
          <h3>Footwear engineered for the calm, precision-led individual.</h3>
          <p className={styles.meta}>Studios in Tbilisi · Berlin · Milan</p>
        </motion.div>

        <div className={styles.links}>
          <nav aria-label="Footer">
            <p>Explore</p>
            <a href="#collections">Collections</a>
            <a href="#atelier">Atelier</a>
            <a href="#services">Services</a>
          </nav>
          <nav aria-label="Support">
            <p>Support</p>
            <a href="#faq">FAQ</a>
            <a href="#shipping">Shipping</a>
            <a href="#care">Care guide</a>
          </nav>
          <form className={styles.form} aria-label="Join waitlist">
            <p>Join the private drop list</p>
            <div className={styles.field}>
              <input type="email" name="email" placeholder="Email address" required />
              <button type="submit">Join</button>
            </div>
            <small>By joining, you agree to curated updates only.</small>
          </form>
        </div>
      </div>
      <div className={styles.bottom}>
        <span>Precision made. Quietly delivered.</span>
        <span>© {new Date().getFullYear()} Fofs Area</span>
      </div>
    </footer>
  );
}
