/**
 * JAVED ORGANIC STORE - MASTER CONFIGURATION & PRODUCT DATA
 * =========================================================
 * Modify STORE_CONFIG to easily update store phone number, address, or details.
 * All products are strictly structured and easily extensible.
 */

export const STORE_CONFIG = {
  name: "Javed Organic Store",
  tagline: "Pure Desi Taste, Handcrafted with Purity",
  subTagline: "100% Pure, Hand-Crafted In-House Desi Delicacies Delivered Across Pakistan",
  // WhatsApp Number: +92 300 7104781
  whatsappNumber: "923007104781",
  whatsappDisplayNumber: "+92 300 7104781",
  secondaryWhatsApp: "+92 300 7104781",
  email: "orders@javedorganic.store",
  storeType: "100% Online Store (Fresh In-House Preparation)",
  address: "Online Store • Direct Fresh In-House Dispatch Across Pakistan",
  deliveryCoverage: "Nationwide Doorstep Delivery (Karachi, Lahore, Islamabad, Rawalpindi, Peshawar, Quetta, Faisalabad, Multan & all Pakistan cities/villages)",
  businessHours: "Monday - Sunday: 9:00 AM - 11:00 PM (WhatsApp Orders 24/7)",
  socials: {
    instagram: "https://instagram.com",
    facebook: "https://facebook.com",
    youtube: "https://youtube.com",
    tiktok: "https://tiktok.com",
  },
};

/**
 * Sanitize and format WhatsApp phone number to guarantee 100% compatibility
 */
const getCleanWhatsAppPhone = () => {
  return STORE_CONFIG.whatsappNumber.replace(/\D/g, "");
};

/**
 * Generate a clean pre-filled WhatsApp message URL (Price Inquiry / Rate Request)
 */
export const createWhatsAppOrderUrl = ({
  productName,
  weight,
  quantity = 1,
  customNote = "",
}) => {
  const cleanPhone = getCleanWhatsAppPhone();

  const lines = [
    "Assalam o Alaikum!",
    `I want to order / check rate for *${productName}* from *${STORE_CONFIG.name}*:`,
    "",
    weight ? `Selected Weight/Size: ${weight}` : "",
    `Quantity: ${quantity}`,
    customNote ? `Note: ${customNote}` : "",
    "",
    "Please share the latest price rate and delivery details.",
    "JazakAllah!"
  ].filter(Boolean);

  const message = lines.join("\n");
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
};

/**
 * General inquiry WhatsApp URL
 */
export const createWhatsAppGeneralInquiryUrl = (topic = "General Rate Inquiry") => {
  const cleanPhone = getCleanWhatsAppPhone();
  const message = `Assalam o Alaikum!\nI am contacting *${STORE_CONFIG.name}* regarding *${topic}*. Please share available products, latest rates, and delivery details.`;
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
};

export const CATEGORIES = [
  { id: "all", name: "All Products", count: 12 },
  { id: "ghee", name: "Desi Ghee & Makhan", count: 2 },
  { id: "honey", name: "Pure Raw Honey", count: 2 },
  { id: "oils", name: "Organic Oils", count: 3 },
  { id: "sweeteners", name: "Desi Shakkar & Gur", count: 2 },
  { id: "dryfruits", name: "Dry Fruits & Panjeeri", count: 2 },
  { id: "herbs", name: "Himalayan Herbs & Salajeet", count: 1 },
];

