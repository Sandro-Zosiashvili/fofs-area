import Link from "next/link";
import styles from "./Navbar.module.scss";

interface NavbarProps {
  cartCount?: number;
}

export default function Navbar({ cartCount = 0 }: NavbarProps) {
  return (
    <header className={styles.navbar}>
      <div className={styles.inner}>
        <Link href="/" className={styles.brand}>
          FOFS AREA
        </Link>

        <nav className={styles.navigation} aria-label="Primary">
          <Link href="#collections">Collections</Link>
          <Link href="#new-arrivals">New Arrivals</Link>
          <Link href="#journal">Journal</Link>
        </nav>

        <button type="button" className={styles.cartButton} aria-label="Open shopping bag">
          Bag
          <span className={styles.counter}>{cartCount}</span>
        </button>
      </div>
    </header>
  );
}
