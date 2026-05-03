export const initialPaintings = [];

export const getPaintings = () => {
  const saved = localStorage.getItem('akshara_paintings_v3'); // Update key to clear cache
  if (saved) {
    return JSON.parse(saved);
  }
  localStorage.setItem('akshara_paintings_v3', JSON.stringify(initialPaintings));
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
  localStorage.setItem('akshara_paintings_v3', JSON.stringify(updatedPaintings));
  return updatedPaintings;
};
