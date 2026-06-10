/**
 * AI Artist Assistant Engine
 * Automatically generates professional metadata (Title, Description, Tags, SEO, Instagram Captions, Price)
 * based on basic painting details entered by the artist.
 */

// Lists of aesthetic terms to generate creative art titles
const TITLE_PREFIXES = [
  "Whispers of", "Echoes of", "Shadows in", "Reflections of", "Symphony of", 
  "The Silent", "Chords of", "Dance of", "Cradle of", "Glimpse of", 
  "Journey through", "Path to", "Essence of", "Hues of", "Visions of"
];

const TITLE_NOUNS = [
  "Solitude", "Serenity", "Chaos", "Rebirth", "Twilight", "Eternity", 
  "Awakening", "Dreams", "Illusion", "Wind", "Ocean", "Crimson", 
  "Gold", "Silence", "Melody", "Infinity", "Horizon", "Sanctuary",
  "Nostalgia", "Hope", "Surrender", "Grace", "Tranquility", "Passage"
];

// Helper to translate some common keywords to Hindi for bilingual descriptions
const HINDI_TRANSLATIONS = {
  tree: "ped",
  flower: "phool",
  sunset: "doobta suraj",
  sunrise: "ugta suraj",
  sun: "suraj",
  moon: "chaand",
  night: "raat",
  ocean: "samundar",
  sea: "sagar",
  river: "nadi",
  lake: "jheel",
  water: "paani",
  rain: "baarish",
  storm: "toofan",
  cloud: "badal",
  sky: "aasmaan",
  wind: "hawa",
  fire: "aag",
  mountain: "pahad",
  boat: "naav",
  bird: "chidiya",
  love: "pyaar",
  peace: "shanti",
  calm: "sukoon",
  joy: "khushi",
  light: "roshni",
  gold: "sunhara",
  blue: "neela",
  red: "laal",
  green: "hara",
  yellow: "peela",
  white: "safed",
  black: "kaala",
  dark: "andhera",
  lonely: "akela",
  beauty: "sundarta"
};

// Pricing algorithm based on dimensions and medium
const calculateSuggestedPrice = (dimensionsStr, mediumStr) => {
  let width = 24; // default
  let height = 24; // default
  let isFeet = false;

  const normalized = dimensionsStr.toLowerCase();
  
  if (normalized.includes('ft') || normalized.includes('foot') || normalized.includes('feet')) {
    isFeet = true;
  }

  // Extract two numbers from dimensions (e.g. "24 x 36" or "2.5/3")
  const numbers = normalized.match(/(\d+(?:\.\d+)?)/g);
  if (numbers && numbers.length >= 2) {
    width = parseFloat(numbers[0]);
    height = parseFloat(numbers[1]);
  } else if (numbers && numbers.length === 1) {
    width = parseFloat(numbers[0]);
    height = width;
  }

  // Convert feet to inches
  let widthInches = isFeet ? width * 12 : width;
  let heightInches = isFeet ? height * 12 : height;
  
  const area = widthInches * heightInches;

  // Medium complexity multipliers
  let basePrice = 4000;
  let multiplier = 8; // rupees per square inch

  const medium = mediumStr.toLowerCase();
  if (medium.includes('oil')) {
    basePrice = 6000;
    multiplier = 14;
  } else if (medium.includes('acrylic')) {
    basePrice = 4000;
    multiplier = 9;
  } else if (medium.includes('resin')) {
    basePrice = 5000;
    multiplier = 12;
  } else if (medium.includes('mixed') || medium.includes('media')) {
    basePrice = 4500;
    multiplier = 10;
  } else if (medium.includes('watercolor') || medium.includes('paper')) {
    basePrice = 3000;
    multiplier = 6;
  }

  const rawPrice = basePrice + (area * multiplier);
  
  // Round to nearest ₹500 or ₹1000
  let finalPrice = Math.round(rawPrice / 500) * 500;
  
  // Hard limits
  if (finalPrice < 3000) finalPrice = 3000;
  if (finalPrice > 50000) finalPrice = 50000;

  return finalPrice;
};

