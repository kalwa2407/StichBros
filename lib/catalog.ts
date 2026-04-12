export type Product = {
  id: string;
  name: string;
  brand?: string;
  category: string;
  collection: string;
  price: number;
  image: string;
  description: string;
  longDescription?: string;
  specs: string[];
  sizes: string[];
  details: { label: string; value: string }[];
  images: string[]; // For the PDP gallery
};

export type Collection = {
  slug: string;
  name: string;
  headline: string;
  description: string;
  image: string;
};

export type Legacy = {
  year: string;
  title: string;
  description: string;
  image?: string;
};

const commonSizes = ["S", "M", "L", "XL", "XXL"];
const customSizes = ["38", "40", "42", "44", "46"];

const collections: Collection[] = [
  {
    slug: "sovereign",
    name: "The Sovereign Suite",
    headline: "Bespoke Power for the Modern Patriarch.",
    description: "Hand-crafted tailoring that transcends trends, built on a century of artisanal excellence.",
    image: "/brand/items_shirts.png",
  },
  {
    slug: "estate",
    name: "The Estate Edit",
    headline: "Exquisite Outerwear for Sovereign Presence.",
    description: "Command the elements with fabrics that speak of old-world refinement and new-age authority.",
    image: "/brand/item_overcoat.png",
  }
];

