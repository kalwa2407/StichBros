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
  // 1
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
  // 2
  {
    id: "leg-002",
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
  // 3
  {
    id: "leg-003",
    name: "Sovereign Sherwani",
    category: "Formal",
    collection: "heritage",
    price: 92000,
    image: "/brand/item_sherwani.png",
    description: "Grand ivory Sherwani for monumental ceremonies.",
    longDescription: "The ultimate expression of royal heritage. The Sovereign Sherwani is hand-crafted from raw Tussar silk, featuring intricate Zardosi embroidery that tells a story of a century-old dynasty.",
    specs: ["Tussar silk", "Gold threadwork", "Bespoke lining"],
    sizes: customSizes,
    details: [
      { label: "Material", value: "Handloom Tussar Silk" },
      { label: "Embroidery", value: "Gold Zardosi" },
      { label: "Buttons", value: "Aged Brass Crest" }
    ],
    images: ["/brand/item_sherwani.png", "/brand/item_sherwani.png"]
  },
  // 4
  {
    id: "leg-004",
    name: "Patriarch Overcoat",
    category: "Coats",
    collection: "estate",
    price: 82000,
    image: "/brand/item_overcoat.png",
    description: "Camel wool masterpiece with a velvet collar.",
    longDescription: "An heirloom-grade investment. The Patriarch Overcoat is cut from incredibly heavy camel hair wool, designed to withstand the elements while projecting an aura of absolute refinement.",
    specs: ["100% Camel hair", "Satin lining", "Heirloom grade"],
    sizes: customSizes,
    details: [
      { label: "Fabric", value: "100% Pure Camel Hair" },
      { label: "Collar", value: "Contrast Velvet" },
      { label: "Weight", value: "Heavyweight" }
    ],
    images: ["/brand/item_overcoat.png", "/brand/items_outerwear.png"]
  },
  // 5
  {
    id: "leg-005",
    name: "Onyx Gold Abaya",
    category: "Abayas",
    collection: "sovereign",
    price: 58000,
    image: "/brand/items_abayas.png",
    description: "Black silk abaya with heavy gold calligraphic embroidery.",
    longDescription: "The Onyx Gold Abaya is a fusion of modest tradition and royal luxury. Crafted from heavyweight mulberry silk, it features hand-applied gold calligraphy on the sleeves.",
    specs: ["Mulberry silk", "Zardosi embroidery", "Signature silhouette"],
    sizes: ["One Size", "Custom"],
    details: [
      { label: "Silk", value: "100% Mulberry" },
      { label: "Work", value: "Gold Calligraphy" },
      { label: "Fit", value: "Modish Flow" }
    ],
    images: ["/brand/items_abayas.png", "/brand/bright_abaya.png"]
  },
  // 6
  {
    id: "leg-006",
    name: "Heritage Formal Suit",
    category: "Formal",
    collection: "sovereign",
    price: 68000,
    image: "/brand/bright_formal.png",
    description: "A classic three-piece suit for the modern gentleman.",
    longDescription: "The Heritage Formal Suit represents the pinnacle of StitchBros craftsmanship. A full canvas construction with hand-stitched lapels, this three-piece ensemble commands respect in every setting.",
    specs: ["Super 150s wool", "Hand-stitched lapels", "Full canvas"],
    sizes: customSizes,
    details: [
      { label: "Fabric", value: "Super 150s Merino" },
      { label: "Fit", value: "Classic Tailored" },
      { label: "Lining", value: "Pure Silk Bemberg" }
    ],
    images: ["/brand/bright_formal.png", "/brand/bright_formal.png"]
  },
  // 7
  {
    id: "leg-007",
    name: "Emerald Ceremonial Abaya",
    category: "Abayas",
    collection: "heritage",
    price: 64000,
    image: "/brand/bright_abaya.png",
    description: "Emerald green abaya with intricate gold detailing.",
    longDescription: "The Emerald Ceremonial Abaya is designed for grand occasions. Featuring deep emerald silk with hand-embroidered gold floral motifs, this piece embodies regality and grace.",
    specs: ["Pure silk", "Gold floral embroidery", "Flowing silhouette"],
    sizes: ["One Size", "Custom"],
    details: [
      { label: "Fabric", value: "Pure Silk Crepe" },
      { label: "Embroidery", value: "Gold Thread Floral" },
      { label: "Occasion", value: "Ceremonial" }
    ],
    images: ["/brand/bright_abaya.png", "/brand/items_abayas.png"]
  },
  // 8
  {
    id: "leg-008",
    name: "Casual Dynasty Jacket",
    category: "Jackets",
    collection: "estate",
    price: 34000,
    image: "/brand/bright_casual.png",
    description: "A refined casual jacket for weekend retreats.",
    longDescription: "The Casual Dynasty Jacket seamlessly bridges the gap between luxury and laid-back. Crafted from brushed Italian cotton twill with a garment-washed finish for lived-in softness.",
    specs: ["Italian cotton twill", "Garment-washed", "Relaxed fit"],
    sizes: commonSizes,
    details: [
      { label: "Fabric", value: "Italian Cotton Twill" },
      { label: "Finish", value: "Garment Washed" },
      { label: "Fit", value: "Relaxed Modern" }
    ],
    images: ["/brand/bright_casual.png", "/brand/bright_casual.png"]
  },
  // 9
  {
    id: "leg-009",
    name: "Estate Wool Trenchcoat",
    category: "Coats",
    collection: "estate",
    price: 78000,
    image: "/brand/outerwear.png",
    description: "A timeless double-breasted trenchcoat in charcoal wool.",
    longDescription: "The Estate Wool Trenchcoat is the ultimate expression of outerwear mastery. Double-breasted with horn buttons and a storm flap, it protects against the elements while maintaining an impeccable silhouette.",
    specs: ["Pure wool gabardine", "Horn buttons", "Storm flap"],
    sizes: customSizes,
    details: [
      { label: "Fabric", value: "Wool Gabardine" },
      { label: "Closure", value: "Double-breasted" },
      { label: "Collar", value: "Storm Shield" }
    ],
    images: ["/brand/outerwear.png", "/brand/items_outerwear.png"]
  },
  // 10
  {
    id: "leg-010",
    name: "Artisan Leather Accessories",
    category: "Accessories",
    collection: "sovereign",
    price: 18500,
    image: "/brand/accessories.png",
    description: "Hand-stitched leather goods for the discerning collector.",
    longDescription: "The Artisan Leather collection features hand-stitched Florentine leather goods. Each piece is individually numbered and comes with a certificate of authenticity from our master leatherworkers.",
    specs: ["Florentine leather", "Hand-stitched", "Numbered edition"],
    sizes: ["One Size"],
    details: [
      { label: "Material", value: "Florentine Calfskin" },
      { label: "Stitching", value: "Hand Saddle-stitch" },
      { label: "Edition", value: "Limited Numbered" }
    ],
    images: ["/brand/accessories.png", "/brand/accessories.png"]
  },
  // 11
  {
    id: "leg-011",
    name: "Dynasty Heritage Collection",
    category: "Formal",
    collection: "heritage",
    price: 125000,
    image: "/brand/heritage.png",
    description: "A curated heritage formal ensemble for the patriarch.",
    longDescription: "The Dynasty Heritage Collection is a complete formal ensemble that includes a bespoke suit, waistcoat, and hand-tied cravat. Inspired by the founders' original patterns from 1924, this is a living piece of history.",
    specs: ["Heritage pattern", "Complete ensemble", "Archival design"],
    sizes: customSizes,
    details: [
      { label: "Origin", value: "1924 Original Pattern" },
      { label: "Pieces", value: "3-Piece Ensemble" },
      { label: "Edition", value: "Archive Reissue" }
    ],
    images: ["/brand/heritage.png", "/brand/legacy_portraits.png"]
  },
  // 12
  {
    id: "leg-012",
    name: "Curated Collection Box",
    category: "Collections",
    collection: "sovereign",
    price: 95000,
    image: "/brand/products_collection.png",
    description: "An exclusive seasonal collection box with hand-picked pieces.",
    longDescription: "The Curated Collection Box delivers a seasonal assortment of our finest pieces, hand-selected by our master tailors. Each box is unique and tailored to the recipient's personal style profile.",
    specs: ["Seasonal curation", "Hand-selected", "Personal styling"],
    sizes: ["S-M", "L-XL"],
    details: [
      { label: "Contents", value: "4-6 Pieces" },
      { label: "Curation", value: "Master Tailor" },
      { label: "Packaging", value: "Heritage Wood Box" }
    ],
    images: ["/brand/products_collection.png", "/brand/items_mixed.png"]
  },
];

const legacyTimeline: Legacy[] = [
  {
    year: "1924",
    title: "The First Stitch",
    description: "Founded in the heart of the city, StichBros began as a private atelier for the elite.",
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
      name: "STITCHBROS",
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