// Generates an evocative artwork description
const generateDescription = (concept, title, medium, dimensions) => {
  const words = concept.toLowerCase().split(/[\s,]+/);
  
  // Pick out Hindi words if matched
  const hindiMatches = [];
  words.forEach(w => {
    // Check direct matching or partial matching
    for (const [eng, hin] of Object.entries(HINDI_TRANSLATIONS)) {
      if (w.includes(eng) && !hindiMatches.includes(hin)) {
        hindiMatches.push(hin);
      }
    }
  });

  // Construct a Hindi poetic line
  let hindiLine = "Yeh chitra man ke gahre bhaavo aur shanti ko darshata hai.";
  if (hindiMatches.length > 0) {
    if (hindiMatches.length === 1) {
      hindiLine = `Ismein ek sundar ${hindiMatches[0]} ka chitran hai, jo jeevan ke badlav aur uski gehrai ko darshata hai.`;
    } else if (hindiMatches.length === 2) {
      hindiLine = `Is chitra mein ${hindiMatches[0]} aur ${hindiMatches[1]} ka behad khoobsurat mel hai, jo man mein sukoon aur aatam-manthan jagata hai.`;
    } else {
      hindiLine = `Ismein ${hindiMatches.slice(0, -1).join(', ')}, aur ${hindiMatches[hindiMatches.length - 1]} ke madhyam se jeevan ki sundarta aur shanti ko ukerne ka prayas kiya gaya hai.`;
    }
  }

  // Construct English context
  const englishLine = `Created on a ${dimensions} canvas using premium ${medium}, this piece utilizes fluid composition and expressive brushstrokes to create a lasting emotional connection. The artwork serves as an exploration of "${concept}", inviting the observer to pause and reflect.`;

  return `${hindiLine}\n\n${englishLine}`;
};

// Main generator function
export const generateArtworkMetadata = (formData) => {
  const { concept, medium, dimensions } = formData;
  
  if (!concept || !medium || !dimensions) {
    throw new Error("Concept, Medium, and Dimensions are required to generate metadata.");
  }

  // 1. Generate Title
  const cleanConcept = concept.trim().replace(/[^\w\s]/gi, '');
  const conceptWords = cleanConcept.split(/\s+/).filter(w => w.length > 3);
  let title = "";
  if (conceptWords.length > 0) {
    // Use one word from the concept combined with a noun or prefix
    const randomWord = conceptWords[Math.floor(Math.random() * conceptWords.length)];
    const capitalized = randomWord.charAt(0).toUpperCase() + randomWord.slice(1).toLowerCase();
    
    if (Math.random() > 0.5) {
      title = `${TITLE_PREFIXES[Math.floor(Math.random() * TITLE_PREFIXES.length)]} ${capitalized}`;
    } else {
      title = `${capitalized} ${TITLE_NOUNS[Math.floor(Math.random() * TITLE_NOUNS.length)]}`;
    }
  } else {
    // Generate a purely creative title
    const prefix = TITLE_PREFIXES[Math.floor(Math.random() * TITLE_PREFIXES.length)];
    const noun = TITLE_NOUNS[Math.floor(Math.random() * TITLE_NOUNS.length)];
    title = `${prefix} ${noun}`;
  }

  // 2. Suggested Price
  const price = calculateSuggestedPrice(dimensions, medium);

  // 3. Description
  const description = generateDescription(concept, title, medium, dimensions);

  // 4. Tags
  const defaultTags = ["original", "aksharatarsoliya", "canvas", "wallart", "homegallery"];
  const parsedMedium = medium.toLowerCase().replace(/\s+/g, '');
  const parsedConcept = concept.toLowerCase().split(/[\s,]+/).filter(w => w.length > 3).slice(0, 4);
  const tagsList = [...new Set([parsedMedium, ...parsedConcept, ...defaultTags])];
  const tags = tagsList.join(', ');

  // 5. SEO Keywords
  const seoKeywordsList = [
    `original ${title.toLowerCase()} painting`,
    `buy ${medium.toLowerCase()} online`,
    `contemporary ${concept.toLowerCase()} artwork`,
    `akshara tarsoliya collections`,
    `${medium.toLowerCase()} dimensions ${dimensions}`,
    `acrylic abstract indian artist`
  ];
  const seoKeywords = seoKeywordsList.join(', ');

  // 6. Instagram Caption
  const instagramCaption = `✨ New Acquisition Available ✨\n\nTitle: "${title}"\nMedium: ${medium}\nDimensions: ${dimensions}\nPrice: ₹${price.toLocaleString('en-IN')}\n\n"${description.split('\n\n')[0]}"\n\nThis piece explores the themes of ${concept.toLowerCase()}. Perfect for adding depth and tranquility to your space.\n\nDM for acquisition details or visit our digital gallery.\n\n#art #painting #aksharatarsoliya #contemporaryart #${parsedMedium} #abstractart #wallart #artgallery #gallery #indianartist #homedecor`;

  return {
    title,
    price,
    description,
    tags,
    seoKeywords,
    instagramCaption
  };
};

