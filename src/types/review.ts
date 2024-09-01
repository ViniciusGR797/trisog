export type Scores = {
  services: number;
  location: number;
  amenities: number;
  prices: number;
  food: number;
  room_comfort_and_quality: number;
};

export type Booking = {
  id: string;
  name: string;
  email: string;
  comment: Scores;
  image: number;
  score: Scores;
  created_at: string;
  experience_id: string;
};