const products: Product[] = [
  // --- SHIRTS (6 items) ---
  {
    id: "leg-001",
    name: "Regency White Shirt",
    category: "Shirts",
    collection: "sovereign",
    price: 12450,
    image: "/brand/item_shirt_white.png",
    description: "Bespoke cotton perfection with a traditional double-cuff.",
    longDescription: "A masterpiece of heritage tailoring, the Regency White Shirt is crafted from the finest 140/2 double-twisted Sea Island cotton. Designed for the modern patriarch, it features a semi-spread collar and classic French cuffs for a presence of absolute authority.",
    specs: ["140/2 Sea Island cotton", "Mother-of-pearl buttons", "French seams"],
    sizes: commonSizes,
    details: [
      { label: "Fabric", value: "100% Giza Cotton" },
      { label: "Fit", value: "Bespoke Tailored" },
      { label: "Cuff", value: "French Double Cuff" }
    ],
    images: ["/brand/item_shirt_white.png", "/brand/items_shirts.png", "/brand/item_shirt_white.png", "/brand/items_shirts.png"]
  },
  {
    id: "leg-002",
    name: "Consul Striped Oxford",
    category: "Shirts",
    collection: "sovereign",
    price: 9800,
    image: "/brand/item_shirt_white.png",
    description: "A professional blue striped shirt for institutional presence.",
    longDescription: "The Consul Oxford brings institutional weight to your daily wardrobe. Featuring a subtle blue micro-stripe, this piece is cut from heavy-duty yet breathable Oxford weave, ensuring you stay composed from the boardroom to the heritage gala.",
    specs: ["Premium Oxford weave", "Button-down collar", "Tailored fit"],
    sizes: commonSizes,
    details: [
      { label: "Fabric", value: "Premium Oxford" },
      { label: "Collar", value: "Button-down" },
      { label: "Origin", value: "Italian Mill" }
    ],
    images: ["/brand/item_shirt_white.png", "/brand/item_shirt_white.png"]
  },

  // --- FORMAL & SUITS (Hero Items) ---
  {
    id: "leg-022",
    name: "Sovereign Velvet Blazer",
    category: "Jackets",
    collection: "sovereign",
    price: 46000,
    image: "/brand/item_velvet_blazer.png",
    description: "Midnight navy velvet blazer for evening galas.",
    longDescription: "Command the room in the Sovereign Velvet Blazer. Cut from ultra-high density jewel-tone velvet, this architectural piece features hand-rolled silk lapels and a full canvas construction that molds to your frame over time.",
    specs: ["Jewel-tone velvet", "Silk lapels", "Slim peak"],
    sizes: customSizes,
    details: [
      { label: "Outer", value: "100% Cotton Velvet" },
      { label: "Lining", value: "Luxe Bemberg Silk" },
      { label: "Construction", value: "Full Canvas" }
    ],
    images: ["/brand/item_velvet_blazer.png", "/brand/item_velvet_blazer.png"]
  },
  {
    id: "leg-017",
    name: "Sovereign Sherwani",
    category: "Formal",
    collection: "heritage",
    price: 92000,
    image: "/brand/item_sherwani.png",
    description: "Grand ivory Sherwani for monumental ceremonies.",
    longDescription: "The ultimate expression of royal heritage. The Sovereign Sherwani is hand-crafted from raw Tussar silk, featuring intricate Zardosi embroidery that tells a story of a century-old dynasty. Each button is a custom-engraved brass crest.",
    specs: ["Tussar silk", "Gold threadwork", "Bespoke lining"],
    sizes: customSizes,
    details: [
      { label: "Material", value: "Handloom Tussar Silk" },
      { label: "Embroidery", value: "Gold Zardosi" },
      { label: "Buttons", value: "Aged Brass Crest" }
    ],
    images: ["/brand/item_sherwani.png", "/brand/item_sherwani.png"]
  },
  {
    id: "leg-020",
    name: "Patriarch Overcoat",
    category: "Coats",
    collection: "estate",
    price: 82000,
    image: "/brand/item_overcoat.png",
    description: "Camel wool masterpiece with a velvet collar.",
    longDescription: "An heirloom-grade investment. The Patriarch Overcoat is cut from incredibly heavy camel hair wool, designed to withstand the elements while projecting an aura of absolute refinement. Features a signature detachable velvet collar.",
    specs: ["100% Camel hair", "Satin lining", "Heirloom grade"],
    sizes: customSizes,
    details: [
      { label: "Fabric", value: "100% Pure Camel Hair" },
      { label: "Collar", value: "Contrast Velvet" },
      { label: "Weight", value: "Heavyweight" }
    ],
    images: ["/brand/item_overcoat.png", "/brand/item_overcoat.png"]
  },

  // --- ABAYAS (3 items) ---
  {
    id: "leg-013",
    name: "Onyx Gold Abaya",
    category: "Abayas",
    collection: "sovereign",
    price: 58000,
    image: "/brand/items_abayas.png",
    description: "Black silk abaya with heavy gold calligraphic embroidery.",
    longDescription: "The Onyx Gold Abaya is a fusion of modest tradition and royal luxury. Crafted from heavyweight mulberry silk, it features hand-applied gold calligraphy on the sleeves that serves as a modern declaration of authority.",
    specs: ["Mulberry silk", "Zardosi embroidery", "Signature silhouette"],
    sizes: ["One Size", "Custom"],
    details: [
      { label: "Silk", value: "100% Mulberry" },
      { label: "Work", value: "Gold Calligraphy" },
      { label: "Fit", value: "Modish Flow" }
    ],
    images: ["/brand/items_abayas.png", "/brand/items_abayas.png"]
  }
];

const legacyTimeline: Legacy[] = [
  {
    year: "1924",
    title: "The First Stitch",
    description: "Founded in the heart of the city, Choice began as a private atelier for the elite.",
    image: "/brand/legacy_portraits.png"
  },
  {
    year: "1958",
    title: "The Royal Purveyor",
    description: "Awarded as the lead tailor for national ceremony, solidifying the dynasty.",
  },
  {
    year: "2024",
    title: "The Modern Legacy",
    description: "Continuing the tradition of invisible precision and visible power.",
  }
];

export function getHomepageData() {
  return {
    brand: {
      name: "CHOICE",
      tagline: "Preserving Art. Building Legacies.",
      description: "Bespoke tailoring for the modern dynasty. Every stitch is a testament to history and a declaration of authority.",
    },
    collections,
    products,
    legacyTimeline
  };
}

export function getProductById(id: string) {
  return products.find(p => p.id === id);
}
