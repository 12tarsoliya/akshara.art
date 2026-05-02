export const initialPaintings = [
  {
    id: 1,
    title: "Ethereal Bloom",
    artist: "Akshara",
    price: 450,
    dimensions: "24 x 36 inches",
    medium: "Oil on Canvas",
    image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "A mesmerizing exploration of color and form, capturing the essence of a blooming flower at twilight."
  },
  {
    id: 2,
    title: "Midnight Serenade",
    artist: "Akshara",
    price: 600,
    dimensions: "30 x 40 inches",
    medium: "Acrylic on Canvas",
    image: "https://images.unsplash.com/photo-1579762715118-a6f1d4b934f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Deep, moody blues and vibrant gold accents create a rhythmic composition inspired by the night sky."
  },
  {
    id: 3,
    title: "Golden Horizon",
    artist: "Akshara",
    price: 350,
    dimensions: "20 x 20 inches",
    medium: "Mixed Media",
    image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Textured layers build up to a glowing horizon, representing hope and new beginnings."
  },
  {
    id: 4,
    title: "Abstract Rhythm",
    artist: "Akshara",
    price: 800,
    dimensions: "40 x 40 inches",
    medium: "Oil on Canvas",
    image: "https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Bold strokes and dynamic color palettes come together in this energetic piece."
  },
  {
    id: 5,
    title: "Whispering Woods",
    artist: "Akshara",
    price: 500,
    dimensions: "24 x 24 inches",
    medium: "Watercolor",
    image: "https://images.unsplash.com/photo-1581337204873-ef36aa186caa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "A delicate and subtle study of a forest bathed in morning mist."
  },
  {
    id: 6,
    title: "Urban Echo",
    artist: "Akshara",
    price: 550,
    dimensions: "36 x 24 inches",
    medium: "Acrylic on Board",
    image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Geometric shapes and contrasting colors reflect the vibrancy of city life."
  }
];

export const getPaintings = () => {
  const saved = localStorage.getItem('akshara_paintings');
  if (saved) {
    return JSON.parse(saved);
  }
  localStorage.setItem('akshara_paintings', JSON.stringify(initialPaintings));
  return initialPaintings;
};

export const addPainting = (painting) => {
  const currentPaintings = getPaintings();
  const newPainting = {
    ...painting,
    id: Date.now(),
    artist: "Akshara",
    price: parseFloat(painting.price)
  };
  const updatedPaintings = [newPainting, ...currentPaintings];
  localStorage.setItem('akshara_paintings', JSON.stringify(updatedPaintings));
  return updatedPaintings;
};