export const runGalleryManagerWorkflow = (formData) => {
  const { concept, medium, dimensions } = formData;
  const metadata = generateArtworkMetadata(formData);
  
  // 1. Artwork Analysis
  let colors = [
    { name: "Canvas White", hex: "#f8f9fa", percentage: 60 },
    { name: "Accent Ochre", hex: "#c4a47c", percentage: 30 },
    { name: "Charcoal Black", hex: "#1a1a1a", percentage: 10 }
  ];
  let composition = "Balanced abstract structure, emphasizing dynamic flow and negative space.";
  let detectedMood = "Thoughtful & Quiet";

  const normConcept = concept.toLowerCase();
  if (normConcept.includes('blue') || normConcept.includes('ocean') || normConcept.includes('water') || normConcept.includes('lake') || normConcept.includes('sea')) {
    colors = [
      { name: "Deep Indigo", hex: "#1e3a8a", percentage: 50 },
      { name: "Teal Green", hex: "#0d9488", percentage: 35 },
      { name: "Silver Haze", hex: "#cbd5e1", percentage: 15 }
    ];
    composition = "Fluid horizontal waves, drawing the eye across the canvas with oceanic gradients.";
    detectedMood = "Calm, Relaxing & Meditative";
  } else if (normConcept.includes('red') || normConcept.includes('sunset') || normConcept.includes('orange') || normConcept.includes('vibrant') || normConcept.includes('chaos')) {
    colors = [
      { name: "Crimson Red", hex: "#dc2626", percentage: 55 },
      { name: "Amber Orange", hex: "#ea580c", percentage: 30 },
      { name: "Charcoal Black", hex: "#111111", percentage: 15 }
    ];
    composition = "Dynamic vertical strokes representing energetic force and passionate textures.";
    detectedMood = "Energetic, Passionate & Expressive";
  } else if (normConcept.includes('gold') || normConcept.includes('sunhari') || normConcept.includes('yellow')) {
    colors = [
      { name: "Earthy Gold", hex: "#c4a47c", percentage: 50 },
      { name: "Warm Ochre", hex: "#b45309", percentage: 30 },
      { name: "Champagne Cream", hex: "#fef3c7", percentage: 20 }
    ];
    composition = "Radiating center focus with textured gold accents, evoking heat and premium value.";
    detectedMood = "Warm, Luxurious & Optimistic";
  } else if (normConcept.includes('pastel') || normConcept.includes('pink') || normConcept.includes('light')) {
    colors = [
      { name: "Soft Rose", hex: "#fda4af", percentage: 40 },
      { name: "Powder Blue", hex: "#bae6fd", percentage: 35 },
      { name: "Alabaster White", hex: "#fafafa", percentage: 25 }
    ];
    composition = "Delicate ethereal layers blended with soft borders and misty backgrounds.";
    detectedMood = "Dreamy, Serene & Gentle";
  }

  const analysis = {
    colors,
    composition,
    detectedMood,
    contrastLevel: normConcept.includes('dark') || normConcept.includes('night') || normConcept.includes('black') ? "High Contrast" : "Balanced Mid-tones"
  };

  // 2. Marketing Content
  const marketing = {
    targetAudience: `Designers and premium art collectors seeking to create a ${detectedMood.toLowerCase()} statement in residential living rooms or high-end office corridors.`,
    collectorHook: `A rare masterclass in balancing physical texture with visual depth. "${metadata.title}" by Akshara Tarsoliya is not merely decorative; it serves as a visual sanctuary for self-reflection.`,
    newsletterDraft: `Subject: Introducing "${metadata.title}" - A New Journey in ${medium}\n\nDear Art Collector,\n\nWe are thrilled to unveil Akshara Tarsoliya's latest work: "${metadata.title}". Handcrafted with masterfully blended layers of ${medium} on a spacious ${dimensions} canvas, this original creation explores themes of "${concept}". It is currently available for acquisition in the digital gallery. Click below to view the canvas in high definition.\n\nWarm regards,\nThe Akshara Gallery Team`
  };

  // 3. Pricing Math Breakdown
  let width = 24;
  let height = 24;
  let isFeet = false;
  const normalizedDim = dimensions.toLowerCase();
  if (normalizedDim.includes('ft') || normalizedDim.includes('foot') || normalizedDim.includes('feet')) isFeet = true;
  const numbers = normalizedDim.match(/(\d+(?:\.\d+)?)/g);
  if (numbers && numbers.length >= 2) {
    width = parseFloat(numbers[0]);
    height = parseFloat(numbers[1]);
  } else if (numbers && numbers.length === 1) {
    width = parseFloat(numbers[0]);
    height = width;
  }
  let wInches = isFeet ? width * 12 : width;
  let hInches = isFeet ? height * 12 : height;
  const areaSqIn = wInches * hInches;

  let baseFee = 4000;
  let ratePerSqIn = 8;
  const med = medium.toLowerCase();
  if (med.includes('oil')) {
    baseFee = 6000;
    ratePerSqIn = 14;
  } else if (med.includes('acrylic')) {
    baseFee = 4000;
    ratePerSqIn = 9;
  } else if (med.includes('resin')) {
    baseFee = 5000;
    ratePerSqIn = 12;
  } else if (med.includes('mixed')) {
    baseFee = 4500;
    ratePerSqIn = 10;
  }

  const pricingMath = {
    areaSqIn,
    baseFee,
    ratePerSqIn,
    areaCost: areaSqIn * ratePerSqIn,
    totalRaw: baseFee + (areaSqIn * ratePerSqIn),
    finalRounded: metadata.price
  };

  return {
    metadata,
    analysis,
    marketing,
    pricingMath
  };
};
