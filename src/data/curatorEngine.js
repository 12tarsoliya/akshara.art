/**
 * AI Art Curator Matching and Response Engine
 * Runs client-side to parse user preferences and recommend matching paintings.
 */

const KEYWORDS = {
  blue: ['blue', 'neela', 'sky', 'ocean', 'sea', 'deep blue', 'indigo'],
  gold: ['gold', 'golden', 'sunhari', 'yellow', 'peela', 'metallic'],
  red: ['red', 'crimson', 'orange', 'laal', 'warm'],
  teal: ['teal', 'turquoise', 'aquamarine', 'green', 'aqua'],
  pastel: ['pastel', 'pink', 'light', 'white', 'soft', 'gentle'],
  calm: ['calm', 'peace', 'peaceful', 'serene', 'quiet', 'relax', 'sooth', 'dhyan', 'sukoon', 'shaanti', 'gentle', 'soft'],
  vibrant: ['vibrant', 'energetic', 'passion', 'bold', 'chaos', 'chaotic', 'urja', 'junoon', 'uthal-puthal', 'exciting', 'active'],
  rebirth: ['rebirth', 'hope', 'change', 'new beginning', 'transform', 'badlav', 'shuruat', 'healing', 'growth'],
  bedroom: ['bedroom', 'bed', 'sleep', 'personal space', 'nook'],
  living: ['living', 'hall', 'lounge', 'sitting room', 'family room', 'salon', 'main room'],
  office: ['office', 'study', 'work', 'desk', 'workspace', 'studio'],
  dining: ['dining', 'kitchen', 'nursery'],
  bathroom: ['bathroom', 'bath', 'washroom', 'spa'],
  abstract: ['abstract', 'contemporary', 'modern'],
  fluid: ['fluid', 'resin', 'pour', 'acrylic pour'],
  acrylic: ['acrylic'],
  oil: ['oil'],
  mixed: ['mixed media', 'mixed']
};

// Helper to parse numbers and check for budget
const parseBudget = (text) => {
  const normalized = text.toLowerCase();
  
  // Look for k notation (e.g. 10k, 15k)
  const kMatch = normalized.match(/(\d+(?:\.\d+)?)\s*k/);
  if (kMatch) {
    return parseFloat(kMatch[1]) * 1000;
  }
  
  // Look for standard numbers above 1000 (prices are in thousands)
  const numMatches = normalized.match(/\b\d{4,6}\b/g);
  if (numMatches) {
    // Return the last or most prominent number matching price range
    return parseInt(numMatches[numMatches.length - 1], 10);
  }
  
  // General budget words
  if (normalized.includes('budget') || normalized.includes('affordable') || normalized.includes('cheap') || normalized.includes('low cost')) {
    return 10000; // Low budget threshold
  }
  if (normalized.includes('premium') || normalized.includes('investment') || normalized.includes('expensive') || normalized.includes('luxury')) {
    return 20000; // High budget flag
  }
  
  return null;
};

// Custom reasoning generator based on matched attributes
const generateReason = (painting, matchedCriteria, userBudget) => {
  const reasons = [];
  
  if (userBudget && painting.price <= userBudget) {
    reasons.push(`It fits perfectly within your budget at ₹${painting.price.toLocaleString('en-IN')}`);
  } else if (userBudget && painting.price > userBudget) {
    reasons.push(`Although it is slightly above your budget at ₹${painting.price.toLocaleString('en-IN')}, its artistic value makes it a worthy consideration`);
  }

  if (matchedCriteria.has('color')) {
    reasons.push(`its color palette directly matches the tones you requested`);
  }
  
  if (matchedCriteria.has('mood')) {
    if (painting.id === 1) reasons.push("it carries a beautiful message of hope, healing, and new beginnings");
    if (painting.id === 2) reasons.push("its blend of gold and deep blue represents peaceful self-reflection and tranquility");
    if (painting.id === 3) reasons.push("it uses gentle, airy pastel colors that instantly induce a sense of calm and lightness");
    if (painting.id === 4) reasons.push("its bold, fiery crimson and orange strokes radiate vibrant passion and energy");
    if (painting.id === 5) reasons.push("its resin texture mimics ocean waves, bringing a deep, refreshing sense of calm");
  }

  if (matchedCriteria.has('room')) {
    if (painting.id === 1) reasons.push("it serves as a stunning conversation starter in your living space");
    if (painting.id === 2) reasons.push("it is highly suited for a quiet bedroom or a thoughtful study/office environment");
    if (painting.id === 3) reasons.push("its airy aesthetic blends beautifully into dining spaces or nurseries");
    if (painting.id === 4) reasons.push("it adds a powerful focal point to office walls, entryways, or main halls");
    if (painting.id === 5) reasons.push("its water-like resin finish makes it perfect for a bathroom, spa area, or personal sanctuary");
  }

  if (reasons.length === 0) {
    reasons.push(`its stunning ${painting.medium} composition will bring immense character to your space`);
  }

  // Combine reasons elegantly
  if (reasons.length === 1) {
    return reasons[0] + ".";
  } else if (reasons.length === 2) {
    return `${reasons[0]}, and ${reasons[1]}.`;
  } else {
    const last = reasons.pop();
    return `${reasons.join(', ')}, and ${last}.`;
  }
};

