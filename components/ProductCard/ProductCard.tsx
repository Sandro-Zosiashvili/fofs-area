"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import styles from "./ProductCard.module.scss";

export type SwatchTone = "crimson" | "graphite" | "pearl" | "umber" | "onyx" | "sage" | "ember";

export interface ProductCardProps {
  id: string;
  name: string;
  collection: string;
  description: string;
  priceLabel: string;
  imageSrc: string;
  imageAlt: string;
  colors: SwatchTone[];
  sizes: number[];
  tags: string[];
  badge?: string;
  inStock: boolean;
  onSave?: (id: string) => void;
}

const swatchClassMap: Record<SwatchTone, string> = {
  crimson: styles.swatchCrimson,
  graphite: styles.swatchGraphite,
  pearl: styles.swatchPearl,
  umber: styles.swatchUmber,
  onyx: styles.swatchOnyx,
  sage: styles.swatchSage,
  ember: styles.swatchEmber,
};

export default function ProductCard({
  id,
  name,
  collection,
  description,
  priceLabel,
  imageSrc,
  imageAlt,
  colors,
  sizes,
  tags,
  badge,
  inStock,
  onSave,
}: ProductCardProps) {
  return (
    <motion.article
      className={styles.card}
      whileHover={{ y: -6, scale: 1.01 }}
      transition={{ duration: 0.24, ease: "easeOut" }}
    >
      <div className={styles.imageWrap}>
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className={styles.image}
          sizes="(min-width: 1280px) 22vw, (min-width: 1024px) 28vw, (min-width: 768px) 45vw, 100vw"
          priority
        />
        {badge ? <span className={styles.badge}>{badge}</span> : null}
        <div className={styles.topActions}>
          <button type="button" className={styles.saveButton} onClick={() => onSave?.(id)}>
            Save
          </button>
          <span className={`${styles.chip} ${inStock ? styles.chipPositive : styles.chipNeutral}`}>
            {inStock ? "In stock" : "Made to order"}
          </span>
        </div>
      </div>

      <div className={styles.details}>
        <div className={styles.titleBlock}>
          <p className={styles.collection}>{collection}</p>
          <h3 className={styles.name}>{name}</h3>
          <p className={styles.description}>{description}</p>
        </div>
        <div className={styles.meta}>
          <p className={styles.price}>{priceLabel}</p>
          <div className={styles.swatches} aria-label={`${name} available colors`}>
            {colors.map((swatch) => (
              <span
                key={`${name}-${swatch}`}
                className={`${styles.swatch} ${swatchClassMap[swatch]}`}
                aria-label={`${swatch} color option`}
                role="img"
              />
            ))}
          </div>
        </div>
      </div>

      <div className={styles.tags}>
        {tags.map((tag) => (
          <span key={`${id}-${tag}`} className={styles.tag}>
            {tag}
          </span>
        ))}
      </div>

      <div className={styles.footer}>
        <div className={styles.sizeBlock}>
          <p className={styles.sizeLabel}>EU sizes</p>
          <div className={styles.sizeOptions}>
            {sizes.map((size) => (
              <button key={`${id}-size-${size}`} type="button" className={styles.sizeOption}>
                {size}
              </button>
            ))}
          </div>
        </div>
        <div className={styles.actions}>
          <button type="button" className={styles.secondary}>
            View spec
          </button>
          <button type="button" className={styles.primary}>
            Add to bag
          </button>
        </div>
      </div>
    </motion.article>
  );
}
