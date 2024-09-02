import { Ratings } from "@/types/review";

type RatingDescription = {
  [key: number]: string;
};

const ratingDescriptions: RatingDescription = {
  0: "Awful",
  1: "Poor",
  2: "Fair",
  3: "Good",
  4: "Very Good",
  5: "Excellent",
};

export const normalizeRating = (rating: number): number => {
  if (typeof rating !== "number") return 0;
  return Math.max(0, Math.min(rating, 5));
};

export const calculateAverageRating = (
  ratings: Ratings | undefined
): string => {
  if (!ratings) return "0";
  const {
    services,
    location,
    amenities,
    prices,
    food,
    room_comfort_and_quality,
  } = ratings;

  const normalizedRatings = [
    normalizeRating(services),
    normalizeRating(location),
    normalizeRating(amenities),
    normalizeRating(prices),
    normalizeRating(food),
    normalizeRating(room_comfort_and_quality),
  ];

  const totalRatings = normalizedRatings.reduce((acc, curr) => acc + curr, 0);
  const numberOfRatings = normalizedRatings.length;

  const averageRating =
    numberOfRatings > 0 ? totalRatings / numberOfRatings : 0;
  return averageRating.toFixed(1);
};

export const getRatingDescription = (averageRating: number): string => {
  const roundedRating = Math.round(averageRating);
  const normalizedRating = Math.max(0, Math.min(roundedRating, 5));
  return ratingDescriptions[normalizedRating];
};
