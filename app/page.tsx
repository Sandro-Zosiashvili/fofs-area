"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import FilterPanel, { type FilterState, type SortOption } from "@/components/FilterPanel/FilterPanel";
import Footer from "@/components/Footer/Footer";
import Hero from "@/components/Hero/Hero";
import Navbar from "@/components/Navbar/Navbar";
import ProductCard, { type SwatchTone } from "@/components/ProductCard/ProductCard";
import { type Category, type HeelHeight, type Material, type Style } from "@/types/catalog";
import styles from "./page.module.scss";

interface ProductEntry {
  id: string;
  name: string;
  collection: string;
  description: string;
  priceLabel: string;
  priceValue: number;
  colors: SwatchTone[];
  sizes: number[];
  tags: string[];
  badge?: string;
  category: Category;
  materials: Material[];
  style: Style;
  heelHeight: HeelHeight;
  inStock: boolean;
  newness: number;
  artisanScore: number;
  imageSrc: string;
  imageAlt: string;
}

const products: ProductEntry[] = [
  {
    id: "nocturne-derby",
    name: "Nocturne Derby",
    collection: "Instrument 04",
    description: "Hand-burnished derby with edge-bonded graphite outsole and memory-foam collar.",
    priceLabel: "€820",
    priceValue: 820,
    colors: ["onyx", "crimson", "sage"],
    sizes: [39, 40, 41, 42, 43, 44],
    tags: ["Graphite outsole", "Pressure mapped footbed", "Storm welt"],
    badge: "New",
    category: "Derby",
    materials: ["Pebble leather", "Suede"],
    style: "Architected",
    heelHeight: "Flat",
    inStock: true,
    newness: 5,
    artisanScore: 9.4,
    imageSrc:
      "https://images.unsplash.com/photo-1613216933445-9dc0e3765d9e?auto=format&fit=crop&w=1000&q=80",
    imageAlt: "Black derby shoe with polished leather and tonal sole",
  },
  {
    id: "lumen-mule",
    name: "Lumen Mule",
    collection: "Quiet Atelier",
    description: "Minimal slip-on mule with contoured carbon footbed and matte buckle hardware.",
    priceLabel: "€640",
    priceValue: 640,
    colors: ["pearl", "graphite"],
    sizes: [36, 37, 38, 39, 40],
    tags: ["Featherlight upper", "Carbon footbed", "Sculpted topline"],
    badge: "Capsule",
    category: "Mule",
    materials: ["Nappa"],
    style: "Minimalist",
    heelHeight: "Flat",
    inStock: true,
    newness: 4,
    artisanScore: 8.7,
    imageSrc:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1000&q=80",
    imageAlt: "Minimal graphite mule with sculpted silhouette",
  },
  {
    id: "cinder-boot",
    name: "Cinder Boot",
    collection: "Studio Line",
    description: "Sculpted ankle boot with recycled knit shaft and sealed seam guard.",
    priceLabel: "€980",
    priceValue: 980,
    colors: ["onyx", "umber"],
    sizes: [37, 38, 39, 40, 41],
    tags: ["Climate membrane", "Recycled knit", "Seam-guarded upper"],
    badge: "Limited",
    category: "Boot",
    materials: ["Recycled knit", "Pebble leather"],
    style: "Technical",
    heelHeight: "Mid",
    inStock: false,
    newness: 3,
    artisanScore: 9.2,
    imageSrc:
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&q=80",
    imageAlt: "Dark technical ankle boot with knit upper",
  },
  {
    id: "serene-sneaker",
    name: "Serene Sneaker",
    collection: "Motion Series",
    description: "Tonal sneaker with thermal-lined interior and ripple outsole for adaptive traction.",
    priceLabel: "€540",
    priceValue: 540,
    colors: ["sage", "pearl"],
    sizes: [38, 39, 40, 41, 42, 43],
    tags: ["Thermal lining", "Ripple outsole", "Breathable knit"],
    category: "Sneaker",
    materials: ["Recycled knit", "Suede"],
    style: "Technical",
    heelHeight: "Flat",
    inStock: true,
    newness: 2,
    artisanScore: 8.4,
    imageSrc:
      "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?auto=format&fit=crop&w=1000&q=80",
    imageAlt: "Soft green sneaker with ripple outsole",
  },
  {
    id: "ember-heel",
    name: "Ember Heel",
    collection: "Attunement",
    description: "Stacked heel mule with burnished strap and ortholite cushioning.",
    priceLabel: "€760",
    priceValue: 760,
    colors: ["ember", "pearl"],
    sizes: [35, 36, 37, 38, 39],
    tags: ["Ortholite core", "Stacked heel", "Micro-laser edge"],
    category: "Mule",
    materials: ["Nappa", "Suede"],
    style: "Sculpted",
    heelHeight: "High",
    inStock: true,
    newness: 4,
    artisanScore: 9.1,
    imageSrc:
      "https://images.unsplash.com/photo-1542293787938-4d2726154511?auto=format&fit=crop&w=1000&q=80",
    imageAlt: "Red-toned heel with sculpted profile",
  },
  {
    id: "valence-boot",
    name: "Valence Boot",
    collection: "Residency",
    description: "Tall boot with bonded storm welt and satin-lined shaft for seasonal resilience.",
    priceLabel: "€1,120",
    priceValue: 1120,
    colors: ["onyx", "graphite"],
    sizes: [37, 38, 39, 40, 41, 42],
    tags: ["Bonded welt", "Satin lining", "Cold-weather ready"],
    badge: "Atelier",
    category: "Boot",
    materials: ["Pebble leather"],
    style: "Architected",
    heelHeight: "Mid",
    inStock: true,
    newness: 5,
    artisanScore: 9.7,
    imageSrc:
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1000&q=80",
    imageAlt: "Tall black boot with satin lining",
  },
  {
    id: "arc-sneaker",
    name: "Arc Sneaker",
    collection: "Edition 02",
    description: "Architected sneaker with split midsole and magnetic lace stays for a clean profile.",
    priceLabel: "€590",
    priceValue: 590,
    colors: ["graphite", "sage"],
    sizes: [38, 39, 40, 41, 42, 43, 44],
    tags: ["Magnetic lace stay", "Split midsole", "Vegan lining"],
    category: "Sneaker",
    materials: ["Recycled knit", "Suede"],
    style: "Minimalist",
    heelHeight: "Flat",
    inStock: true,
    newness: 3,
    artisanScore: 8.9,
    imageSrc:
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=1000&q=80",
    imageAlt: "Graphite sneaker with sculpted outsole",
  },
  {
    id: "terra-derby",
    name: "Terra Derby",
    collection: "Residency",
    description: "Earth-toned derby with cork midsole, hand-painted edges, and removable insole.",
    priceLabel: "€720",
    priceValue: 720,
    colors: ["umber", "pearl"],
    sizes: [39, 40, 41, 42, 43],
    tags: ["Cork midsole", "Hand-painted edges", "Removable insole"],
    category: "Derby",
    materials: ["Pebble leather", "Suede"],
    style: "Architected",
    heelHeight: "Flat",
    inStock: false,
    newness: 2,
    artisanScore: 8.3,
    imageSrc:
      "https://images.unsplash.com/photo-1520256862855-398228c41684?auto=format&fit=crop&w=1000&q=80",
    imageAlt: "Brown derby shoe on neutral background",
  },
];