export const getCuratorResponse = (userInput, availablePaintings = []) => {
  const text = userInput.toLowerCase();
  const budget = parseBudget(userInput);
  const detectedKeys = [];
  
  // Detect matching keywords
  const matchedFilters = {
    colors: [],
    moods: [],
    rooms: [],
    styles: []
  };

  // Analyze query
  for (const [key, words] of Object.entries(KEYWORDS)) {
    const matches = words.some(word => text.includes(word));
    if (matches) {
      detectedKeys.push(key);
      if (['blue', 'gold', 'red', 'teal', 'pastel'].includes(key)) {
        matchedFilters.colors.push(key);
      } else if (['calm', 'vibrant', 'rebirth'].includes(key)) {
        matchedFilters.moods.push(key);
      } else if (['bedroom', 'living', 'office', 'dining', 'bathroom'].includes(key)) {
        matchedFilters.rooms.push(key);
      } else if (['abstract', 'fluid', 'acrylic', 'oil', 'mixed'].includes(key)) {
        matchedFilters.styles.push(key);
      }
    }
  }

  // Score each painting
  const scoredPaintings = availablePaintings.map(painting => {
    let score = 0;
    const matchedCriteria = new Set();
    const pTitle = painting.title.toLowerCase();
    const pDesc = painting.description ? painting.description.toLowerCase() : '';
    const pMed = painting.medium ? painting.medium.toLowerCase() : '';

    // Color match scoring
    matchedFilters.colors.forEach(color => {
      let matched = false;
      if (color === 'blue' && (pDesc.includes('blue') || pDesc.includes('neela') || pTitle.includes('solitude') || pTitle.includes('cradle'))) {
        score += 3;
        matched = true;
      }
      if (color === 'gold' && (pDesc.includes('gold') || pDesc.includes('sunhari') || pDesc.includes('glitter'))) {
        score += 3;
        matched = true;
      }
      if (color === 'red' && (pDesc.includes('red') || pDesc.includes('crimson') || pDesc.includes('orange') || pDesc.includes('laal'))) {
        score += 3;
        matched = true;
      }
      if (color === 'teal' && (pDesc.includes('teal') || pDesc.includes('turquoise') || pDesc.includes('samundar'))) {
        score += 3;
        matched = true;
      }
      if (color === 'pastel' && (pDesc.includes('pastel') || pDesc.includes('light') || pDesc.includes('white') || pDesc.includes('pink'))) {
        score += 3;
        matched = true;
      }
      if (matched) matchedCriteria.add('color');
    });

    // Mood match scoring
    matchedFilters.moods.forEach(mood => {
      let matched = false;
      if (mood === 'calm') {
        if (pDesc.includes('shaanti') || pDesc.includes('sukoon') || pDesc.includes('calm') || pDesc.includes('peace') || pDesc.includes('dhyan') || painting.id !== 4) {
          score += 4;
          matched = true;
        }
      }
      if (mood === 'vibrant' && (pDesc.includes('urja') || pDesc.includes('vibrant') || pDesc.includes('chaos') || pDesc.includes('passion') || painting.id === 4)) {
        score += 4;
        matched = true;
      }
      if (mood === 'rebirth' && (pDesc.includes('rebirth') || pDesc.includes('badlav') || pDesc.includes('shuruat') || painting.id === 1)) {
        score += 5;
        matched = true;
      }
      if (matched) matchedCriteria.add('mood');
    });

    // Room match scoring
    matchedFilters.rooms.forEach(room => {
      let matched = false;
      if (room === 'bedroom') {
        if (painting.id === 2 || painting.id === 5 || painting.id === 3 || painting.id === 1) {
          score += 3;
          matched = true;
        }
      }
      if (room === 'living') {
        if (painting.id === 1 || painting.id === 3 || painting.id === 4 || painting.id === 5) {
          score += 3;
          matched = true;
        }
      }
      if (room === 'office') {
        if (painting.id === 2 || painting.id === 4) {
          score += 3;
          matched = true;
        }
      }
      if (room === 'dining' && painting.id === 3) {
        score += 3;
        matched = true;
      }
      if (room === 'bathroom' && painting.id === 5) {
        score += 5; // Perfect match
        matched = true;
      }
      if (matched) matchedCriteria.add('room');
    });

    // Style match scoring
    matchedFilters.styles.forEach(style => {
      let matched = false;
      if (style === 'abstract' && (pMed.includes('abstract') || pMed.includes('canvas') || painting.id === 1 || painting.id === 2 || painting.id === 4)) {
        score += 2;
        matched = true;
      }
      if (style === 'fluid' && (pMed.includes('fluid') || pMed.includes('resin') || painting.id === 3 || painting.id === 5)) {
        score += 3;
        matched = true;
      }
      if (style === 'oil' && pMed.includes('oil')) {
        score += 3;
        matched = true;
      }
      if (style === 'acrylic' && pMed.includes('acrylic')) {
        score += 2;
        matched = true;
      }
      if (style === 'mixed' && pMed.includes('mixed')) {
        score += 3;
        matched = true;
      }
      if (matched) matchedCriteria.add('style');
    });

    // Budget scoring:
    // If budget specified and painting is within budget, boost score!
    if (budget) {
      if (painting.price <= budget) {
        score += 4;
      } else {
        // If painting is over budget, penalize score but don't drop to zero completely,
        // unless it's way over budget (>1.5x budget)
        if (painting.price > budget * 1.5) {
          score -= 6;
        } else {
          score -= 2; // minor penalty
        }
      }
    }

    return {
      painting,
      score,
      matchedCriteria
    };
  });

  // Sort by score desc
  const sorted = scoredPaintings
    .filter(item => item.score > 0 || !detectedKeys.length) // if no keywords were detected, keep all
    .sort((a, b) => b.score - a.score);

  // Recommendations: take top 2 (or 3 if closely matched)
  const recommendations = sorted.slice(0, 2).map(item => ({
    ...item.painting,
    reason: generateReason(item.painting, item.matchedCriteria, budget)
  }));

  // Build the reply text
  let reply = "";
  
  if (recommendations.length > 0) {
    if (detectedKeys.length > 0 || budget) {
      const criteriaList = [];
      if (budget) criteriaList.push(`under ₹${budget.toLocaleString('en-IN')}`);
      if (matchedFilters.moods.length) criteriaList.push(`${matchedFilters.moods.join(' & ')} mood`);
      if (matchedFilters.colors.length) criteriaList.push(`${matchedFilters.colors.join(', ')} colors`);
      if (matchedFilters.rooms.length) criteriaList.push(`for the ${matchedFilters.rooms.join('/')}`);
      
      reply = `Thank you for sharing your thoughts! Based on your preference for an artwork that is ${criteriaList.join(', ')}, I have curated a selection from Akshara's collection that speaks directly to that vision.\n\nHere are my tailored recommendations for you:`;
    } else {
      reply = "Welcome! I am Akshara Tarsoliya's AI Art Curator. I am here to help you find the perfect painting that aligns with your space, mood, and aesthetic values. Tell me a bit about what you are looking for—such as the colors you love, the room you are designing, your budget, or the emotion you want the art to evoke.\n\nIn the meantime, here are a few masterpiece suggestions that embody the essence of the collection:";
    }
  } else {
    // Fallback if score filtering left nothing (e.g. extremely low budget)
    const affordablePaintings = availablePaintings.sort((a, b) => a.price - b.price).slice(0, 2);
    reply = `I appreciate your request. While we don't have a painting that exactly matches all those specific criteria in the current collection, art is often about unexpected connections. \n\nI highly recommend exploring these beautiful pieces, which represent some of our most accessible and matching options:`;
    
    return {
      reply,
      recommendedPaintings: affordablePaintings.map(p => ({
        ...p,
        reason: `Its beautiful expression will add elegance and depth to any collection at ₹${p.price.toLocaleString('en-IN')}.`
      }))
    };
  }

  return {
    reply,
    recommendedPaintings: recommendations
  };
};
