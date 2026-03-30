"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import type { SwatchTone } from "../ProductCard/ProductCard";
import { type Category, type HeelHeight, type Material, type Style } from "@/types/catalog";
import styles from "./FilterPanel.module.scss";

export type SortOption = "featured" | "price-asc" | "price-desc" | "newest" | "artisan";

export interface FilterState {
  query: string;
  maxPrice: number;
  categories: Category[];
  materials: Material[];
  tones: SwatchTone[];
  styles: Style[];
  heelHeights: HeelHeight[];
  size: number | null;
  inStockOnly: boolean;
  sort: SortOption;
}

interface FilterPanelProps {
  filters: FilterState;
  onUpdate: (next: Partial<FilterState>) => void;
  onReset: () => void;
  activeFiltersCount: number;
  priceBounds: { min: number; max: number };
  colorOptions: { id: SwatchTone; label: string }[];
}

const sectionVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

export default function FilterPanel({
  filters,
  onUpdate,
  onReset,
  activeFiltersCount,
  priceBounds,
  colorOptions,
}: FilterPanelProps) {
  const [isOpen, setIsOpen] = useState(true);

  const hasAnyFilter = useMemo(
    () =>
      Boolean(
        filters.query ||
          filters.categories.length ||
          filters.materials.length ||
          filters.tones.length ||
          filters.styles.length ||
          filters.heelHeights.length ||
          filters.size ||
          filters.inStockOnly ||
          filters.maxPrice < priceBounds.max,
      ),
    [filters, priceBounds.max],
  );

  const toggleValue = <T extends string>(key: keyof FilterState, value: T) => {
    const existing = (filters[key] as T[]) || [];
    const next = existing.includes(value) ? existing.filter((item) => item !== value) : [...existing, value];
    onUpdate({ [key]: next } as Partial<FilterState>);
  };

  const setSize = (value: number | null) => onUpdate({ size: value });

  return (
    <div className={styles.panel} aria-labelledby="filters-heading">
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <p className={styles.label}>Filters</p>
          <h3 id="filters-heading">Curate your silhouette</h3>
          <p className={styles.muted}>Layer tonalities, materials, and proportions to match your ritual.</p>
        </div>
        <div className={styles.headerActions}>
          <button type="button" className={styles.reset} onClick={onReset} disabled={!hasAnyFilter}>
            Reset
            {activeFiltersCount ? <span className={styles.counter}>{activeFiltersCount}</span> : null}
          </button>
          <button type="button" className={styles.toggle} onClick={() => setIsOpen((prev) => !prev)}>
            {isOpen ? "Collapse" : "Expand"}
          </button>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {isOpen ? (
          <motion.div
            className={styles.body}
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={sectionVariants}
            transition={{ duration: 0.3 }}
          >
            <div className={styles.fieldRow}>
              <label className={styles.field}>
                <span>Search</span>
                <input
                  type="search"
                  placeholder="Search pieces, codes, palettes"
                  value={filters.query}
                  onChange={(event) => onUpdate({ query: event.target.value })}
                />
              </label>

              <label className={styles.field}>
                <span>Sort</span>
                <select value={filters.sort} onChange={(event) => onUpdate({ sort: event.target.value as SortOption })}>
                  <option value="featured">Featured sequence</option>
                  <option value="price-asc">Price — Ascending</option>
                  <option value="price-desc">Price — Descending</option>
                  <option value="newest">Newest drops</option>
                  <option value="artisan">Artisan priority</option>
                </select>
              </label>
            </div>

            <div className={styles.columns}>
              <div className={styles.column}>
                <FilterGroup title="Categories">
                  {(["Derby", "Mule", "Boot", "Sneaker"] satisfies Category[]).map((category) => (
                    <Checkbox
                      key={category}
                      label={category}
                      checked={filters.categories.includes(category)}
                      onChange={() => toggleValue("categories", category)}
                    />
                  ))}
                </FilterGroup>

                <FilterGroup title="Heel height">
                  {(["Flat", "Mid", "High"] satisfies HeelHeight[]).map((height) => (
                    <Checkbox
                      key={height}
                      label={height}
                      checked={filters.heelHeights.includes(height)}
                      onChange={() => toggleValue("heelHeights", height)}
                    />
                  ))}
                </FilterGroup>

                <FilterGroup title="Availability">
                  <Checkbox
                    label="Only show in-stock"
                    checked={filters.inStockOnly}
                    onChange={() => onUpdate({ inStockOnly: !filters.inStockOnly })}
                  />
                </FilterGroup>
              </div>

              <div className={styles.column}>
                <FilterGroup title="Materials">
                  {(["Pebble leather", "Nappa", "Recycled knit", "Suede"] satisfies Material[]).map((material) => (
                    <Checkbox
                      key={material}
                      label={material}
                      checked={filters.materials.includes(material)}
                      onChange={() => toggleValue("materials", material)}
                    />
                  ))}
                </FilterGroup>

                <FilterGroup title="Styles">
                  {(["Architected", "Minimalist", "Sculpted", "Technical"] satisfies Style[]).map((style) => (
                    <Checkbox
                      key={style}
                      label={style}
                      checked={filters.styles.includes(style)}
                      onChange={() => toggleValue("styles", style)}
                    />
                  ))}
                </FilterGroup>

                <FilterGroup title="Color system">
                  <div className={styles.swatchRow}>
                    {colorOptions.map((tone) => (
                      <button
                        key={tone.id}
                        type="button"
                        className={`${styles.swatch} ${styles[`swatch-${tone.id}`]} ${
                          filters.tones.includes(tone.id) ? styles.swatchActive : ""
                        }`}
                        aria-pressed={filters.tones.includes(tone.id)}
                        onClick={() => toggleValue("tones", tone.id)}
                        aria-label={tone.label}
                      />
                    ))}
                  </div>
                </FilterGroup>
              </div>

              <div className={styles.column}>
                <FilterGroup title="Investment ceiling">
                  <div className={styles.sliderRow}>
                    <input
                      type="range"
                      min={priceBounds.min}
                      max={priceBounds.max}
                      value={filters.maxPrice}
                      onChange={(event) => onUpdate({ maxPrice: Number(event.target.value) })}
                    />
                    <div className={styles.sliderMeta}>
                      <span>{priceBounds.min}€</span>
                      <strong>{filters.maxPrice}€</strong>
                      <span>{priceBounds.max}€</span>
                    </div>
                  </div>
                </FilterGroup>

                <FilterGroup title="Size focus">
                  <div className={styles.sizeGrid}>
                    {[35, 36, 37, 38, 39, 40, 41, 42, 43].map((size) => (
                      <button
                        key={size}
                        type="button"
                        className={`${styles.size} ${filters.size === size ? styles.sizeActive : ""}`}
                        onClick={() => setSize(filters.size === size ? null : size)}
                        aria-pressed={filters.size === size}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </FilterGroup>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

interface GroupProps {
  title: string;
  children: React.ReactNode;
}

function FilterGroup({ title, children }: GroupProps) {
  return (
    <div className={styles.group}>
      <p className={styles.groupTitle}>{title}</p>
      {children}
    </div>
  );
}

interface CheckboxProps {
  label: string;
  checked: boolean;
  onChange: () => void;
}

function Checkbox({ label, checked, onChange }: CheckboxProps) {
  return (
    <label className={styles.checkbox}>
      <input type="checkbox" checked={checked} onChange={onChange} />
      <span>{label}</span>
    </label>
  );
}
