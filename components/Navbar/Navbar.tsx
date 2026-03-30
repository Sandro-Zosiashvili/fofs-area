"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import styles from "./Navbar.module.scss";

interface NavbarProps {
  cartCount?: number;
}

export default function Navbar({ cartCount = 0 }: NavbarProps) {
  return (
    <motion.header
      className={styles.navbar}
      initial={{ y: -18, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.65, ease: "easeOut" }}
    >
      <div className={styles.inner}>
        <Link href="/" className={styles.brand} aria-label="Fofs Area home">
          <span className={styles.brandMark} />
          Fofs Area
        </Link>

        <nav className={styles.navigation} aria-label="Primary">
          <Link href="#collections">Collections</Link>
          <Link href="#atelier">Atelier</Link>
          <Link href="#journal">Journal</Link>
          <Link href="#services">Services</Link>
        </nav>

        <div className={styles.actions}>
          <button type="button" className={styles.ctaGhost}>
            Book a fitting
          </button>
          <button type="button" className={styles.cartButton} aria-label="Open shopping bag">
            Bag
            <span className={styles.counter}>{cartCount}</span>
          </button>
        </div>
      </div>
    </motion.header>
  );
}
