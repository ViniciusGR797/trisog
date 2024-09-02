export type Ratings = {
  services: number;
  location: number;
  amenities: number;
  prices: number;
  food: number;
  room_comfort_and_quality: number;
};

export type Review = {
  id: string;
  name: string;
  email: string;
  comment: string;
  image: string;
  ratings: Ratings;
  created_at: string;
  experience_id: string;
};
