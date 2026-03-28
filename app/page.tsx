"use client";

import { motion } from "framer-motion";
import Hero from "@/components/Hero/Hero";
import Navbar from "@/components/Navbar/Navbar";
import ProductCard from "@/components/ProductCard/ProductCard";
import styles from "./page.module.scss";

type ProductTone = "charcoal" | "bone" | "sage" | "taupe" | "espresso";

interface ProductEntry {
  name: string;
  price: string;
  imageSrc: string;
  imageAlt: string;
  colorSwatches: ProductTone[];
  sizes: number[];
}

const featuredProducts: ProductEntry[] = [
  {
    name: "Seraphina Loafer",
    price: "€690",
    imageSrc:
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=900&q=80",
    imageAlt: "Minimal luxury charcoal loafer",
    colorSwatches: ["charcoal", "bone", "sage"],
    sizes: [37, 38, 39, 40],
  },
  {
    name: "Aureline Mule",
    price: "€740",
    imageSrc:
      "https://images.unsplash.com/photo-1511556820780-d912e42b4980?auto=format&fit=crop&w=900&q=80",
    imageAlt: "Elegant off-white mule with refined shape",
    colorSwatches: ["bone", "taupe"],
    sizes: [36, 37, 38, 39],
  },
  {
    name: "Nocturne Derby",
    price: "€810",
    imageSrc:
      "https://images.unsplash.com/photo-1614252369475-531eba835eb1?auto=format&fit=crop&w=900&q=80",
    imageAlt: "Polished dark derby shoe in premium leather",
    colorSwatches: ["espresso", "charcoal"],
    sizes: [40, 41, 42, 43],
  },
  {
    name: "Lune Court",
    price: "€760",
    imageSrc:
      "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=900&q=80",
    imageAlt: "Quiet-luxury court shoe in sage and bone tones",
    colorSwatches: ["sage", "bone", "charcoal"],
    sizes: [36, 37, 38, 39, 40],
  },
];

const gridVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0 },
};

export default function Home() {
  return (
    <div className={styles.page}>
      <Navbar cartCount={2} />

      <main className={styles.main}>
        <Hero
          heading="Crafted silhouettes for quiet confidence"
          subheading="Fofs Area curates modern footwear designed around purity of form, tactile materials, and timeless proportion."
        />

        <section id="collections" className={styles.collectionSection} aria-labelledby="collection-title">
          <div className={styles.sectionHeader}>
            <p>Featured Collection</p>
            <h2 id="collection-title">Modern Icons for Every Step</h2>
          </div>

          <motion.div
            className={styles.productGrid}
            variants={gridVariants}
            initial="hidden"
            animate="visible"
          >
            {featuredProducts.map((product) => (
              <motion.div key={product.name} variants={itemVariants} transition={{ duration: 0.45, ease: "easeOut" }}>
                <ProductCard
                  name={product.name}
                  price={product.price}
                  imageSrc={product.imageSrc}
                  imageAlt={product.imageAlt}
                  colorSwatches={product.colorSwatches}
                  availableSizes={product.sizes}
                />
              </motion.div>
            ))}
          </motion.div>
        </section>
      </main>
    </div>
  );
}