export const PRODUCTS = [
  {
    id: "pure-desi-buffalo-ghee",
    category: "ghee",
    name: "Pure Buffalo Desi Ghee (Khaalis Bilona Ghee)",
    tagline: "Granular Danedaar Texture • In-House Cultured Butter (Makhan)",
    shortDescription: "Traditional hand-churned buffalo ghee made in-house via the authentic bilona method. Rich authentic aroma, granular texture, zero additives.",
    fullDescription: "Our Pure Desi Buffalo Ghee is crafted in-house using the centuries-old traditional 'Bilona' technique. Fresh milk from grass-fed cattle is cultured into creamy yogurt (dahi), hand-churned into pure white butter (makhan), and gently simmered over slow heat into golden, aromatic, granular (danedar) ghee. Absolutely free from palm oil, artificial essences, or preservatives.",
    badge: "Bestseller",
    badgeType: "gold",
    rating: 5.0,
    reviewsCount: 184,
    image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=900&q=80",
    inStock: true,
    variants: [
      { weight: "500 Grams", isDefault: false },
      { weight: "1 Kilogram (1 KG)", isDefault: true },
      { weight: "2 Kilograms (2 KG)", isDefault: false },
      { weight: "5 KG Family Tin", isDefault: false },
    ],
    benefits: [
      "100% In-house prepared Bilona Ghee churned from curd (dahi)",
      "Naturally high smoke point, ideal for parathas & desi cooking",
      "Rich in natural Vitamin A, D, E, K and healthy butyric acid",
      "No chemical bleaching, no added essence or vegetable fats",
      "Authentic Danedaar (granular) texture with rich fragrance"
    ],
    purityGuarantee: "Guaranteed 100% pure or full money-back guarantee with testing report.",
  },
  {
    id: "pure-cow-desi-ghee-a2",
    category: "ghee",
    name: "Pure Cow Desi Ghee (A2 Sahiwal Cow)",
    tagline: "Golden Glow • Easy to Digest • Superfood for Brain & Joints",
    shortDescription: "Pure golden ghee prepared in-house from indigenous Sahiwal / Cholistani cows. Nourishing, aromatic, and excellent for health and vitality.",
    fullDescription: "Derived from free-grazing indigenous Sahiwal cows known for wholesome A2 milk protein. Our A2 Cow Desi Ghee is prepared strictly in-house following the slow-cooking process. It has an unmistakable vibrant golden color, a mild nutty aroma, and a light texture that melts smoothly on warm rotis and daal.",
    badge: "Premium Choice",
    badgeType: "emerald",
    rating: 4.9,
    reviewsCount: 142,
    image: "https://images.unsplash.com/photo-1628088062854-d1870b4553da?auto=format&fit=crop&w=900&q=80",
    inStock: true,
    variants: [
      { weight: "500 Grams", isDefault: false },
      { weight: "1 Kilogram (1 KG)", isDefault: true },
      { weight: "2 Kilograms (2 KG)", isDefault: false },
    ],
    benefits: [
      "Prepared in-house from pure indigenous Pakistani A2 cows",
      "Gentle on stomach, supports gut health & immunity",
      "Enhances memory, eyesight, and joint lubrication",
      "Natural golden beta-carotene richness without artificial dyes"
    ],
    purityGuarantee: "100% unpasteurized raw butter source with zero blending.",
  },
  {
    id: "pure-wild-sidr-honey",
    category: "honey",
    name: "Pure Wild Sidr (Beri) Honey - Chhoti Makhi",
    tagline: "100% Raw & Unprocessed • Hand-Extracted & Filtered In-House",
    shortDescription: "Elite grade pure Beri (Sidr) Honey harvested from wild small honeybees. Thick, aromatic, raw, and completely unpasteurized.",
    fullDescription: "Known as one of the world's most prized natural honeys, our Chhoti Makhi Beri Honey is harvested from wild Sidr (Jujube) forests. It is carefully packed in-house completely raw, unheated, and unfiltered, retaining all natural bee pollen, enzymes, and medicinal properties.",
    badge: "100% Raw Sidr",
    badgeType: "gold",
    rating: 5.0,
    reviewsCount: 219,
    image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=900&q=80",
    inStock: true,
    variants: [
      { weight: "500 Grams Glass Jar", isDefault: false },
      { weight: "1 Kilogram (1 KG)", isDefault: true },
    ],
    benefits: [
      "Extracted from Chhoti Makhi (Apis florea) & wild Beri blossom",
      "Zero sugar syrup feeding, zero heating, zero pasteurization",
      "Potent natural antibacterial, antiviral & immunity booster",
      "Packed in sterile, heavy food-grade glass jars to preserve freshness"
    ],
    purityGuarantee: "Lab-tested for zero adulteration, sucrose and C4 sugar levels.",
  },
  {
    id: "pure-wildflower-honey",
    category: "honey",
    name: "Natural Mountain Acacia & Wildflower Honey",
    tagline: "Light Floral Notes • Bari Makhi • Great Daily Natural Sweetener",
    shortDescription: "Crystal-clear, sweet mountain wildflower honey. Perfect for tea, breakfast, smoothies, and kids.",
    fullDescription: "Harvested from pristine alpine flora and acacia blooms of Swat and Kashmir valleys. Hand-filtered in-house, this Bari Makhi wildflower honey has a gentle golden tone, delicate floral sweetness, and stays liquid naturally longer.",
    badge: "Daily Natural",
    badgeType: "emerald",
    rating: 4.8,
    reviewsCount: 96,
    image: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?auto=format&fit=crop&w=900&q=80",
    inStock: true,
    variants: [
      { weight: "500 Grams Glass Jar", isDefault: false },
      { weight: "1 Kilogram (1 KG)", isDefault: true },
    ],
    benefits: [
      "100% natural, unheated blossom nectar",
      "Delicate, smooth taste loved by children & family",
      "Natural energy booster for active routines and workouts"
    ],
    purityGuarantee: "Directly sourced from trusted mountain apiaries with zero corn syrup.",
  },
  {
    id: "organic-mustard-oil-kachi-ghani",
    category: "oils",
    name: "Pure Mustard Oil (Kachi Ghani Sarson)",
    tagline: "Pure Kachi Ghani • In-House Extracted • Sharp Desi Aroma",
    shortDescription: "Extracted in-house from premium native black mustard seeds. Retains natural pungency and vitamins.",
    fullDescription: "Our Kachi Ghani Sarson ka Tel is pressed in-house at low temperatures without any heating, chemical solvents, or mineral oil dilution. It has the authentic spicy aroma and golden-amber tint that elevates traditional Pakistani saag, achaar, frying, and hair care.",
    badge: "Pure Oil",
    badgeType: "gold",
    rating: 4.9,
    reviewsCount: 118,
    image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=900&q=80",
    inStock: true,
    variants: [
      { weight: "1 Litre Bottle", isDefault: true },
      { weight: "2 Litre Can", isDefault: false },
      { weight: "5 Litre Jerry Can", isDefault: false },
    ],
    benefits: [
      "100% pure extraction in-house with zero additives",
      "Unmatched flavor for authentic Desi Saag & Karahi",
      "Excellent hair tonic for deep root nourishment & dandruff",
      "Rich in Omega-3 fatty acids & natural antioxidants"
    ],
    purityGuarantee: "Pure food-grade edible mustard oil with no palm or mineral oil mixing.",
  },
  {
    id: "cold-pressed-almond-oil",
    category: "oils",
    name: "Pure Sweet Almond Oil (Roghan-e-Badam Shirin)",
    tagline: "100% Edible & Therapeutic • In-House Extracted from Mamra Badam",
    shortDescription: "Pure sweet almond oil pressed in-house from Californian & Mamra almonds. Edible, deeply nourishing for brain, skin, hair, and infant massage.",
    fullDescription: "Extracted drop by drop in-house from pure sweet almond kernels. Free from any fragrances or carrier oils. Can be taken with warm milk for brain stamina and constipation relief, applied on face for radiant skin, or used for baby massage.",
    badge: "100% Edible",
    badgeType: "emerald",
    rating: 5.0,
    reviewsCount: 88,
    image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=900&q=80",
    inStock: true,
    variants: [
      { weight: "120 ml Glass Dropper", isDefault: true },
      { weight: "250 ml Bottle", isDefault: false },
    ],
    benefits: [
      "100% food-grade pure sweet almond extract prepared in-house",
      "Boosts memory & relieves mental fatigue with warm milk",
      "Deep skin hydration, lightens dark circles naturally",
      "Gentle and nourishing for newborn baby massage"
    ],
    purityGuarantee: "Pure, clear, unadulterated oil with zero cosmetic fillers.",
  },
  {
    id: "extra-virgin-olive-oil",
    category: "oils",
    name: "Extra Virgin Olive Oil (Zaitoon ka Tel)",
    tagline: "Unfiltered First Extraction • Low Acidity • Heart-Healthy Quality",
    shortDescription: "Unfiltered extra virgin olive oil. Rich in polyphenols, ideal for daily wellness, salads, dressings, and gentle cooking.",
    fullDescription: "Carefully extracted from the finest freshly picked olives within 24 hours of harvest. Packed in-house with acidity under 0.5%, it offers a rich fruity aroma and peppery antioxidant finish.",
    badge: "Extra Virgin",
    badgeType: "gold",
    rating: 4.9,
    reviewsCount: 75,
    image: "https://images.unsplash.com/photo-1471193945509-9ad0617afabf?auto=format&fit=crop&w=900&q=80",
    inStock: true,
    variants: [
      { weight: "500 ml Dark Glass Bottle", isDefault: true },
      { weight: "1 Litre Dark Glass Bottle", isDefault: false },
    ],
    benefits: [
      "Pure extraction under 27°C",
      "High natural polyphenols & heart-friendly monounsaturated fats",
      "Shielded in UV-protective dark glass bottle"
    ],
    purityGuarantee: "Zero refined pomace blending, 100% extra virgin grade.",
  },
  {
    id: "traditional-desi-shakkar",
    category: "sweeteners",
    name: "Organic Desi Shakkar (Pure Chemical-Free Brown Sugar)",
    tagline: "No Bleach • In-House Clarified • Pure Sugarcane",
    shortDescription: "Authentic shakkar prepared in-house from freshly crushed raw sugarcane juice. 100% chemical and sulphur free.",
    fullDescription: "Made in-house using traditional evaporators. We never use chemical clarifiers, hydrosulphite, or artificial coloring. Naturally rich in iron, calcium, and minerals with that nostalgic flavor for chai, lassi, and desserts.",
    badge: "Chemical-Free",
    badgeType: "emerald",
    rating: 4.9,
    reviewsCount: 164,
    image: "https://images.unsplash.com/photo-1610348725531-843dff563e2c?auto=format&fit=crop&w=900&q=80",
    inStock: true,
    variants: [
      { weight: "1 Kilogram (1 KG)", isDefault: true },
      { weight: "2 Kilograms (2 KG)", isDefault: false },
      { weight: "5 KG Family Pack", isDefault: false },
    ],
    benefits: [
      "Zero chemical bleach, sulfur or bone char",
      "Retains natural molasses, potassium, iron & minerals",
      "Irresistible earthy aroma for traditional Pakistani chai & desserts"
    ],
    purityGuarantee: "Made purely from seasonal sugarcane juice.",
  },
  {
    id: "peshawari-masala-dryfruit-gur",
    category: "sweeteners",
    name: "Peshawari Dry Fruit Masala Gur (Jaggery)",
    tagline: "Loaded with Badam, Akhrot, Saunf & Sonth (Dry Ginger)",
    shortDescription: "Handmade in-house jaggery infused with roasted almonds, walnuts, fennel seeds, and winter spices. Great after-meal digestive.",
    fullDescription: "A royal delicacy! Fresh golden jaggery melted and mixed generously in-house with crushed almonds, walnuts, aromatic fennel seeds, dry ginger (sonth), and cardamom. Known to soothe the throat and aid digestion.",
    badge: "Winter Special",
    badgeType: "gold",
    rating: 5.0,
    reviewsCount: 131,
    image: "https://images.unsplash.com/photo-1599785209707-a456fc1337bb?auto=format&fit=crop&w=900&q=80",
    inStock: true,
    variants: [
      { weight: "500 Grams Pack", isDefault: false },
      { weight: "1 Kilogram (1 KG)", isDefault: true },
      { weight: "2 Kilograms (2 KG)", isDefault: false },
    ],
    benefits: [
      "Loaded with crunchy premium dry fruits in every bite",
      "Traditional recipe for digestive wellness",
      "Relieves seasonal cough and clears lungs naturally"
    ],
    purityGuarantee: "100% natural jaggery base without synthetic glucose or dyes.",
  },
  {
    id: "royal-quetta-dry-fruits-mix",
    category: "dryfruits",
    name: "Royal Quetta Dry Fruits Mix (Grade-A Luxury Selection)",
    tagline: "Kaghzi Almonds, Walnuts, Pistachios, Cashews & Roasted Chilgoza",
    shortDescription: "Hand-sorted export-grade nuts. Crispy, fresh, unsalted, and hand-packed in-house for maximum vitality.",
    fullDescription: "A hand-curated blend of premium dry fruits: Thin-shelled Kaghzi Badam, buttery Walnut halves, Pistachios, creamy whole Cashews, jumbo Sundarkhani Raisins, and seasonal Chilgoza nuts. Vacuum packed in-house for supreme crunch.",
    badge: "Export Quality",
    badgeType: "gold",
    rating: 5.0,
    reviewsCount: 176,
    image: "https://images.unsplash.com/photo-1536591375315-1b8e7626ef7a?auto=format&fit=crop&w=900&q=80",
    inStock: true,
    variants: [
      { weight: "500 Grams Pack", isDefault: false },
      { weight: "1 Kilogram (1 KG)", isDefault: true },
    ],
    benefits: [
      "Fresh current-season crop, zero bitter or stale nuts",
      "High in healthy omega fats, protein, and dietary fiber",
      "Cleaned, stone-free, and sealed in resealable freshness pouches"
    ],
    purityGuarantee: "100% fresh guaranteed with zero artificial polish or preservatives.",
  },
  {
    id: "traditional-desi-ghee-panjeeri",
    category: "dryfruits",
    name: "Authentic Desi Ghee Panjeeri (Loaded with Gond & Nuts)",
    tagline: "Slow-Roasted In-House in Pure Desi Ghee • Gond, Makhana & 10+ Dry Fruits",
    shortDescription: "In-house prepared traditional Punjabi superfood for winter stamina, joint relief, backache, and postpartum recovery.",
    fullDescription: "Our Panjeeri is slowly roasted in-house to perfection in our own Pure Buffalo Desi Ghee. Enriched with edible gum (gond), puffed lotus seeds (makhana), kamarkas, char maghaz, whole wheat, and a hefty portion of crushed almonds, walnuts, and pistachios.",
    badge: "In-House Recipe",
    badgeType: "emerald",
    rating: 4.9,
    reviewsCount: 153,
    image: "https://images.unsplash.com/photo-1546548970-71785318a17b?auto=format&fit=crop&w=900&q=80",
    inStock: true,
    variants: [
      { weight: "500 Grams Box", isDefault: false },
      { weight: "1 Kilogram (1 KG)", isDefault: true },
      { weight: "2 Kilograms (2 KG)", isDefault: false },
    ],
    benefits: [
      "Made in-house exclusively with 100% pure Desi Ghee",
      "Proven traditional recipe for mothers, athletes & seniors",
      "Provides natural warmth, energy, and strengthens bones"
    ],
    purityGuarantee: "Freshly made in small batches with zero commercial oils or vanaspati.",
  },
  {
    id: "himalayan-pure-gold-salajeet",
    category: "herbs",
    name: "Pure Himalayan Gold Grade Shilajit (Salajeet)",
    tagline: "Sun-Dried Rock Resin • 70%+ Fulvic Acid • Lab Certified",
    shortDescription: "100% authentic purified black gold resin sourced from Himalayan peaks and refined in-house with spring water.",
    fullDescription: "Authentic, raw, water-purified Salajeet resin extracted from Karakoram range crevices. Refined in-house through sun-drying, it contains over 84 ionic trace minerals and 70%+ fulvic acid. Dissolves cleanly in warm water or tea.",
    badge: "100% Authentic",
    badgeType: "gold",
    rating: 5.0,
    reviewsCount: 205,
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=900&q=80",
    inStock: true,
    variants: [
      { weight: "20 Grams Jar", isDefault: true },
      { weight: "50 Grams Jar", isDefault: false },
    ],
    benefits: [
      "Purified in-house through traditional spring water filtration",
      "Rich in natural fulvic acid and 84+ bioactive trace minerals",
      "Enhances natural energy, physical endurance & mental focus",
      "Tested for heavy metal safety & purity"
    ],
    purityGuarantee: "Passes burn, solubility and gold standard authenticity tests.",
  },
];

