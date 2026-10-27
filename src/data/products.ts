export type ProductType =
  | "zine"
  | "poster"
  | "deck"
  | "wallpaper"
  | "experiment"
  | "object";

export type ProductStatus =
  | "available"
  | "free"
  | "incubating"
  | "archived";

export type Product = {
  id: string;
  slug: string;
  number?: string;
  title: string;
  subtitle?: string;
  type: ProductType;
  status: ProductStatus;
  price?: number;
  currency?: "BRL" | "USD";
  coverTone: "wine" | "ink" | "cream" | "night" | "moss";
  description?: string;
  format?: string;
  contents?: string;
  releaseDate?: string;
  download?: string;
  featured?: boolean;
  weight: "hero" | "large" | "small" | "wide" | "egg";
};

export const products: Product[] = [
  {
    id: "001",
    slug: "youre-not-depressed",
    number: "001",
    title: "YOU'RE NOT DEPRESSED",
    subtitle: "YOU'RE JUST JOBLESS",
    type: "zine",
    status: "available",
    price: 7,
    currency: "BRL",
    coverTone: "wine",
    description:
      "Eight pages about the difference between a mood and a calendar. Print it. Fold it. Leave it on a desk that hates you.",
    format: "PDF · A4 / US Letter",
    contents: "8 pages",
    releaseDate: "2026.10.26",
    featured: true,
    weight: "hero",
  },
  {
    id: "000",
    slug: "free-object-001",
    number: "000",
    title: "FREE OBJECT 001",
    subtitle: "A single useless star",
    type: "object",
    status: "free",
    coverTone: "cream",
    description: "One star. No instructions. Optional company.",
    format: "PNG",
    contents: "1 file",
    releaseDate: "2026.10.26",
    download: "/downloads/free-object-001.txt",
    weight: "small",
  },
  {
    id: "002",
    slug: "soft-knife",
    number: "002",
    title: "SOFT KNIFE",
    subtitle: "decisions that don't cut",
    type: "zine",
    status: "available",
    price: 9,
    currency: "BRL",
    coverTone: "ink",
    description:
      "A short pamphlet for people who rewrite the same sentence until it becomes furniture.",
    format: "PDF",
    contents: "6 pages",
    releaseDate: "2026.11.02",
    weight: "large",
  },
  {
    id: "003",
    slug: "night-bus-poster",
    number: "003",
    title: "NIGHT BUS",
    subtitle: "poster",
    type: "poster",
    status: "available",
    price: 12,
    currency: "BRL",
    coverTone: "night",
    description: "A wide quiet print. Empty seats. One light still on.",
    format: "PDF · A3",
    contents: "1 sheet",
    releaseDate: "2026.11.14",
    weight: "wide",
  },
  {
    id: "004",
    slug: "unknown-object",
    number: "???",
    title: "UNKNOWN OBJECT",
    subtitle: "INCUBATING",
    type: "experiment",
    status: "incubating",
    coverTone: "moss",
    description: "Something exists here, but it has not emerged yet.",
    releaseDate: "??.??.2027",
    weight: "egg",
  },
  {
    id: "005",
    slug: "desktop-fog",
    number: "005",
    title: "DESKTOP FOG",
    subtitle: "wallpaper pack",
    type: "wallpaper",
    status: "available",
    price: 5,
    currency: "BRL",
    coverTone: "cream",
    description: "Four stills that refuse to be motivational.",
    format: "ZIP · PNG",
    contents: "4 wallpapers",
    releaseDate: "2026.12.01",
    weight: "small",
  },
];

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function getFeatured() {
  return products.find((p) => p.featured) ?? products[0];
}

export function getShopProducts() {
  return products.filter((p) => p.status !== "archived");
}

export function getArchiveProducts() {
  return [...products].sort((a, b) =>
    (a.releaseDate ?? "9999").localeCompare(b.releaseDate ?? "9999"),
  );
}

export function formatPrice(product: Product) {
  if (product.status === "free") return "FREE";
  if (product.status === "incubating") return "—";
  if (product.price == null) return "—";
  const currency = product.currency ?? "BRL";
  if (currency === "BRL") return `R$ ${product.price}`;
  return `US$ ${product.price.toFixed(2)}`;
}
