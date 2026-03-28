"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import styles from "./ProductCard.module.scss";

type SwatchTone = "charcoal" | "bone" | "sage" | "taupe" | "espresso";

interface ProductCardProps {
  name: string;
  price: string;
  imageSrc: string;
  imageAlt: string;
  colorSwatches?: SwatchTone[];
  availableSizes?: number[];
  onSave?: () => void;
}

const swatchClassMap: Record<SwatchTone, string> = {
  charcoal: styles.swatchCharcoal,
  bone: styles.swatchBone,
  sage: styles.swatchSage,
  taupe: styles.swatchTaupe,
  espresso: styles.swatchEspresso,
};

export default function ProductCard({
  name,
  price,
  imageSrc,
  imageAlt,
  colorSwatches,
  availableSizes,
  onSave,
}: ProductCardProps) {
  return (
    <motion.article
      className={styles.card}
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
      <div className={styles.imageWrap}>
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className={styles.image}
          sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw"
        />
        <button type="button" className={styles.saveButton} onClick={onSave}>
          Save
        </button>
      </div>

      <div className={styles.details}>
        <div>
          <h3 className={styles.name}>{name}</h3>
          <p className={styles.price}>{price}</p>
        </div>

        {colorSwatches?.length ? (
          <div className={styles.swatches} aria-label={`${name} available colors`}>
            {colorSwatches.map((swatch) => (
              <span
                key={`${name}-${swatch}`}
                className={`${styles.swatch} ${swatchClassMap[swatch]}`}
                aria-label={`${swatch} color option`}
                role="img"
              />
            ))}
          </div>
        ) : null}
      </div>

      {availableSizes?.length ? (
        <div className={styles.sizes}>
          <p className={styles.sizeLabel}>EU Sizes</p>
          <div className={styles.sizeOptions}>
            {availableSizes.map((size) => (
              <button
                key={`${name}-size-${size}`}
                type="button"
                className={styles.sizeOption}
                aria-label={`Select size ${size}`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      ) : null}
    </motion.article>
  );
}
