export const getRandomImage = (images: string[]): string => {
  if (images.length === 0) {
    return "/images/tour.svg";
  }
  const randomIndex = Math.floor(Math.random() * images.length);
  return images[randomIndex];
};
