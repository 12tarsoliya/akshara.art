export const initialPaintings = [
  {
    id: 1,
    title: "Rebirth",
    artist: "Akshara Tarsoliya",
    price: 10000,
    medium: "Acrylic",
    dimensions: "2.5/3 ft",
    description: "Ismein ek purana shell toot kar ek naye aur sundar shell ko janam de raha hai. Ye badlav aur nayi shuruat ka prateek hai.",
    image: "./rebirth.jpg"
  },
  {
    id: 2,
    title: "Golden Solitude",
    artist: "Akshara Tarsoliya",
    price: 18000,
    medium: "Oil on Canvas",
    dimensions: "3/3 ft",
    description: "Ek sunhari dhoop ki tarah chamakta hua akelapan. Ye painting shaanti aur aatam-manthan (self-reflection) ko darshati hai, jismein gold aur deep blue ka prayog kiya gaya hai.",
    image: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 3,
    title: "Ethereal Winds",
    artist: "Akshara Tarsoliya",
    price: 8500,
    medium: "Acrylic on Canvas",
    dimensions: "2/2.5 ft",
    description: "Hawa ke jhonke jo man ki duvidhao ko door le jaate hain. Ismein light pastel colors aur fluid strokes ka istemal kiya gaya hai jo shaanti pradan karte hain.",
    image: "https://images.unsplash.com/photo-1549887534-1541e9326642?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 4,
    title: "Vibrant Chaos",
    artist: "Akshara Tarsoliya",
    price: 15000,
    medium: "Mixed Media",
    dimensions: "3/4 ft",
    description: "Jeevan ki uthal-puthal aur usmein chhipi khushi. Crimson red, orange, aur black ke bold strokes jo urja aur junoon (passion) ko darshate hain aur kamre ko sjeev banate hain.",
    image: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 5,
    title: "Ocean's Cradle",
    artist: "Akshara Tarsoliya",
    price: 9500,
    medium: "Resin Art",
    dimensions: "2/2 ft",
    description: "Samundar ki lehron jaisa sukoon. Teal, turquoise aur gold glitter ka sundar mel jo dhyan aur chintan ke liye prerit karta hai. Bathrooms ya personal space ke liye adbhut hai.",
    image: "https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?auto=format&fit=crop&w=800&q=80"
  }
];

export const getPaintings = () => {
  const saved = localStorage.getItem('akshara_paintings_v6'); // Updated key to v6
  if (saved) {
    return JSON.parse(saved);
  }
  localStorage.setItem('akshara_paintings_v6', JSON.stringify(initialPaintings));
  return initialPaintings;
};

export const addPainting = (painting) => {
  const currentPaintings = getPaintings();
  const newPainting = {
    ...painting,
    id: Date.now(),
    artist: "Akshara Tarsoliya",
    price: parseFloat(painting.price)
  };
  const updatedPaintings = [newPainting, ...currentPaintings];
  localStorage.setItem('akshara_paintings_v6', JSON.stringify(updatedPaintings));
  return updatedPaintings;
};