export const TRUST_PILLARS = [
  {
    id: "pure",
    title: "100% Pure & In-House Prepared",
    description: "Every product is prepared by us in-house with 100% raw purity, free from palm oil, chemicals, and adulteration.",
    icon: "ShieldCheck",
  },
  {
    id: "fresh",
    title: "Fresh & Quality Products",
    description: "Prepared and packed in hygienic, small artisanal batches to maintain aroma, taste, and high nutrition.",
    icon: "Sparkles",
  },
  {
    id: "taste",
    title: "Desi Traditional Taste",
    description: "Real bilona churning and raw honey that revives genuine traditional flavors.",
    icon: "HeartHandshake",
  },
  {
    id: "whatsapp",
    title: "WhatsApp Easy Ordering",
    description: "No complicated checkouts or signups. Simply tap and get price rates directly on WhatsApp.",
    icon: "MessageCircle",
  },
  {
    id: "delivery",
    title: "Express Delivery in Pakistan",
    description: "Fast doorstep courier dispatch to Karachi, Lahore, Islamabad, Peshawar, Quetta, and all cities.",
    icon: "Truck",
  },
];

export const WHY_CHOOSE_US = [
  {
    id: "w1",
    title: "Authentic Desi Products",
    description: "We preserve traditional recipes and in-house preparation methods without commercial shortcuts.",
    icon: "Award",
  },
  {
    id: "w2",
    title: "Quality You Can Trust",
    description: "We personally prepare and inspect every batch we offer. Zero synthetic additives, zero artificial dyes, 100% genuine.",
    icon: "CheckCircle2",
  },
  {
    id: "w3",
    title: "Carefully Selected Ingredients",
    description: "From Sidr forests to dairy farms and orchards, we pick only top-tier raw ingredients for our in-house products.",
    icon: "SearchCheck",
  },
  {
    id: "w4",
    title: "Freshness & Natural Purity",
    description: "Airtight luxury glass packaging ensures enzymes and natural aromas remain intact.",
    icon: "Leaf",
  },
  {
    id: "w5",
    title: "Instant WhatsApp Support",
    description: "Direct human customer care. Have a question about rates or usage? Chat with us anytime.",
    icon: "Headphones",
  },
  {
    id: "w6",
    title: "Happy Customers",
    description: "Satisfied families across Pakistan trust Javed Organic Store for their daily healthy living.",
    icon: "ThumbsUp",
  },
];