const priceBounds = {
  min: Math.min(...products.map((product) => product.priceValue)),
  max: Math.max(...products.map((product) => product.priceValue)),
};

const sorters: Record<SortOption, (a: ProductEntry, b: ProductEntry) => number> = {
  featured: (a, b) => b.artisanScore - a.artisanScore,
  "price-asc": (a, b) => a.priceValue - b.priceValue,
  "price-desc": (a, b) => b.priceValue - a.priceValue,
  newest: (a, b) => b.newness - a.newness,
  artisan: (a, b) => b.artisanScore - a.artisanScore,
};

export default function Home() {
  const [filters, setFilters] = useState<FilterState>({
    query: "",
    maxPrice: priceBounds.max,
    categories: [],
    materials: [],
    tones: [],
    styles: [],
    heelHeights: [],
    size: null,
    inStockOnly: false,
    sort: "featured",
  });

  // priceBounds is a module-level constant derived once from the static product array
  const activeFiltersCount = useMemo(() => {
    const counts = [
      filters.query ? 1 : 0,
      filters.categories.length,
      filters.materials.length,
      filters.tones.length,
      filters.styles.length,
      filters.heelHeights.length,
      filters.size ? 1 : 0,
      filters.inStockOnly ? 1 : 0,
      filters.maxPrice < priceBounds.max ? 1 : 0,
    ];
    return counts.reduce((total, val) => total + val, 0);
  }, [filters]);

  const filteredProducts = useMemo(() => {
    const normalizedQuery = filters.query.trim().toLowerCase();
    const matches = products.filter((product) => {
      if (product.priceValue > filters.maxPrice) return false;
      if (filters.categories.length && !filters.categories.includes(product.category)) return false;
      if (filters.materials.length && !filters.materials.some((material) => product.materials.includes(material)))
        return false;
      if (filters.styles.length && !filters.styles.includes(product.style)) return false;
      if (filters.heelHeights.length && !filters.heelHeights.includes(product.heelHeight)) return false;
      if (filters.tones.length && !filters.tones.some((tone) => product.colors.includes(tone))) return false;
      if (filters.size && !product.sizes.includes(filters.size)) return false;
      if (filters.inStockOnly && !product.inStock) return false;
      if (!normalizedQuery) return true;

      const searchableContent = `${product.name} ${product.collection} ${product.description} ${product.tags.join(" ")}`.toLowerCase();
      return searchableContent.includes(normalizedQuery);
    });

    return matches.sort(sorters[filters.sort]);
  }, [filters]);

  const updateFilters = <K extends keyof FilterState>(key: K, value: FilterState[K]) =>
    setFilters((prev) => ({ ...prev, [key]: value }));
  const resetFilters = () =>
    setFilters({
      query: "",
      maxPrice: priceBounds.max,
      categories: [],
      materials: [],
      tones: [],
      styles: [],
      heelHeights: [],
      size: null,
      inStockOnly: false,
      sort: "featured",
    });

  return (
    <div className={styles.page}>
      <Navbar cartCount={3} />

      <main className={styles.main}>
        <Hero
          heading="Architected footwear for precision-led movement."
          subheading="Fofs Area sculpts silhouettes that pair low-noise luxury with engineered comfort. Each pair is cut, lasted, and finished across Tbilisi and Berlin ateliers."
        />

        <section className={styles.assurances} id="atelier" aria-label="atelier promises">
          {[
            {
              title: "Pressure-mapped comfort",
              body: "Footbeds tuned per size run with zoned memory foam and cork inlays for multi-climate wear.",
            },
            {
              title: "Traceable sourcing",
              body: "Bio-based leathers and recycled knits audited against REACH and low-impact dyeing partners.",
            },
            {
              title: "48h EU dispatch",
              body: "Pairs leave our Berlin micro-hub within 48 hours, fully carbon-offset and trackable.",
            },
          ].map((item) => (
            <motion.div
              key={item.title}
              className={styles.assurance}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.4 }}
            >
              <span className={styles.glowDot} />
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </motion.div>
          ))}
        </section>

        <section id="collections" className={styles.collectionSection} aria-labelledby="collection-title">
          <div className={styles.sectionHeader}>
            <p>Collection</p>
            <div>
              <h2 id="collection-title">Curated silhouettes for deliberate movement</h2>
              <p className={styles.muted}>
                Modular filters adapt the catalog instantly. Apply tones, materials, sizing, and investment ceiling to
                preview exact fits.
              </p>
            </div>
          </div>

          <FilterPanel
            filters={filters}
            onUpdate={updateFilters}
            onReset={resetFilters}
            activeFiltersCount={activeFiltersCount}
            priceBounds={priceBounds}
            colorOptions={[
              { id: "crimson", label: "Crimson" },
              { id: "ember", label: "Ember" },
              { id: "graphite", label: "Graphite" },
              { id: "onyx", label: "Onyx" },
              { id: "sage", label: "Sage" },
              { id: "pearl", label: "Pearl" },
              { id: "umber", label: "Umber" },
            ]}
          />

          <div className={styles.resultHeader}>
            <div>
              <p className={styles.muted}>Showing {filteredProducts.length} out of {products.length} crafted pieces</p>
              {filters.inStockOnly ? <span className={styles.inlineBadge}>In-stock only</span> : null}
            </div>
          </div>

          <motion.div
            className={styles.productGrid}
            variants={{ visible: { transition: { staggerChildren: 0.08, delayChildren: 0.12 } } }}
            initial="hidden"
            animate="visible"
          >
            <AnimatePresence>
              {filteredProducts.map((product) => (
                <motion.div
                  key={product.id}
                  variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
                  layout="position"
                  transition={{ duration: 0.32, ease: "easeOut" }}
                >
                  <ProductCard
                    id={product.id}
                    name={product.name}
                    collection={product.collection}
                    description={product.description}
                    priceLabel={product.priceLabel}
                    imageSrc={product.imageSrc}
                    imageAlt={product.imageAlt}
                    colors={product.colors}
                    sizes={product.sizes}
                    tags={product.tags}
                    badge={product.badge}
                    inStock={product.inStock}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </section>

        <section className={styles.story} id="services">
          <div className={styles.storyCopy}>
            <p className={styles.muted}>Concierge</p>
            <h3>Book a private fitting, remote or in-residence.</h3>
            <p>
              Our stylists blueprint your preferred silhouettes, pressure-map your stride, and coordinate bespoke
              finishing. Sessions are available in-studio or via guided remote kit.
            </p>
            <div className={styles.storyActions}>
              <a href="#collections" className={styles.primary}>
                Reserve a session
              </a>
              <a href="#journal" className={styles.secondary}>
                View journal
              </a>
            </div>
          </div>
          <div className={styles.storyCard}>
            <div className={styles.cardTop}>
              <span className={styles.glowDot} />
              <p>Session kit includes sizing tools, swatches, and delivery labels.</p>
            </div>
            <ul>
              <li>1:1 stylist video fitting</li>
              <li>Next-day courier of kit in EU</li>
              <li>Express exchange on first pair</li>
            </ul>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