export const ORDER_STEPS = [
  {
    step: "01",
    title: "Choose Your Product",
    desc: "Browse our premium range of Desi Ghee, Pure Honey, Oils, and Shakkar. Select your preferred weight or size.",
    icon: "ShoppingBag",
  },
  {
    step: "02",
    title: "Click Order on WhatsApp",
    desc: "Tap the WhatsApp button on any product card. A pre-filled inquiry message with your selected weight is created.",
    icon: "Send",
  },
  {
    step: "03",
    title: "Get Price & Confirm Order",
    desc: "Our team shares the best price rate and confirms your delivery address immediately for doorstep dispatch!",
    icon: "CheckCircle",
  },
];

export const TESTIMONIALS = [
  {
    id: "t1",
    name: "Dr. Tariq Mahmood",
    city: "Islamabad",
    product: "Pure Buffalo Desi Ghee & Sidr Honey",
    rating: 5,
    date: "February 2026",
    review: "The Danedaar texture and aroma of Javed Organic Store's Desi Ghee is unmatched. The Sidr Honey is genuine and thick. Ordering on WhatsApp was seamless!",
  },
  {
    id: "t2",
    name: "Mrs. Farhana Asif",
    city: "Lahore (DHA)",
    product: "Desi Panjeeri & Sahiwal Cow Ghee",
    rating: 5,
    date: "January 2026",
    review: "Ordered Panjeeri and Cow Ghee for my postpartum recovery. The taste was heavenly, genuinely loaded with almonds and gond. Packing was pristine in thick bubble wrap.",
  },
  {
    id: "t3",
    name: "Engr. Bilal Khan",
    city: "Peshawar",
    product: "Himalayan Salajeet & Mustard Oil",
    rating: 5,
    date: "February 2026",
    review: "Salajeet resin is 100% original, easily dissolves in warm green tea. And the mustard oil has that real traditional sharpness for winter saag. Highly recommended!",
  },
  {
    id: "t4",
    name: "Zainab Riaz",
    city: "Karachi (Clifton)",
    product: "Desi Shakkar & Wild Beri Honey",
    rating: 5,
    date: "March 2026",
    review: "We replaced white sugar with Javed Organic Shakkar for our morning chai. It has transformed our family's health. WhatsApp customer service was very polite and helpful.",
  },
];

export const FAQS = [
  {
    q: "How do I place an order?",
    a: "Simply click on any product's 'Order on WhatsApp' button. WhatsApp will open with your selected product and quantity already written. Just tap send and share your delivery address to get the latest rate!",
  },
  {
    q: "Do you have a physical store to visit?",
    a: "We operate exclusively as a 100% online store to keep our prices fair and our products freshly prepared in-house. We deliver with fast courier cash-on-delivery (COD) to your doorstep nationwide.",
  },
  {
    q: "What payment methods are available?",
    a: "We offer Cash on Delivery (COD) across Pakistan as well as direct Bank Transfer / JazzCash / EasyPaisa if you prefer advance payments.",
  },
  {
    q: "Is your Desi Ghee really 100% pure?",
    a: "Yes! Our ghee is prepared in-house from milk obtained from livestock. We never use palm oil, Dalda, artificial flavors, or preservatives.",
  },
];
